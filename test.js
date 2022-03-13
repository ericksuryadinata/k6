import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const loginError = new Rate('loginError');
const captchaError = new Rate('captchaError');
const dashboardError = new Rate('dashboardError');
const kelompokPtnError = new Rate('kelompokPtnError');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
// const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'loginError': ['rate < 0.2'],
        'captchaError': ['rate < 0.2'],
        'dashboardError': ['rate < 0.2'],
        'kelompokPtnError': ['rate < 0.2'],
    },
    scenarios: {
        loginScenario: {
            executor: 'ramping-vus',
            startVUs: 500,
            stages: [
                { duration: '5m', target: 1000 },
                { duration: '15m', target: 1000 },
                { duration: '5m', target: 500 },
                { duration: '30s', target: 100 },
            ],
            gracefulRampDown: '30s',
            exec: 'login'
        },
        dashboardScenario: {
            executor: 'ramping-vus',
            startVUs: 500,
            stages: [
                { duration: '5m', target: 1000 },
                { duration: '15m', target: 1000 },
                { duration: '5m', target: 500 },
                { duration: '30s', target: 100 },
            ],
            gracefulRampDown: '30s',
            exec: 'login'
        },
        // kelompokPtnScenario : {
        //     executor: 'ramping-vus',
        //     startVUs: 0,
        //     stages: [
        //         { duration: '20s', target: 10 },
        //         { duration: '20s', target: 12 },
        //         { duration: '20s', target: 14 },
        //         { duration: '20s', target: 15 },
        //         { duration: '20s', target: 19 },
        //         { duration: '20s', target: 20 },
        //         { duration: '20s', target: 25 },
        //         { duration: '20s', target: 13 },
        //         { duration: '20s', target: 12 },
        //         { duration: '20s', target: 10 },
        //         { duration: '20s', target: 8 },
        //         { duration: '20s', target: 0 },
        //     ],
        //     gracefulRampDown: '30s',
        //     exec: 'kelompokPtn'
        // },
    },
};

export function login(){
    
    group('captcha', function(){
        let captchaRequest = http.get(`${URL}captcha`)
        let captchaResult = check(captchaRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`Group Captcha | ITER ${__ITER} | VU ${__VU} | status ${captchaRequest.status}`)
        captchaError.add(!captchaResult);
    })
    
    group('login', function() {
        let loginBody = {
            tahun_kelulusan: '2022'
        }
        let loginRequest = http.post(`${URL}login`, loginBody)
        let loginResult = check(loginRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`Group Login | ITER ${__ITER} | VU ${__VU} | status ${loginRequest.status}`)
        loginError.add(!loginResult);
    })
}

export function dashboard(){
    group('dashboard', function(){
        let dashboardRequest = http.get(`${URL}294506/dashboard`)
        let dashboardResult = check(dashboardRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`Group Dashboard | ITER ${__ITER} | VU ${__VU} | status ${dashboardRequest.status}`)
        dashboardError.add(!dashboardResult);
    })
}

export function kelompokPtn(){
    group('kelompokPtn', function() {
        let kelompokRequest = http.get(`${URL}kelompok/ptn?kelompok=saintek`)
        let kelompokResult = check(kelompokRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`TEST 2 | ITER ${__ITER} | VU ${__VU} | status ${kelompokRequest.status}`)
        kelompokPtnError.add(!kelompokResult);
    })
    
}