const fs = require('fs')



class CartContainer {
    
    constructor (ruta){
        this.ruta = ruta;
        this.cartsList = []
    }
 

    async createNewCart(){
        const newCart = {
            productos:[]
        }
        const idCartCreated = await this.save(newCart)
        return idCartCreated
        
    }



    async getData (){
        try{
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(data)

        }catch(err){
            console.log(err)
            return []
        }
    }

    async save (object){    
        const data = await this.getData();  
        let maxId = 0;
        data.forEach(element => {
            if (element.id > maxId ){ maxId = element.id}
        });    
        object.id = (maxId + 1);
        const timestamp = Date.now()
        object.timestamp = timestamp
        data.push(object);
        let objectJSON = JSON.stringify(data);
        try{
           await fs.promises.writeFile(this.ruta,objectJSON)
        }
        catch (err){
            console.log (err)
        }
        return object.id
    }



    async getById (number){
        const data = await this.getData();        
        const founded = data.find( element => element.id == number) || null;
        return founded ;
    }





   async deleteProdById(prodIndex,cartId){              
    try {
        const cartList = await this.getData();
        const cart =  await this.getById(cartId)
        const cartIndex = cartList.findIndex(object => object.id === cartId);    
        if (cart){
            cart.productos.splice(prodIndex, 1)  
        }
        cartList.splice(cartIndex, 1 , cart)
        await this.deleteAll()
        await fs.promises.writeFile(`./${this.ruta}`, JSON.stringify(cartList));
        return cart.id
    } catch (error) {
        throw new Error (`No se puede actualizar: ${error}`);  
    }
}





   async updateById(cartId , newData){
    try {
            const lista = await this.getData();
            const indiceObjeto = lista.findIndex( e => e.id == cartId);  
            lista.splice(indiceObjeto , 1 , newData)
            await this.deleteAll()
            await fs.promises.writeFile(`./${this.ruta}`, JSON.stringify(lista));
            return cartId
    
        } catch (error) {
            throw new Error (`No se puede actualizar: ${error}`);  
        }
    }

    async getProducts(cartId){
        const cartFounded = await this.getById(cartId) 
        const productList = cartFounded.productos
        return productList
    }

    async addProducts (cartId, productsToAdd){
        const cartFounded = await this.getById(cartId)
        cartFounded
            ? productsToAdd.forEach(p=>cartFounded.productos.push(p)) 
            : console.log(err)
        const modifiedId = this.updateById(cartId,cartFounded)    
        return modifiedId    
    }

    async deleteProduct(cartId,prodId){
        const cartFounded = await this.getById(cartId)
        const prodIndex = cartFounded.productos.findIndex( e => e.id == prodId); 
        const idProductoDeleted= this.deleteProdById(prodIndex,cartId)
        return idProductoDeleted
    }

    async deleteAll(){
        try{
            await fs.promises.truncate(this.ruta)
         }
         catch (err){
             console.log (err)
         }
    }
}



module.exports = { CartContainer }
