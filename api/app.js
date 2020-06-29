"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*  Custom Components   */
var db_controller_1 = require("./model/database.interface");
var ConfigLog4j_1 = require("./ConfigLog4j");
/*  Express */
var express = require("express");
var path = require("path");
var shared_models_1 = require("./model/shared.models");
var Address = shared_models_1.shared_classes.Address;
var app = express();
var router = express.Router();
var logger = ConfigLog4j_1.factory.getLogger(path.basename(__filename, path.extname(__filename)));
app.get('/', function (req, res) {
    res.send('Hello world!');
});
/**
 * Get addressbook from database given user id
 */
app.get('/user', function (req, res) {
    res.send(db_controller_1._database.getUserByID(Number(req.query.id)));
});
app.get('/address', function (req, res) {
    db_controller_1._database.getAddresses().then(function (result) {
        logger.info('' + result.rows);
        var addressbook = new Array();
        for (var _i = 0, _a = result.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            addressbook.push(new Address(row['address'], row['postalcode'], row['city'], row['province'], row['country']));
        }
        res.status(200);
        res.send(addressbook);
    }).catch(function (e) {
        logger.error(e);
        res.status(500);
    });
});
app.put('/address', function (req, res) {
    var entry = new Address(req.query.address, req.query.postal, req.query.city, req.query.province, req.query.country);
    entry.parse();
    db_controller_1._database.saveAddress(entry).then(function () {
        logger.info('Added entry ' + entry);
        res.status(200);
        res.send('GREAT SUCCESS');
    }).catch(function () {
        logger.info('Failed to add entry to database');
        res.status(500);
        res.send();
    });
});
/*  Server Initialization   */
logger.info('Initializing server...');
//  Connect to DB
db_controller_1._database.connect();
var server_port = process.env.SERVER_PORT;
app.listen(server_port, function () {
    logger.info('App is listening on port ' + server_port);
});
