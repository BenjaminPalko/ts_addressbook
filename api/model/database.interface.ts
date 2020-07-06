
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
    export function getAddresses(): Address[] {
        let text = 'select * from addressbook';
        let addressbook: Address[] = [];

        client.query(text).then((ret) => {
            for(let row of ret.rows){
                addressbook.push(
                    new Address(row['address'], row['postalcode'], row['city'], row['province'], row['country'])
                )
            }
        }).catch((err) => {
            throw new Error(`${err}`)
        })
        return addressbook;
    }

    export function saveAddress(entry: Address) {
        let text = 'insert into addressbook(address, postalcode, city, province, country) values ($1, $2, $3, $4, $5)';
        let values = [entry.address, entry.postalCode.replace(/\s/g, ""), entry.city, entry.province, entry.country];

        client.query(text, values).catch((err) => {
            throw new Error(`${err}`)
        })
    }

    export function saveOrRetrieveAddressKey(address: Address): number {
        let text = 'select * from createorretrieveaddressbookkey($1, $2, $3, $4, $5)';
        let values = [address.address, address.postalCode, address.city, address.province, address.country];
        let key: number = -1;

        client.query(text, values).then((ret) => {
            key = Number(ret.rows[0])
        }).catch((err) => {
            logger.error(`${err}`)
        })
        return key
    }

    export async function saveUser(user: User) {
        let text: string = 'select * from createorretrieveaddressbookkey($1, $2, $3, $4, $5)';
        let values = [user.address.address, user.address.postalCode, user.address.city, user.address.province, user.address.country];
        let address_key: number;
        client.query(text, values).then((value => {
            address_key = value.rows[0]
        })).catch((err) => {
            logger.error(`${err}`);
            return
        })

        text = 'insert into users(address_key, firstname, middlename, lastname, age, sex) VALUES ($1, $2, $3, $4, $5)';
        values = [];
        let values2 = [address_key, user.firstName, user.middlename, user.lastName, user.age, user.sex];
        await client.query(text, values2)
    }

    export function getUsers(): User[] {
        let users: User[] = [];
        let text = 'select * from users join addressbook a on users.address_fk = a.pk';

        return users
    }

    export function getUserById(id: number): User {
        let text = 'select * from users where user_key = $1'
        let value = [id]

        let user;
        client.query(text, value).then((ret) => {
            user = ret.rows[0]
        }).catch((err) => {
            logger.error(`${err}`)
            throw new Error(`${err}`)
        })
        return new User(user['firstname'], user['middlename'], user['lastname'], user['age'], user['sex'], null)
    }
}
