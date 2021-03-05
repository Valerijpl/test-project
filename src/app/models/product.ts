export class Product {
  constructor(public name: string, public id: number, public company: string, public createdAt: string, public description: string, public img: string, public price: number) {};
}

export class ProductModel {
  static create(event: Product) {
   return new Product(event.name, event.id, event.company, event.createdAt, event.description, event.img, event.price);
 }
}
