
/*  DB client   */
import {Client, QueryResult} from "pg";
const client: Client = new Client();


/*  Shared Classes  */
import {shared_classes} from "./shared.models";
import Address = shared_classes.Address;
import User = shared_classes.User;
import { factory, Logger } from "../ConfigLog4j";

/*  external imports    */
import path from 'path';

const logger: Logger = factory.getLogger(
    path.basename(__filename, path.extname(__filename))
);

/*  Database Functions  */
export module _database {

    /**
     * Connects client to DB
     * @param attempt
     * @param max_attempts
     * @param timeout
     */
    export function connect(attempt= 0, max_attempts = 10, timeout = 1000) {
        if(attempt < max_attempts){
            setTimeout(() => {
                client.connect().then(() => {
                    logger.info('Database connection successful!')
                }).catch(() => {
                    logger.info('Database connection attempt ' + ++attempt + '/ ${max_attempts}' + max_attempts + ' failed...');
                    connect(attempt)
                })
            }, timeout)
        }
    }

    /**
     * Gets all entries in the AddressBook table
     */
    export async function getAddresses(): Promise<QueryResult> {
        logger.info('Retrieving addresses');
        let text = 'select * from AddressBook';

        return await client.query(text)
    }

    export async function saveAddress(entry: Address) {
        logger.info('Saving AddressBook: ' + entry);
        let text = 'insert into AddressBook(address, postalcode, city, province, country) values ($1, $2, $3, $4, $5)';
        let values = [entry.address, entry.postalCode.replace(/\s/g, ""), entry.city, entry.province, entry.country];

        await client.query(text, values)
    }

    export async function saveUser(user: User) {

        let text = 'select * from addressbook where ($1, $2, $3, $4, $5)';
        let values = [user.address.address, user.address.postalCode, user.address.city, user.address.province, user.address.country];
    }
}
