import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const cekPilihanPtnError = new Rate('cekPilihanPtnError');
const kelompokPtnError = new Rate('kelompokPtnError');
const ptnError = new Rate('ptnError');
const ptn2Error = new Rate('ptn2Error');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
// const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'cekPilihanPtnError': ['rate < 0.2'],
        'kelompokPtnError': ['rate < 0.2'],
        'ptnError': ['rate < 0.2'],
        'ptn2Error': ['rate < 0.2'],
    },
    scenarios: {
        kelompokPtn: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'kelompokPtn'
        },
        cekPilihanPtn: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'cekPilihanPtn'
        },
        ptn: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'ptn'
        },
        ptn2: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'ptn2'
        },
    },
};

// setelah klik mulai
export function kelompokPtn(){
    let request = http.get(`${URL}kelompokPtn?kelompok=saintek`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`SKM|KP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    kelompokPtnError.add(!result);
    sleep(1)
}

export function cekPilihanPtn() {
    let body = {
        "id_peserta":294506,
        "id_paket_soal":75
    }

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let request = http.post(`${URL}cekPilihanPtn`, JSON.stringify(body), params)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`SKM|CPP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    cekPilihanPtnError.add(!result);
    sleep(1)
}

export function ptn() {
    let request = http.get(`${URL}ptn?kelompok=SAINTEK&nama=UNIVERSITAS%20SYIAH%20KUALA`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`SKM|PTN|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    ptnError.add(!result);
    sleep(1)
}

export function ptn2(){
    let request = http.get(`${URL}ptn2?kelompok=SAINTEK&nama=UNIVERSITAS%20SYIAH%20KUALA`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`SKM|PTN2|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    ptn2Error.add(!result);
    sleep(1)
}