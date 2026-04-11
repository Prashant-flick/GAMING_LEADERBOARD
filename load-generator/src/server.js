import express from 'express';
import axios from 'axios';
import { faker } from "@faker-js/faker"

const app = express();

app.get('/', (req,res) => {
    res.send('Leaderboard load generator running');
})

app.listen(4000, () => {
    console.log('app is running on port 4000')
})

const API = 'http://ec2-18-61-74-86.ap-south-2.compute.amazonaws.com:3000';
// const API = 'http://localhost:3000';

const ENDPOINTS = {
    createUser: `${API}/auth/signup`,
    getGames: `${API}/games`,
    submitScore: `${API}/scores`,
    getUsers: `${API}/users`
};

let games = [];
let users = [];

async function loadGames() {
    const res = await axios.get(ENDPOINTS.getGames);
    games = res.data;
    console.log("loaded games: ", games.length);
}

async function loadUsers() {
    const res = await axios.get(ENDPOINTS.getUsers);
    users = res.data;
    console.log("loaded users: ", users.length)
}

async function createUser() {
    const user = {
        email: faker.internet.email(),
        password: "test@123"
    }

    const res = await axios.post(ENDPOINTS.createUser, user);
    return res.data;
}

async function submitScore(userId) {
    for (const game of games) {
        const score = Math.floor(Math.random() * 100000);

        await axios.post(ENDPOINTS.submitScore, {
            userId,
            gameId: game.id,
            score
        })
        console.log(userId, game.id, score);
    }
}

async function simulatePlayer() {
    const user = await createUser();
    await submitScore(user.userId);
}

async function runLoad(players = 100) {
    const limit = pLimit(10);

    const tasks = Array.from({ length: players }, (_, i) =>
        limit(() => simulatePlayer(i))
    );

    await Promise.all(tasks);
}

import pLimit from 'p-limit';

async function randomScoreUpdates() {

    const limit = pLimit(20); // try 5–10

    await Promise.all(
        Array.from({ length: 10000 }).map((_, i) =>
            limit(async () => {
            const user = users[Math.floor((Math.random()*users.length))];
            let game = games[Math.floor((Math.random() * games.length))];
            
            if(!user) {console.log("return"); return;}
            if(!game) {console.log("return"); return;}
            const score = Math.floor(Math.random() * 100000);

            await axios.post(ENDPOINTS.submitScore, {
                userId: user.id,
                gameId: game.id,
                score
            });

            console.log(i, score, user.id, game.id);
            })
        )
    );
}

app.get("/start", async(req, res) => {
    const players = Number(req.query.players || 100);

    await loadGames();
    await loadUsers();
    await randomScoreUpdates();
    // await runLoad(players);

    res.send(`Started load test with ${players} players`);
})