const {Router} = require ('express')
const {CartContainer} = require('../models/carrito-model')
const carritoRouter = Router()


const cartContainer = new CartContainer('./src/models/carritos.txt')

carritoRouter.post("/",async (req,res)=>{
    const idCreated = await cartContainer.createNewCart()
    idCreated !=0
        ? res.json ({'ID Carrito creado': idCreated})
        : res.status(500).send('no se pudo crear carrito')
})

carritoRouter.delete("/:id",async (req,res)=>{
    const idToDelete = parseInt(req.params.id)
    const cartEliminado = await cartContainer.deleteById(idToDelete)
    res.json ({"carrito eliminado": cartEliminado})
   
})

carritoRouter.get('/:id/productos', async (req,res)=>{
    const cartId = parseInt(req.params.id)
    const productos = await cartContainer.getProducts(cartId)
    res.json({productos})
})

// creo este endpoint para facilitar los resultados de las pruebas

carritoRouter.get('/', async (req,res)=>{

    const cartList = await cartContainer.getData()
    res.json({cartList})
})

/**************************************************************/

carritoRouter.post('/:id/productos', async (req,res)=>{
    const cartId = parseInt(req.params.id)
    const productsToAdd = req.body
    const modifiedId = await cartContainer.addProducts(cartId,productsToAdd)
    res.json({"Productos agregados al carrito": modifiedId})
})


carritoRouter.delete('/:id/productos/:id_prod',async (req,res)=>{
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.params.id_prod)
    const idDeleted = await cartContainer.deleteProduct(cartId,productId)
    res.json({"Producto Eliminado del carrito": idDeleted})
})
module.exports ={carritoRouter}