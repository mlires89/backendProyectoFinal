const authValidator = (req,res,next) =>{
    const {administrator} = req.body
    if (administrator){
        next()
    }else{
        res.status(401).res.json({ error : -1, descripcion: 'ruta no autorizada' }
        )
    }
}

module.exports = { authValidator}