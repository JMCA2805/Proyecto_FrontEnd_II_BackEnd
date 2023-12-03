const Reseñas = require("../models/reseñas");
const Usuario = require("../models/user.js");


const agregarReseña = async (req, res) => {
  try {
    const { tipo, nombre, comentario, producto, serial, userid } = req.body;

    const cmntr = {
      tipo,
      nombre,
      comentario,
      productoid: serial,
      productonombre: producto,
      userid
    };

    if (!comentario) {
      res.status(500).send({ Error: "Porfavor ingrese un comentario" });
      return;
    }
    const nuevoComentario = new Reseñas(cmntr);

    nuevoComentario.save();

    res.status(200).send({ message: "¡Reseña Enviada con Exito!" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ Error: "Error al eviar la reseña" });
  }
};

const getReseñas = async (req, res) => {
  try {
    const getComentarios = await Reseñas.find({})
      .sort({ _id: -1 })
      .limit(5);
    res.status(200).json(getComentarios);
  } catch (error) {
    res.status(500).send({ Error: "Error al obtener las reseñas" });
  }
};

const filReseñaProd = async (req, res) => {
  const { serial } = req.body;
  try {
    const getComentarios = await Reseñas.find({
      productoid: serial,
    });


    for (const comentario of getComentarios) {
      const usuario = await Usuario.findById(comentario.userid);

      // Extracción de la imagen
      const imagenCompleta =
        "data:" +
        usuario.imagen.contentType +
        ";base64," +
        usuario.imagen.data.toString("base64");

      // Actualización del comentario con la imagen
      comentario.imagenUser = imagenCompleta;
    }



    res.status(200).json(getComentarios);
  } catch (error) {
    res.status(500).send({ Error: "Error al obtener las reseñas" });
  }
};


module.exports = { agregarComentario: agregarReseña, getComentario: getReseñas, filReseñaProd };
