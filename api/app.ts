/*  Custom Components   */
import {factory, Logger} from "./ConfigLog4j";

/*  Express */
import express = require('express');
import path = require('path');
import {shared_classes} from "./model/shared.models";
import Address = shared_classes.Address;
import User = shared_classes.User;

/*  DB client   */
import {Client} from "pg";

const client: Client = new Client();


const app: express.Application = express();
const router: express.Router = express.Router();
const logger: Logger = factory.getLogger(
    path.basename(__filename, path.extname(__filename))
);

app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello world!')
});

/**
 * Get users from database
 */
app.get('/user', async (req, res) => {
    try {
        let text = 'select * from users u join addressbook ab on u.addressbook_key = ab.addressbook_key';

        let { rows } = await client.query(text);

        let users: User[] = [];
        for (let row of rows) {
            users.push(
                new User(row['firstname'], row['middlename'], row['lastname'], row['age'], row['sex'])
            )
        }

        res.status(200);
        res.send(users)
    } catch (e) {

    }
});

app.put('/user', async (req, res) => {
    try {
        let addressBook: Address = new Address(
            String(req.query.address),
            String(req.query.postal),
            String(req.query.city),
            String(req.query.province),
            String(req.query.country)
        ).parse();

        let user: User = new User(
            String(req.query.firstname),
            String(req.query.middlename),
            String(req.query.lastname),
            Number(req.query.age),
            String(req.query.sex)
        );

        let text = 'select * from CreateRetrieveAddressBook($1, $2, $3, $4, $5)';
        let values = [addressBook.address, addressBook.postalCode, addressBook.city, addressBook.province, addressBook.country];
        let {rows} = await client.query(text, values);

        text = 'insert into users(addressbook_key, firstname, middlename, lastname, age, sex) VALUES ($1, $2, $3, $4, $5, $6)';
        values = [rows[0]['addressbook_key'], user.firstName, user.middlename, user.lastName, user.age, user.sex];

        await client.query(text, values);
        res.status(200);
        res.send('GREAT SUCCESS!')
    } catch (e) {
        logger.error(`${e}`);
        res.status(500);
        res.send()
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        let text = 'select * from users where user_key = $1 limit 1';
        let values = [Number(req.params.id)];

        let {rows} = await client.query(text, values)
        let user: User = new User(rows[0]['firstname'], rows[0]['middlename'], rows[0]['lastname'], Number(rows[0]['age']), rows[0]['sex']);
        res.status(200);
        res.send(user)
    } catch (e) {
        logger.error(`${e}`);
        res.status(500);
        res.send()
    }
});

app.get('/user/:id/address', async (req, res) => {
   try{
       let text = 'select * from addressbook ab join users u on ab.addressbook_key = u.user_key where u.user_key = $1';
       let values = [Number(req.params.id)];

       let {rows} = await client.query(text, values);
       let address: Address = new Address(rows[0]['address'], rows[0]['postalcode'], rows[0]['city'], rows[0]['province'], rows[0]['country']);
       res.status(200);
       res.send(address)
   } catch (e) {
       logger.error(`${e}`);
       res.status(500);
       res.send()
   }
});

app.get('/address', async (req, res) => {
    try {
        let text = 'select * from addressbook';
        logger.info('Retrieving addresses...')
        let addressbook: Address[] = [];
        let {rows} = await client.query(text)
        for (let row of rows) {
            addressbook.push(
                new Address(row['address'], row['postalcode'], row['city'], row['province'], row['country'])
            )
        }
        logger.info(JSON.stringify(addressbook));
        res.status(200);
        res.send(addressbook)
    } catch (e) {
        logger.error(`${e}`);
        res.status(500);
        res.send()
    }
});

app.get('/address/:id', async (req, res) => {
    try {
        let text = 'select * from addressbook where addressbook_key = $1 limit 1';
        let values = [Number(req.params.id)];

        let {rows} = await client.query(text, values);
        let address: Address = new Address(rows[0]['address'], rows[0]['postalcode'], rows[0]['city'], rows[0]['province'], rows[0]['country']);
        res.status(200);
        res.send(address)
    } catch (e) {
        logger.error(`${e}`);
        res.status(500);
        res.send()
    }
});

app.put('/address', async (req, res) => {
    try {
        let entry: Address = new Address(
            <string>req.query.address,
            <string>req.query.postal,
            <string>req.query.city,
            <string>req.query.province,
            <string>req.query.country
        ).parse();

        let text = 'insert into addressbook(address, postalcode, city, province, country) values ($1, $2, $3, $4, $5)';
        let values = [entry.address, entry.postalCode.replace(/\s/g, ""), entry.city, entry.province, entry.country];

        await client.query(text, values)
        res.status(200);
        res.send('GREAT SUCCESS!')
    } catch (e) {
        logger.error(`${e}`);
        res.status(500);
        res.send()
    }
});

/*  Server Initialization   */
logger.info('Initializing server...');
//  Connect to DB
client.connect(err => {
    if (err) {
        logger.error(`${err.stack}`)
    } else {
        logger.info('Connected')
    }
})
//_database.connect();

let server_port = process.env.SERVER_PORT;

app.listen(server_port, function () {
    logger.info('App is listening on port ' + server_port);
});
