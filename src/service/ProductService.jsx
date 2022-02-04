export class ProductService {

    getProductsSmall() {
        return fetch('../data/products-small.json').then(res => res).then(d => d.data);
    }

    getProducts() {
        return fetch('../data/products-small.json').then(res => res.json())
        .then(datos =>datos.data
        );
        
    }

    getProductsWithOrdersSmall() {
        return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
    }
}
  