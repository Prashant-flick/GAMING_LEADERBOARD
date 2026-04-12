import http from 'k6/http';

const API = 'http://localhost:3000/loadgenerator';

export default function () {
  http.get(`${API}/cpu-async-test`);
}