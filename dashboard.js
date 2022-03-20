import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const dashboardError = new Rate('dashboardError');
const paketTryoutError = new Rate('paketTryoutError');
const peringkatDashboardError = new Rate('peringkatDashboardError');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
// const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'dashboardError': ['rate < 0.2'],
        'paketTryoutError': ['rate < 0.2'],
        'peringkatDashboardError': ['rate < 0.2'],
    },
    scenarios: {
        dashboard: {
            executor: 'ramping-vus',
            startVUs: 10000,
            stages: [
                { duration: '5m', target: 10000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'dashboard'
        },
        paketTryout: {
            executor: 'ramping-vus',
            startVUs: 10000,
            stages: [
                { duration: '5m', target: 10000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'paketTryout'
        },
        peringkatDashboard: {
            executor: 'ramping-vus',
            startVUs: 10000,
            stages: [
                { duration: '5m', target: 10000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'peringkatDashboard'
        },
    },
};

export function dashboard(){
    let request = http.get(`${URL}294506/dashboard`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`DASHBOARD|D|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    dashboardError.add(!result);
    sleep(1)
}

export function paketTryout() {
    let request = http.get(`${URL}294506/paketTryout`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`DASHBOARD|PT|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    paketTryoutError.add(!result);
    sleep(1)
}

export function peringkatDashboard() {
    let request = http.get(`${URL}peringkatDashboard`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`DASHBOARD|PD|ITER ${__ITER}|VU ${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    peringkatDashboardError.add(!result);
    sleep(1)
}