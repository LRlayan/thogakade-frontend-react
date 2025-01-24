export class Item {
    id: number;
    itemId: string;
    name: string;
    quantity: number;
    price: number;

    constructor(id: number, itemId: string, name: string, quantity: number, price: number) {
        this.id = id;
        this.itemId = itemId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}