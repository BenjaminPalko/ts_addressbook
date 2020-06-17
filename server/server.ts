
/*  Custom Components   */
import {database_functions} from "./db_controller";

/*  Express */
import express = require('express');

const app: express.Application = express();

app.get('/', function(req, res) {
    res.send('Hello world!');
});

/**
 * Get addressbook from database given user id
 */
app.get('/addressbook', function (req, res) {
    console.log('Addressbook GET request for id: ', req.query.id)
    res.send(
        database_functions.getByID(
            Number(req.query.id)
        )
    );
});

app.listen(3000, function () {
    console.log('App is listening on port 3000...')
})
