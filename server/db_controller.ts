
/*  Shared Classes  */
import {shared_classes} from "../shared_components/components";
import AddressBook = shared_classes.AddressBook;
import User = shared_classes.User;

/*  Database Functions  */
export module database_functions {
    export function saveByID(id: Number, entry: AddressBook) {
        console.log('Saving Addressbook: ', entry);
    }

    export function getByID(id: Number): AddressBook {
        let user: User = new User(1, "Benjamin", "Palko");
        return new shared_classes.AddressBook(
            user, "10 East Avenue", "K6V 2M7",
            "Brockville", "Ontario", "Canada");
    }
}
