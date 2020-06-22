"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database_functions = void 0;
/*  Shared Classes  */
var shared_modules_1 = require("./shared.models");
var User = shared_modules_1.shared_classes.User;
/*  Database Functions  */
var database_functions;
(function (database_functions) {
    function saveByID(id, entry) {
        console.log('Saving Addressbook: ', entry);
    }
    database_functions.saveByID = saveByID;
    function getByID(id) {
        var user = new User(1, "Benjamin", "Palko");
        return new shared_modules_1.shared_classes.AddressBook(user, "10 East Avenue", "K6V 2M7", "Brockville", "Ontario", "Canada");
    }
    database_functions.getByID = getByID;
})(database_functions = exports.database_functions || (exports.database_functions = {}));
