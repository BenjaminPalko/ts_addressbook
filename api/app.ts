/*  Custom Components   */
import {_database} from "./model/database.interface"
import {factory, Logger} from "./ConfigLog4j";

/*  Express */
import express = require('express');
import path = require('path');
import {shared_classes} from "./model/shared.models";
import Address = shared_classes.Address;
import User = shared_classes.User;

const app: express.Application = express();
const router: express.Router = express.Router();
const logger: Logger = factory.getLogger(
    path.basename(__filename, path.extname(__filename))
);

app.get('/', function(req, res) {
    res.send('Hello world!');
});

/**
 * Get addressbook from database given user id
 */
app.put('/user', function (req, res) {

    let address: Address = new Address(
        <string>req.query.address,
        <string>req.query.postal,
        <string>req.query.city,
        <string>req.query.province,
        <string>req.query.country
    ).parse();

    let user: User = new User(
        <string>req.query.firstname,
        <string>req.query.middleinitial,
        <string>req.query.lastname,
        <string>req.query.sex,
        address
    );

    _database.saveUser(user).then(() => {
        logger.info('Added entry ' + user);
        res.status(200);
    }).catch(() => {

    })
});

app.get('/address', (req, res) => {
    _database.getAddresses().then((result) => {
        logger.info('' + result.rows);
        let addressbook: Array<Address> = new Array<Address>();
        for(let row of result.rows) {
            addressbook.push(new Address(
                row['address'], row['postalcode'], row['city'], row['province'], row['country']
            ));
        }
        res.status(200);
        res.send(addressbook)
    }).catch((e) => {
        logger.error(e);
        res.status(500)
    });

});

app.put('/address', (req, res) => {
    let entry: Address = new Address(
        <string>req.query.address,
        <string>req.query.postal,
        <string>req.query.city,
        <string>req.query.province,
        <string>req.query.country
    ).parse();

    _database.saveAddress(entry).then(() => {
        logger.info('Added entry ' + entry);
        res.status(200);
        res.send('GREAT SUCCESS')
    }).catch(() => {
        logger.info('Failed to add entry to database');
        res.status(500);
        res.send()
    });
});

/*  Server Initialization   */
logger.info('Initializing server...');
//  Connect to DB
_database.connect();

let server_port = process.env.SERVER_PORT;

app.listen(server_port, function () {
    logger.info('App is listening on port ' + server_port);
});
