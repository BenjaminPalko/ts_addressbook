"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared_classes = void 0;
var shared_classes;
(function (shared_classes) {
    var User = /** @class */ (function () {
        /**
         *
         * @param firstName
         * @param lastName
         */
        function User(id, firstName, lastName) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }
        return User;
    }());
    shared_classes.User = User;
    var AddressBook = /** @class */ (function () {
        /**
         *
         * @param user
         * @param streetNumber
         * @param postalCode
         * @param city
         * @param province
         * @param country
         */
        function AddressBook(user, streetNumber, postalCode, city, province, country) {
            this.user = user;
            this.streetNumber = streetNumber;
            this.postalCode = postalCode;
            this.city = city;
            this.province = province;
            this.country = country;
        }
        return AddressBook;
    }());
    shared_classes.AddressBook = AddressBook;
})(shared_classes = exports.shared_classes || (exports.shared_classes = {}));
