"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*  Custom Components   */
var db_controller_1 = require("./model/db_controller");
/*  Express */
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('Hello world!');
});
/**
 * Get addressbook from database given user id
 */
app.get('/addressbook', function (req, res) {
    console.log('Addressbook GET request for id: ', req.query.id);
    res.send(db_controller_1.database_functions.getByID(Number(req.query.id)));
});
/*  Server Initialization   */
var server_port = process.env.SERVER_PORT;
app.listen(server_port, function () {
    console.log('App is listening on port ', server_port);
});
