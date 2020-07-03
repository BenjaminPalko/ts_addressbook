
export module shared_classes {

    export class Address {

        public address: string;
        public postalCode: string;
        public city: string;
        public province: string;
        public country: string;

        /**
         *
         * @param streetNumber
         * @param postalCode
         * @param city
         * @param province
         * @param country
         */
        constructor(streetNumber: string, postalCode: string, city: string, province: string, country: string) {
            this.address = streetNumber;
            this.postalCode = postalCode;
            this.city = city;
            this.province = province;
            this.country = country;
        }

        parse(): Address {
            this.address.trim();
            this.postalCode.replace(/ /g, "");
            this.city.trim();
            this.province.trim();
            this.country.trim();
            return this
        }
    }

    export class User {

        public firstName: string;
        public middlename: string;
        public lastName: string;
        public age: number;
        public sex: string;
        public address: Address;

        /**
         *
         * @param firstName
         * @param middlename
         * @param lastName
         * @param sex 'm' OR 'f'
         * @param address
         */
        constructor(firstName: string, middlename: string, lastName: string, age: number, sex: string, address: Address) {
            this.firstName = firstName;
            this.middlename = middlename;
            this.lastName = lastName;
            this.age = age;
            this.sex = sex;
            this.address = address;
        }
    }
}

export module shared_functions {

    export function loadAddressFromRows() {

    }
}
