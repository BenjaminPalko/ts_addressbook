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
        while (_) try {
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
exports._database = void 0;
/*  DB client   */
var pg_1 = require("pg");
var client = new pg_1.Client();
/*  Shared Classes  */
var shared_models_1 = require("./shared.models");
var Address = shared_models_1.shared_classes.Address;
var User = shared_models_1.shared_classes.User;
var ConfigLog4j_1 = require("../ConfigLog4j");
var path_1 = __importDefault(require("path"));
var logger = ConfigLog4j_1.factory.getLogger(path_1.default.basename(__filename, path_1.default.extname(__filename)));
/*  Database Functions  */
var _database;
(function (_database) {
    /**
     * Connects client to DB
     * @param attempt
     * @param max_attempts
     * @param timeout
     */
    function connect(attempt, max_attempts, timeout) {
        if (attempt === void 0) { attempt = 0; }
        if (max_attempts === void 0) { max_attempts = 10; }
        if (timeout === void 0) { timeout = 1000; }
        if (attempt < max_attempts) {
            setTimeout(function () {
                client.connect().then(function () {
                    logger.info('Database connection successful!');
                }).catch(function () {
                    logger.info('Database connection attempt ' + ++attempt + '/ ${max_attempts}' + max_attempts + ' failed...');
                    connect(attempt);
                });
            }, timeout);
        }
    }
    _database.connect = connect;
    /**
     * Gets all entries in the AddressBook table
     */
    function getAddresses() {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.info('Retrieving addresses');
                        text = 'select * from AddressBook';
                        return [4 /*yield*/, client.query(text)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    _database.getAddresses = getAddresses;
    function saveAddress(entry) {
        return __awaiter(this, void 0, void 0, function () {
            var text, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.info('Saving AddressBook: ' + entry);
                        text = 'insert into AddressBook(address, postalcode, city, province, country) values ($1, $2, $3, $4, $5)';
                        values = [entry.address, entry.postalCode.replace(/\s/g, ""), entry.city, entry.province, entry.country];
                        return [4 /*yield*/, client.query(text, values)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    _database.saveAddress = saveAddress;
    function getUserByID(id) {
        var address = new Address("10 East Avenue", "K6V 2M7", "Brockville", "Ontario", "Canada");
        return new User("Benjamin", "Palko", address);
    }
    _database.getUserByID = getUserByID;
})(_database = exports._database || (exports._database = {}));
