const {Router} = require ('express')
const {productosRouter} = require('./routeProducts')
const {carritoRouter} = require ('./routeCarrito')
const apiRouter = Router()

apiRouter.use('/productos', productosRouter)
apiRouter.use('/carrito' , carritoRouter)

module.exports = { apiRouter}