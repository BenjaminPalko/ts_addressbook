"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared_classes = void 0;
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
            return this;
        };
        return Address;
    }());
    shared_classes.Address = Address;
    var User = /** @class */ (function () {
        /**
         *
         * @param firstName
         * @param middlename
         * @param lastName
         * @param sex 'm' OR 'f'
         * @param address
         */
        function User(firstName, middlename, lastName, age, sex) {
            this.firstName = firstName;
            this.middlename = middlename;
            this.lastName = lastName;
            this.age = age;
            this.sex = sex;
        }
        return User;
    }());
    shared_classes.User = User;
})(shared_classes = exports.shared_classes || (exports.shared_classes = {}));
