import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const subpaketError = new Rate('subpaketError');
const paketSoalError = new Rate('paketSoalError');
const validasiJadwalError = new Rate('validasiJadwalError');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
// const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'subpaketError': ['rate < 0.2'],
        'paketSoalError': ['rate < 0.2'],
        'validasiJadwalError': ['rate < 0.2'],
    },
    scenarios: {
        subpaket: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'subpaket'
        },
        paketSoal: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'paketSoal'
        },
        validasi: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'validasi'
        },
    },
};


// pas klik mulai
export function subpaket() {
    let request = http.get(`${URL}32/subpaket`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`PKM|SP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    subpaketError.add(!result);
    sleep(1)
}

export function paketSoal(){
    let body = {
        ids: [83]
    }
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let request = http.post(`${URL}paketSoal`, JSON.stringify(body), params)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`PKM|PS|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    paketSoalError.add(!result);
    sleep(1)
}

export function validasi() {
    let request = http.get(`${URL}validasi/294506/84`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`PKM|V|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    validasiJadwalError.add(!result);
    sleep(1)
}
