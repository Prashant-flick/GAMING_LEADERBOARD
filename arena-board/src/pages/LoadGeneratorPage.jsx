import { useEffect, useState } from "react";
import axios from "axios";

import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { gamesApi } from '@/lib/api'

export default function LoadGeneratorPage() {
  const [userCount, setUserCount] = useState("");
  const [scoreCount, setScoreCount] = useState("");
  const [randomScoreCount, setRandomScoreCount] = useState("");
  const [scoreLimit, setScoreLimit] = useState("");
  const [randomScoreLimit, setRandomScoreLimit] = useState("");
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [games, setGames]       = useState([])
  const [second, setSecond] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;

    const load = async () => {
        const { data } = await gamesApi.getAll().catch(() => ({ data: [] }))
        setGames(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    useEffect(() => { load() }, [])


  const generateUsers = async () => {
    if (!userCount) return;

    try {
      setLoading(true);
      setResponse(null);
      const res = await axios.post(
        `${BASE_URL}/loadgenerator/noofusers/${userCount}`
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse({ message: "Error generating users" });
    } finally {
      setLoading(false);
    }
  };

  const generateScores = async () => {
    if (!scoreCount || !gameId || !scoreLimit) return;

    try {
      setLoading(true);
      setResponse(null);
      const res = await axios.post(
        `${BASE_URL}/loadgenerator/game/${gameId}/noofscores/${scoreCount}/scoreLimit/${scoreLimit}`
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse({ message: "Error generating scores" });
    } finally {
      setLoading(false);
    }
  };

  const generateRandomScores = async () => {
    if (!randomScoreCount || !randomScoreLimit) return;

    try {
      setLoading(true);
      setResponse(null);
      const res = await axios.post(
        `${BASE_URL}/loadgenerator/noofscores/${randomScoreCount}/scoreLimit/${randomScoreLimit}`
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse({ message: "Error generating scores" });
    } finally {
      setLoading(false);
    }
  };

  const keepAlive = async() => {
    if (!second) return;

    try {
      setLoading(true);
      setResponse(null);
      const res = await axios.get(
        `${BASE_URL}/loadgenerator/keep-alive/time/${second}`
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse({ message: "Error Keeping Alive" });
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Load Generator</h1>

      {/* USERS */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Generate Users</h2>

          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Number of users"
              value={userCount}
              onChange={(e) => setUserCount(e.target.value)}
            />

            <Button onClick={generateUsers} disabled={loading}>
              Generate
            </Button>
          </div>
        </div>
      </Card>

      {/* SCORES */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Generate Scores for Game</h2>

          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Number of scores"
              value={scoreCount}
              onChange={(e) => setScoreCount(e.target.value)}
            />

            <Input
              type="number" 
              placeholder="Score Limit"
              value={scoreLimit}
              onChange={(e)=> setScoreLimit(e.target.value)}
            /> 

            {/* Dropdown styled like input */}
            <select
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="rounded-md px-3 py-2 text-sm bg-gray-900"
            >
              <option value="">Select Game</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <Button onClick={generateScores} disabled={loading}>
              Generate
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Generate Random Scores</h2>

          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Number of scores"
              value={randomScoreCount}
              onChange={(e) => setRandomScoreCount(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Score Limit"
              value={randomScoreLimit}
              onChange={(e) => setRandomScoreLimit(e.target.value)}
            />

            <Button onClick={generateRandomScores} disabled={loading}>
              Generate
            </Button>
          </div>
        </div>
      </Card>

      {/* Keep Alive For Sec */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Keep the connection Alive</h2>

          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Seconds"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            />

            <Button onClick={keepAlive} disabled={loading}>
              Generate
            </Button>
          </div>
        </div>
      </Card>


      {/* RESPONSE */}
      <Card>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Response</h2>

          {loading && <Spinner />}

          {response && (
            <div className="text-sm space-y-1">
              <p className="font-medium">{response.message}</p>
              <p>Time: {response.timeTaken}</p>
              <p>Seconds: {response.timeTakenSeconds}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}