const Usuario = require("../models/user.js");
const { enviarEmail } = require("../scripts/nodemailer");

class pagosController {
  // Controlador para guardar una nueva Habitacion
  agregarPago = async (req, res) => {
    try {

        function generateRandomCode() {
            const codeLength = 6;
            const codePrefix = 'F';
            const digits = '0123456789';
          
            let code = codePrefix;
          
            for (let i = 0; i < codeLength - 1; i++) {
              const randomIndex = Math.floor(Math.random() * digits.length);
              code += digits[randomIndex];
            }
          
            return code;
        }
          
        const randomCode = generateRandomCode();

          
        const datosCliente = req.body.clientData
        const producto = req.body.productData
        const productos = []
        productos[0] = producto
        productos[1] = { nombreProducto: 'algo', cantidad: '3', precio: '10' }
        const pago = {
            factura: randomCode,
            nombre: datosCliente.nombre,
            apellido: datosCliente.apellido,
            telefono: datosCliente.telefono,
            direccion: datosCliente.direccion,
            correo: "jose.al.es301@gmail.com",
            productos,
            fecha: "25/11/23"

        }
        console.log(pago)
        enviarEmail(pago)
        res.status(201).send("Habitación agregada correctamente");
      
    } catch (error) {
      console.error("Error al agregar habitación:", error);
      res.status(500).json({ Error: "Error al agregar habitación" });
    }
  };

}

const pagosC = new pagosController();

module.exports = pagosC;
