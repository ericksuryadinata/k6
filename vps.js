import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { parseHTML } from 'k6/html';
const stressSuccessRate = new Rate('stress success requests');
const questionsSuccessRate = new Rate('questions success requests');
export let options = {
    discardResponseBodies: true,
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    thresholds: {
        'stress success requests': ['rate > 0.9'],
        'questions success requests': ['rate > 0.9'],
    },
    scenarios: {
        stress: {
            executor: 'ramping-vus',
            exec: 'stress',
            startVUs: 0,
            stages: [
                { duration: '5s', target: 50 },
                { duration: '1m', target: 50 },
                { duration: '5s', target: 100 },
                { duration: '1m', target: 100 },
                { duration: '10s', target: 200 },
                { duration: '1m', target: 200 },
                { duration: '10s', target: 0 }
            ],
            gracefulRampDown: '0s',
        },
        questions: {
            executor: 'per-vu-iterations',
            exec: 'stress',
            vus: 200,
            iterations: 10,
            startTime: '10s',
            maxDuration: '1m'
        }
    }
};

export function stress() {
    let res = http.get(`https://staging.ujian.akm.edubrand.id/stress-test/${__ITER}`);
    console.log(`stress ${res.status}`);
    stressSuccessRate.add(res.status === 200);
}

export function questions() {
    let res = http.get(`https://staging.ujian.akm.edubrand.id/stress-test/questions/${__ITER}`);
    console.log(`questions ${res.status}`);
    questionsSuccessRate.add(res.status === 200);
}