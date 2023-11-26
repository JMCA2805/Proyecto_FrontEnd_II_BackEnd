const Usuario = require("../models/user.js");

class carritoController {
  // Controlador para guardar una nuevo pago
  consultarCarrito = async (req, res) => {
    try {

        //const { serial, action } = req.body;
        const idUser = req.params.id

        const usuario = await Usuario.find({_id: idUser});
        const carrito = usuario[0].carrito


        console.log(carrito)




        
        res.status(201).send(carrito);
      
    } catch (error) {
      console.error("Error al consultar Carrito:", error);
      res.status(500).json({ Error: "Error al consultar Carrito" });
    }
  };

}

const carritoC = new carritoController();

module.exports = carritoC;
