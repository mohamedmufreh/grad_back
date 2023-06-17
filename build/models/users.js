"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var salt_rounds = process.env.SALT_ROUNDS;
var pepper = process.env.BCRYPT_PASSWORD;
var usersStore = /** @class */ (function () {
    function usersStore() {
    }
    usersStore.prototype.register = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO users (user_name, user_ssn, manufacturer_number, user_email, user_password ,user_address ,user_job ,user_nationality ,user_phone ,user_bd ,user_governorate) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
                        hash = bcrypt_1.default.hashSync(u.user_password + pepper, parseInt(salt_rounds));
                        return [4 /*yield*/, conn.query(sql, [
                                u.user_name,
                                u.user_ssn,
                                u.manufacturer_number,
                                u.user_email,
                                hash,
                                u.user_address,
                                u.user_job,
                                u.user_nationality,
                                u.user_phone,
                                u.user_bd,
                                u.user_governorate,
                            ])];
                    case 2:
                        user = _a.sent();
                        conn.release();
                        return [2 /*return*/, user.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Cannot Create User. ".concat(err_1, "."));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    usersStore.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT user_password FROM users WHERE user_name=($1)';
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            user = result.rows[0];
                            if (bcrypt_1.default.compareSync(password + pepper, user.user_password)) {
                                console.log('Login Accepted.');
                                return [2 /*return*/, user];
                            }
                            console.log('Login not accepted.');
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    usersStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM USERS';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        users = _a.sent();
                        conn.release();
                        return [2 /*return*/, users.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Cannot Display The Users. ".concat(err_2, "."));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    usersStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE license_id = $1';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        user = _a.sent();
                        conn.release();
                        return [2 /*return*/, user.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Cannot Display The Specific User. ".concat(err_3, "."));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    usersStore.prototype.update = function (u, id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, hash, result, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE users SET user_name=$1, user_ssn=$2, manufacturer_number=$3, user_email=$4, user_password=$5, user_address=$6, user_job=$7, user_nationality=$8, user_phone=$9, user_bd=$10, user_governorate=$11 WHERE license_id=$12 RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        hash = bcrypt_1.default.hashSync(u.user_password + pepper, parseInt(salt_rounds));
                        return [4 /*yield*/, conn.query(sql, [
                                u.user_name,
                                u.user_ssn,
                                u.manufacturer_number,
                                u.user_email,
                                hash,
                                u.user_address,
                                u.user_job,
                                u.user_nationality,
                                u.user_phone,
                                u.user_bd,
                                u.user_governorate,
                                id,
                            ])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Cannot update User Details. ".concat(err_4, "."));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    usersStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM users WHERE license_id=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        user = _a.sent();
                        conn.release();
                        return [2 /*return*/, user.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Cannot Delete The User. ".concat(err_5, "."));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return usersStore;
}());
exports.usersStore = usersStore;
