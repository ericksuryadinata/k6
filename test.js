import http from 'k6/http';
import { check,sleep } from 'k6';
import { Rate } from 'k6/metrics';
const stressError = new Rate('stress-error');
const questionsError = new Rate('questions-error');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'

export const options = {
    discardResponseBodies: true,
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    thresholds: {
        'stress-error': ['rate < 0.2'],
        'http_req_failed':['rate < 0.05'],
        'http_req_duration':['p(95)<3000'],
    },
    stages: [
        { duration: '10s', target: 250 },
        { duration: '5m', target: 750 },
        { duration: '20s', target: 5000 },
        { duration: '5m', target: 5000 },
        { duration: '10s', target: 750 },
        { duration: '2m', target: 250 },
        { duration: '5s', target: 0 },
    ],
};


export default function stress() {
    let res = http.get(`${URL}submit?id_ujian=120402&token=7pwDi11qQz0UkTphMwfxOp4S46r2RVUrgb5lZR6JU4AoyBOBP4vDm87LbjCOQLnb&detail_id=243723`);
    console.log('Response time was ' + String(res.timings.duration) + ' ms')
    let success = check(res, { "is status 201": (r) => r.status === 201 });
    console.log(`stress ${res.status}`);
    stressError.add(!success);
    sleep(1)
}

export function questions() {
    let res = http.get(`https://ujian.akm.edubrand.id/stress-test/questions/${__ITER}`);
    let success = check(res, { "is status 200": (r) => r.status === 200 });
    console.log(`questions ${res.status}`);
    questionsError.add(!success);
}