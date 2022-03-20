import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const paymentError = new Rate('paymentError');
const paketSoalError = new Rate('paketSoalError');
const cekPilihanPtnError = new Rate('cekPilihanPtnError');
const URL = 'https://dashboard.utbk.edubrand.id/api/stress-test/'
// const URL = 'http://127.0.0.1:8000/api/stress-test/'


export const options = {
    noConnectionReuse: true,
    noVUConnectionReuse: true,
    discardResponseBodies: true,
    thresholds: {
        'paymentError': ['rate < 0.2'],
        'paketSoalError': ['rate < 0.2'],
        'cekPilihanPtnError': ['rate < 0.2'],
    },
    scenarios: {
        payment:{
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'payment'
        },
        paketSoal:{
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
        cekPilihanPtn:{
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
        }
    },
};


export function payment(){

    let body = {
        peserta_id: '294506'
    }
    let request = http.post(`${URL}payment`, body)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`DASHBOARD|PY|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    paymentError.add(!result);
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

export function cekPilihanPtn(){
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