const { Router } = require('express');
const productosRouter = Router();
const Contenedor = require('../models/contenedor')
const {authValidator} = require ('../middlewares/auth-mw')
const contenedor = new Contenedor.Contenedor('./src/models/productos.txt')



productosRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const producto = await contenedor.getById(id)
  res.json({"Producto encontrado": producto})
});

productosRouter.get('/', async (req, res) => {
  const productos = await contenedor.getData()
  res.json({'Productos': productos })
})

productosRouter.post('/', authValidator, async (req, res) => {
  const productoNuevo = req.body 
  const idCreated= await contenedor.save(productoNuevo)
  res.json({"ID producto agregado" : idCreated})         
})

productosRouter.put('/:id' , authValidator,async (req , res)=>{
  const id = parseInt(req.params.id)
  const newData = req.body 
  const productoActualizado = await contenedor.updateById(id , newData)
  res.json({"producto actualizado" : productoActualizado})
})


productosRouter.delete('/:id' , authValidator,async (req , res)=>{
  const id = parseInt(req.params.id)
  const productoEliminado = await contenedor.deleteById(id)
  res.json({"producto eliminado" : productoEliminado})
})


module.exports ={productosRouter};