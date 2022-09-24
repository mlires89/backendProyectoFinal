const authValidator = (req,res,next) =>{
    //mas adelante obtendrá la variable administrator
    //const {administrator} = req.body
    const administrator = true;
    if (administrator){
        next()
    }else{
        res.status(401).res.json({ error : -1, descripcion: 'ruta no autorizada' }
        )
    }
}

module.exports = { authValidator}