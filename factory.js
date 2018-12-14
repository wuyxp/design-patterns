class Factory{
    constructor(){
    }
    createProduct(){
        console.log('我要生产商品了');
        return new Product()
    }
    createNoProduct(){
        console.log('我要生产一个不是商品了');
        return new NoProduct()
    }
}
class Product{
    log(){
        console.log('我是一个商品');
    }
} 
class NoProduct{
    log(){
        console.log('我不是一个商品');
    }
} 
const factory = new Factory();
const product = factory.createProduct();
product.log()
const noProduct = factory.createNoProduct();
noProduct.log()