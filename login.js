import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const loginError = new Rate('loginError');
const captchaError = new Rate('captchaError');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
// const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'loginError': ['rate < 0.2'],
        'captchaError': ['rate < 0.2'],
    },
    scenarios: {
        login: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'login'
        },
        captcha: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'captcha'
        },
    },
};

// login
export function captcha() {
    let request = http.get(`${URL}captcha`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`LOGIN|C|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    captchaError.add(!result);
    sleep(1)
}

export function login(){    
    let body = {
        tahun_kelulusan: '2022'
    }
    let request = http.post(`${URL}login`, body)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`LOGIN|L|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    loginError.add(!result);
    sleep(1)
}