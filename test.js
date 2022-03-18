import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';
const loginError = new Rate('loginError');
const captchaError = new Rate('captchaError');
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
        'loginError': ['rate < 0.2'],
        'captchaError': ['rate < 0.2'],
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
        skenarioLengkap: {
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
        // loginScenario: {
        //     executor: 'ramping-vus',
        //     startVUs: 1000,
        //     stages: [
        //         { duration: '1m', target: 1000 },
        //         { duration: '2m', target: 2000 },
        //         { duration: '3m', target: 500 },
        //         { duration: '30s', target: 10 },
        //     ],
        //     gracefulRampDown: '30s',
        //     exec: 'login'
        // },
        // dashboardScenario: {
        //     executor: 'ramping-vus',
        //     startVUs: 500,
        //     startTime: '1m',
        //     stages: [
        //         { duration: '1m', target: 500 },
        //         { duration: '2m', target: 20 },
        //         { duration: '3m', target: 10 },
        //         { duration: '30s', target: 10 },
        //     ],
        //     gracefulRampDown: '30s',
        //     exec: 'dashboard'
        // },
        // pasKlikMulaiScenario : {
        //     executor: 'ramping-vus',
        //     startVUs: 10,
        //     startTime: '2m',
        //     stages: [
        //         { duration: '1m', target: 10 },
        //         { duration: '2m', target: 20 },
        //         { duration: '3m', target: 10 },
        //         { duration: '30s', target: 10 },
        //     ],
        //     gracefulRampDown: '30s',
        //     exec: 'pasKlikMulai'
        // },
        // setelahKlikMulaiScenario : {
        //     executor: 'ramping-vus',
        //     startVUs: 10,
        //     startTime: '2m',
        //     stages: [
        //         { duration: '1m', target: 10 },
        //         { duration: '2m', target: 20 },
        //         { duration: '3m', target: 10 },
        //         { duration: '30s', target: 10 },
        //     ],
        //     gracefulRampDown: '30s',
        //     exec: 'setelahKlikMulai'
        // },
    },
};


export function skenarioLengkap(){
    group('login', function(){
        let request = http.get(`${URL}captcha`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`LOGIN|C|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        captchaError.add(!result);

        
        let body = {
            tahun_kelulusan: '2022'
        }
        request = http.post(`${URL}login`, body)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`LOGIN|L|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        loginError.add(!result);
    })
    
    group('dashboard', function() {
        let request = http.get(`${URL}294506/dashboard`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|D|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        dashboardError.add(!result);

        request = http.get(`${URL}294506/paketTryout`)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|PT|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        paketTryoutError.add(!result);
        
        request = http.get(`${URL}peringkatDashboard`)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|PD|ITER ${__ITER}|VU ${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        peringkatDashboardError.add(!result);

        let body = {
            peserta_id: '294506'
        }
        request = http.post(`${URL}login`, body)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|PY|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        paymentError.add(!result);
    })

    group('pasKlikMulai', function() {
        let request = http.get(`${URL}32/subpaket`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`PKM|SP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        subpaketError.add(!result);

        let body = {
            ids: [83]
        }
        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        request = http.post(`${URL}paketSoal`, JSON.stringify(body), params)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`PKM|PS|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        paketSoalError.add(!result);

        request = http.get(`${URL}validasi/294506/84`)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`PKM|V|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        validasiJadwalError.add(!result);
    })

    group('setelahKlikMulai', function() {
        let request = http.get(`${URL}kelompokPtn?kelompok=saintek`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|KP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        kelompokPtnError.add(!result);

        let body = {
            "id_peserta":294506,
            "id_paket_soal":75
        }

        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        request = http.post(`${URL}cekPilihanPtn`, JSON.stringify(body), params)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|CPP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        cekPilihanPtnError.add(!result);

        request = http.get(`${URL}ptn?kelompok=SAINTEK&nama=UNIVERSITAS%20SYIAH%20KUALA`)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|PTN|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        ptnError.add(!result);

        request = http.get(`${URL}ptn2?kelompok=SAINTEK&nama=UNIVERSITAS%20SYIAH%20KUALA`)
        result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|PTN2|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        ptn2Error.add(!result);
    })
}

export function login(){
    
    group('captcha', function(){
        let request = http.get(`${URL}captcha`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`LOGIN|C|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        captchaError.add(!result);
    })
    
    group('login', function() {
        let body = {
            tahun_kelulusan: '2022'
        }
        let request = http.post(`${URL}login`, body)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`LOGIN|L|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        loginError.add(!result);
    })
}

export function dashboard(){
    group('dashboard', function(){
        let request = http.get(`${URL}294506/dashboard`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|D|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        dashboardError.add(!result);
    })

    group('paketTryout', function(){
        let request = http.get(`${URL}294506/paketTryout`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|PT|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        paketTryoutError.add(!result);
    })

    group('peringkatDashboard', function(){
        let request = http.get(`${URL}peringkatDashboard`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|PD|ITER ${__ITER}|VU ${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        peringkatDashboardError.add(!result);
    })

    
    group('payment', function() {
        let body = {
            peserta_id: '294506'
        }
        let request = http.post(`${URL}login`, body)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`DASHBOARD|PY|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        paymentError.add(!result);
    })
}

export function pasKlikMulai(){

    group('subpaket', function(){
        let request = http.get(`${URL}32/subpaket`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`PKM|SP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        subpaketError.add(!result);
    })

    group('paketSoal', function() {
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
    })

    group('validasi', function(){
        let request = http.get(`${URL}validasi/294506/84`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`PKM|V|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        validasiJadwalError.add(!result);
    })
    
}

export function setelahKlikMulai(){

    group('kelompokPtn', function() {
        let request = http.get(`${URL}kelompokPtn?kelompok=saintek`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|KP|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        kelompokPtnError.add(!result);
    })

    group('cekPilihanPtn', function() {
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
    })

    group('ptn', function() {
        let request = http.get(`${URL}ptn?kelompok=SAINTEK&nama=UNIVERSITAS%20SYIAH%20KUALA`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|PTN|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        ptnError.add(!result);
    })

    group('ptn2', function() {
        let request = http.get(`${URL}ptn2?kelompok=SAINTEK&nama=UNIVERSITAS%20SYIAH%20KUALA`)
        let result = check(request, {
            'is status 200': (r) => r.status === 200,
        })
        console.log(`SKM|PTN2|I${__ITER}|VU${__VU}|${request.status}|CTime ${request.headers['X-Compute-Time']}|STime ${request.headers['X-Syscall-Time']}`)
        ptn2Error.add(!result);
    })

}