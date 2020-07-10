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
Object.defineProperty(exports, "__esModule", { value: true });
/*  Custom Components   */
var ConfigLog4j_1 = require("./ConfigLog4j");
/*  Express */
var express = require("express");
var path = require("path");
var shared_models_1 = require("./model/shared.models");
var Address = shared_models_1.shared_classes.Address;
var User = shared_models_1.shared_classes.User;
/*  DB client   */
var pg_1 = require("pg");
var client = new pg_1.Client();
var app = express();
var router = express.Router();
var logger = ConfigLog4j_1.factory.getLogger(path.basename(__filename, path.extname(__filename)));
app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello world!');
});
/**
 * Get users from database
 */
app.get('/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, rows, users, _i, rows_1, row, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = 'select * from users u join addressbook ab on u.addressbook_key = ab.addressbook_key';
                return [4 /*yield*/, client.query(text)];
            case 1:
                rows = (_a.sent()).rows;
                users = [];
                for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    row = rows_1[_i];
                    users.push(new User(row['firstname'], row['middlename'], row['lastname'], row['age'], row['sex']));
                }
                res.status(200);
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var addressBook, user, text, values, rows, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                addressBook = new Address(String(req.query.address), String(req.query.postal), String(req.query.city), String(req.query.province), String(req.query.country)).parse();
                user = new User(String(req.query.firstname), String(req.query.middlename), String(req.query.lastname), Number(req.query.age), String(req.query.sex));
                text = 'select * from CreateRetrieveAddressBook($1, $2, $3, $4, $5)';
                values = [addressBook.address, addressBook.postalCode, addressBook.city, addressBook.province, addressBook.country];
                return [4 /*yield*/, client.query(text, values)];
            case 1:
                rows = (_a.sent()).rows;
                text = 'insert into users(addressbook_key, firstname, middlename, lastname, age, sex) VALUES ($1, $2, $3, $4, $5, $6)';
                values = [rows[0]['addressbook_key'], user.firstName, user.middlename, user.lastName, user.age, user.sex];
                return [4 /*yield*/, client.query(text, values)];
            case 2:
                _a.sent();
                res.status(200);
                res.send('GREAT SUCCESS!');
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                logger.error("" + e_2);
                res.status(500);
                res.send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/user/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, values, rows, user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = 'select * from users where user_key = $1 limit 1';
                values = [Number(req.params.id)];
                return [4 /*yield*/, client.query(text, values)];
            case 1:
                rows = (_a.sent()).rows;
                user = new User(rows[0]['firstname'], rows[0]['middlename'], rows[0]['lastname'], Number(rows[0]['age']), rows[0]['sex']);
                res.status(200);
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                logger.error("" + e_3);
                res.status(500);
                res.send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/user/:id/address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, values, rows, address, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = 'select * from addressbook ab join users u on ab.addressbook_key = u.user_key where u.user_key = $1';
                values = [Number(req.params.id)];
                return [4 /*yield*/, client.query(text, values)];
            case 1:
                rows = (_a.sent()).rows;
                address = new Address(rows[0]['address'], rows[0]['postalcode'], rows[0]['city'], rows[0]['province'], rows[0]['country']);
                res.status(200);
                res.send(address);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                logger.error("" + e_4);
                res.status(500);
                res.send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, addressbook, rows, _i, rows_2, row, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = 'select * from addressbook';
                logger.info('Retrieving addresses...');
                addressbook = [];
                return [4 /*yield*/, client.query(text)];
            case 1:
                rows = (_a.sent()).rows;
                for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                    row = rows_2[_i];
                    addressbook.push(new Address(row['address'], row['postalcode'], row['city'], row['province'], row['country']));
                }
                logger.info(JSON.stringify(addressbook));
                res.status(200);
                res.send(addressbook);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                logger.error("" + e_5);
                res.status(500);
                res.send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/address/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, values, rows, address, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = 'select * from addressbook where addressbook_key = $1 limit 1';
                values = [Number(req.params.id)];
                return [4 /*yield*/, client.query(text, values)];
            case 1:
                rows = (_a.sent()).rows;
                address = new Address(rows[0]['address'], rows[0]['postalcode'], rows[0]['city'], rows[0]['province'], rows[0]['country']);
                res.status(200);
                res.send(address);
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                logger.error("" + e_6);
                res.status(500);
                res.send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entry, text, values, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                entry = new Address(req.query.address, req.query.postal, req.query.city, req.query.province, req.query.country).parse();
                text = 'insert into addressbook(address, postalcode, city, province, country) values ($1, $2, $3, $4, $5)';
                values = [entry.address, entry.postalCode.replace(/\s/g, ""), entry.city, entry.province, entry.country];
                return [4 /*yield*/, client.query(text, values)];
            case 1:
                _a.sent();
                res.status(200);
                res.send('GREAT SUCCESS!');
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                logger.error("" + e_7);
                res.status(500);
                res.send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*  Server Initialization   */
logger.info('Initializing server...');
//  Connect to DB
client.connect(function (err) {
    if (err) {
        logger.error("" + err.stack);
    }
    else {
        logger.info('Connected');
    }
});
//_database.connect();
var server_port = process.env.SERVER_PORT;
app.listen(server_port, function () {
    logger.info('App is listening on port ' + server_port);
});
