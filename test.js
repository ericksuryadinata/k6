import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const loginError = new Rate('loginError');
const captchaError = new Rate('captchaError');
const dashboardError = new Rate('dashboardError');
const paketTryoutError = new Rate('paketTryoutError');
const peringkatDashboardError = new Rate('peringkatDashboardError');
const kelompokPtnError = new Rate('kelompokPtnError');
// const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'loginError': ['rate < 0.2'],
        'captchaError': ['rate < 0.2'],
        'dashboardError': ['rate < 0.2'],
        'paketTryoutError': ['rate < 0.2'],
        'kelompokPtnError': ['rate < 0.2'],
        'peringkatDashboardError': ['rate < 0.2'],
    },
    scenarios: {
        loginScenario: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '5m', target: 5 },
                { duration: '15m', target: 5 },
                { duration: '5m', target: 5 },
                { duration: '30s', target: 5 },
            ],
            gracefulRampDown: '30s',
            exec: 'login'
        },
        // dashboardScenario: {
        //     executor: 'ramping-vus',
        //     startVUs: 500,
        //     stages: [
        //         { duration: '5m', target: 1000 },
        //         { duration: '15m', target: 1000 },
        //         { duration: '5m', target: 500 },
        //         { duration: '30s', target: 100 },
        //     ],
        //     gracefulRampDown: '30s',
        //     exec: 'dashboard'
        // },
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
        console.log(`C|I${__ITER}|VU${__VU}|${captchaRequest.status}|CTime ${captchaRequest.headers['X-Compute-Time']}|STime ${captchaRequest.headers['X-Syscall-Time']}`)
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
        console.log(`L|I${__ITER}|VU${__VU}|${loginRequest.status}|CTime ${loginRequest.headers['X-Compute-Time']}|STime ${loginRequest.headers['X-Syscall-Time']}`)
        loginError.add(!loginResult);
    })
}

export function dashboard(){
    group('dashboard', function(){
        let dashboardRequest = http.get(`${URL}294506/dashboard`)
        let dashboardResult = check(dashboardRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`Group Dashboard | ITER ${__ITER} | VU ${__VU} | status ${dashboardRequest.status}|CTime ${dashboardRequest.headers['X-Compute-Time']}|STime ${dashboardRequest.headers['X-Syscall-Time']}`)
        dashboardError.add(!dashboardResult);
    })

    group('paketTryout', function(){
        let paketTryoutRequest = http.get(`${URL}294506/paketTryout`)
        let paketTryoutResult = check(paketTryoutRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`Group Paket Tryout | ITER ${__ITER} | VU ${__VU} | status ${paketTryoutRequest.status}|CTime ${paketTryoutRequest.headers['X-Compute-Time']}|STime ${paketTryoutRequest.headers['X-Syscall-Time']}`)
        paketTryoutError.add(!paketTryoutResult);
    })

    group('peringkatDashboard', function(){
        let peringkatDashboardRequest = http.get(`${URL}peringkatDashboard`)
        let peringkatDashboardResult = check(peringkatDashboardRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`Group Paket Tryout | ITER ${__ITER} | VU ${__VU} | status ${peringkatDashboardRequest.status}|CTime ${peringkatDashboardRequest.headers['X-Compute-Time']}|STime ${paketTryoutRequest.headers['X-Syscall-Time']}`)
        peringkatDashboardError.add(!peringkatDashboardResult);
    })
}

export function ujian(){

    group('validasi jadwal', function(){

    })

    group('kelompokPtn', function() {
        let kelompokRequest = http.get(`${URL}kelompok/ptn?kelompok=saintek`)
        let kelompokResult = check(kelompokRequest, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`TEST 2 | ITER ${__ITER} | VU ${__VU} | status ${kelompokRequest.status}`)
        kelompokPtnError.add(!kelompokResult);
    })
    
}