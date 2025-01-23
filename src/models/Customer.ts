export class Customer {
    customerId:string;
    name: string;
    address: string;
    email: string;

    constructor(customerId:string ,name: string, address: string, email: string) {
        this.customerId = customerId;
        this.name = name;
        this.address = address;
        this.email = email;
    }
}