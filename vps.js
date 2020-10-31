import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
const stressError = new Rate('stress-error');
const questionsError = new Rate('questions-error');
export let options = {
    discardResponseBodies: true,
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    thresholds: {
        'stress-error': ['rate < 0.2'],
        'questions-error': ['rate < 0.2'],
    },
    scenarios: {
        stress: {
            executor: 'ramping-vus',
            exec: 'stress',
            startVUs: 0,
            stages: [
                { duration: '5s', target: 250 },
                { duration: '1m', target: 250 },
                { duration: '5s', target: 500 },
                { duration: '1m', target: 500 },
                { duration: '10s', target: 1000 },
                { duration: '5m', target: 1000 },
                { duration: '10s', target: 800 },
                { duration: '10s', target: 100 },
                { duration: '10s', target: 1500 },
                { duration: '5m', target: 1500 },
                { duration: '10s', target: 500 },
                { duration: '10s', target: 200 },
                { duration: '10s', target: 0 }
            ],
            gracefulRampDown: '0s',
        },
        questions: {
            executor: 'per-vu-iterations',
            exec: 'questions',
            vus: 1000,
            iterations: 10,
            startTime: '10s',
            maxDuration: '90m'
        }
    }
};

export function stress() {
    let res = http.get(`https://ujian.akm.edubrand.id/stress-test/${__ITER}`);
    let success = check(res, { "is status 200": (r) => r.status === 200 });
    console.log(`stress ${res.status}`);
    stressError.add(!success);
}

export function questions() {
    let res = http.get(`https://ujian.akm.edubrand.id/stress-test/questions/${__ITER}`);
    let success = check(res, { "is status 200": (r) => r.status === 200 });
    console.log(`questions ${res.status}`);
    questionsError.add(!success);
}