"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared_functions = exports.shared_classes = void 0;
var shared_classes;
(function (shared_classes) {
    var Address = /** @class */ (function () {
        /**
         *
         * @param streetNumber
         * @param postalCode
         * @param city
         * @param province
         * @param country
         */
        function Address(streetNumber, postalCode, city, province, country) {
            this.address = streetNumber;
            this.postalCode = postalCode;
            this.city = city;
            this.province = province;
            this.country = country;
        }
        Address.prototype.parse = function () {
            this.address.trim();
            this.postalCode.replace(/ /g, "");
            this.city.trim();
            this.province.trim();
            this.country.trim();
        };
        return Address;
    }());
    shared_classes.Address = Address;
    var User = /** @class */ (function () {
        /**
         *
         * @param firstName
         * @param lastName
         * @param address
         */
        function User(firstName, lastName, address) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
        }
        return User;
    }());
    shared_classes.User = User;
})(shared_classes = exports.shared_classes || (exports.shared_classes = {}));
var shared_functions;
(function (shared_functions) {
    function loadAddressFromRows() {
    }
    shared_functions.loadAddressFromRows = loadAddressFromRows;
})(shared_functions = exports.shared_functions || (exports.shared_functions = {}));
