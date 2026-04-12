import http from 'k6/http';import { sleep } from 'k6';

// const API = 'http://localhost:3000/loadgenerator';
const API = 'http://ec2-18-61-74-86.ap-south-2.compute.amazonaws.com:3000';

export default function () {
  http.get(`${API}/cpu-test`);
  // sleep(1)
}