
export module shared_classes {
    export class User {
        public id: Number;
        public firstName: string;
        public lastName: string;

        /**
         *
         * @param firstName
         * @param lastName
         */
        constructor(id: Number, firstName: string, lastName: string) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }


    export class AddressBook {
        public user: User;
        public streetNumber: string;
        public postalCode: string;
        public city: string;
        public province: string;
        public country: string;

        /**
         *
         * @param user
         * @param streetNumber
         * @param postalCode
         * @param city
         * @param province
         * @param country
         */
        constructor(user: User, streetNumber: string, postalCode: string, city: string, province: string, country: string) {
            this.user = user;
            this.streetNumber = streetNumber;
            this.postalCode = postalCode;
            this.city = city;
            this.province = province;
            this.country = country;
        }
    }
}
