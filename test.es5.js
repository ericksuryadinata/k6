(function(e, a) {
    for (var i in a) e[i] = a[i];
})(exports, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 3);
}([ function(module, exports) {
    module.exports = require("k6");
}, function(module, exports) {
    module.exports = require("k6/http");
}, function(module, exports) {
    module.exports = require("k6/metrics");
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "options", function() {
        return options;
    });
    __webpack_require__.d(__webpack_exports__, "default", function() {
        return submit;
    });
    __webpack_require__.d(__webpack_exports__, "submitNoScoring", function() {
        return submitNoScoring;
    });
    __webpack_require__.d(__webpack_exports__, "questions", function() {
        return questions;
    });
    var k6_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
    var k6_http__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(k6_http__WEBPACK_IMPORTED_MODULE_0__);
    var k6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
    var k6__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(k6__WEBPACK_IMPORTED_MODULE_1__);
    var k6_metrics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
    var k6_metrics__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(k6_metrics__WEBPACK_IMPORTED_MODULE_2__);
    var stressError = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__["Rate"]("stress-error");
    var questionsError = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__["Rate"]("questions-error");
    var URL = "https://dashboard.utbk.edubrand.id/api/stress-test/";
    var options = {
        discardResponseBodies: true,
        noConnectionReuse: true,
        noVUConnectionReuse: true,
        thresholds: {
            "stress-error": [ "rate < 0.2" ],
            http_req_failed: [ "rate < 0.05" ],
            http_req_duration: [ "p(95)<3000" ]
        },
        stages: [ {
            duration: "10s",
            target: 250
        }, {
            duration: "5m",
            target: 750
        }, {
            duration: "20s",
            target: 5e3
        }, {
            duration: "5m",
            target: 5e3
        }, {
            duration: "10s",
            target: 750
        }, {
            duration: "2m",
            target: 250
        }, {
            duration: "5s",
            target: 0
        } ]
    };
    function submit() {
        var res = k6_http__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(URL, "submit?id_ujian=120402&token=7pwDi11qQz0UkTphMwfxOp4S46r2RVUrgb5lZR6JU4AoyBOBP4vDm87LbjCOQLnb&detail_id=243723"));
        console.log("[S] Response time was " + String(res.timings.duration) + " ms");
        var success = Object(k6__WEBPACK_IMPORTED_MODULE_1__["check"])(res, {
            "is status 201": function isStatus201(r) {
                return r.status === 201;
            }
        });
        console.log("stress ".concat(res.status));
        stressError.add(!success);
        Object(k6__WEBPACK_IMPORTED_MODULE_1__["sleep"])(1);
    }
    function submitNoScoring() {
        var res = k6_http__WEBPACK_IMPORTED_MODULE_0___default.a.get("".concat(URL, "submit/no-scoring?id_ujian=120402&token=7pwDi11qQz0UkTphMwfxOp4S46r2RVUrgb5lZR6JU4AoyBOBP4vDm87LbjCOQLnb&detail_id=243723"));
        console.log("[WS] Response time was " + String(res.timings.duration) + " ms");
        var success = Object(k6__WEBPACK_IMPORTED_MODULE_1__["check"])(res, {
            "is status 201": function isStatus201(r) {
                return r.status === 201;
            }
        });
        console.log("stress ".concat(res.status));
        stressError.add(!success);
        Object(k6__WEBPACK_IMPORTED_MODULE_1__["sleep"])(1);
    }
    function questions() {
        var res = k6_http__WEBPACK_IMPORTED_MODULE_0___default.a.get("https://ujian.akm.edubrand.id/stress-test/questions/".concat(__ITER));
        var success = Object(k6__WEBPACK_IMPORTED_MODULE_1__["check"])(res, {
            "is status 200": function isStatus200(r) {
                return r.status === 200;
            }
        });
        console.log("questions ".concat(res.status));
        questionsError.add(!success);
    }
} ]));