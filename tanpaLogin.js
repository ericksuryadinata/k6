import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const dashboardError = new Rate('dashboardError');
const paketTryoutError = new Rate('paketTryoutError');
const peringkatDashboardError = new Rate('peringkatDashboardError');
const paymentError = new Rate('paymentError');
const subpaketError = new Rate('subpaketError');
const paketSoalError = new Rate('paketSoalError');
const validasiJadwalError = new Rate('validasiJadwalError');
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
        'dashboardError': ['rate < 0.2'],
        'paketTryoutError': ['rate < 0.2'],
        'peringkatDashboardError': ['rate < 0.2'],
        'paymentError': ['rate < 0.2'],
        'subpaketError': ['rate < 0.2'],
        'paketSoalError': ['rate < 0.2'],
        'validasiJadwalError': ['rate < 0.2'],
        'cekPilihanPtnError': ['rate < 0.2'],
        'kelompokPtnError': ['rate < 0.2'],
        'ptnError': ['rate < 0.2'],
        'ptn2Error': ['rate < 0.2'],
    },
    scenarios: {
        dashboard: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'dashboard'
        },
        paketTryout: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'paketTryout'
        },
        peringkatDashboard: {
            executor: 'ramping-vus',
            startVUs: 1000,
            stages: [
                { duration: '1m', target: 1000 },
                { duration: '2m', target: 2000 },
                { duration: '3m', target: 500 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '30s',
            exec: 'peringkatDashboard'
        },
        payment: {
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

// dashboard
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

export function peringkatDashboard(){
    let request = http.get(`${URL}peringkatDashboard`)
    let result = check(request, {
        'is status 200': (r) => r.status === 200,
    })
    console.log(`DASHBOARD|PD|ITER ${__ITER}|VU ${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
    peringkatDashboardError.add(!result);
    sleep(1)
}

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