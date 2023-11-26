const Ofertas = require("../models/offers.js");

class offersController {
  getOffers = async (req, res) => {
    try {
      const ofertasobt = await Ofertas.find();
      let imagenCompleta;
      let data;
      let frts = [];

      for (let i = 0; i < ofertasobt.length; i++) {
        data = ofertasobt[i].icono.data;
        imagenCompleta =
          "data:" +
          ofertasobt[i].icono.contentType +
          ";base64," +
          data.toString("base64");

        frts[i] = {
          oferta: ofertasobt[i].oferta,
          descripcion: ofertasobt[i].descripcion,
          imagen: imagenCompleta,
        };
      }

      if (frts.length === 0) {
        res
          .status(500)
          .json({ mssg: "No se encontraron ofertas o descuentos" });
      } else {
        res.status(200).json(frts);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: "Error al obtener ofertas o descuentos" });
    }
  };
  addoff = async (req, res) => {
    try {
      const { oferta, descripcion } = req.body;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;

      const tituloOferta = await Ofertas.findOne({ oferta });

      if (tituloOferta) {
        res.status(400).send("Oferta o Descuento ya registrado");
      } else {
        const nuevaOferta = new Ofertas({
          oferta,
          descripcion,
          icono: { data: imagenBuffer, contentType },
        });
        await nuevaOferta.save();
        res.status(201).send("Oferta o Servicio agregado correctamente");
      }
    } catch (error) {
      console.error("Error al agregar Ofertas:", error);
      res.status(500).json({ Error: "Error al agregar Ofertas" });
    }
  };

  eliminarServicio = async (req, res) => {
    try {
      const servicio = req.body.servicio;
      const ser = await Servicios.findOne({ servicio: servicio });
      if (!ser) {
        return res.status(404).json({ mensaje: "servicio no encontrado" });
      }

      await Servicios.deleteOne({ servicio: servicio });

      res.json({ mensaje: "Servicios eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el servicio", error);
      res.status(500).json({ mensaje: "Error al eliminar el servicio" });
    }
  };

  editarServicio = async (req, res) => {
    try {
      const { viejo, servicio, descripcion } = req.body;

      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;

      const servicios = await Servicios.findOne({ servicio: viejo });

      if (!servicios) {
        return res.status(404).json({ mensaje: "Servicio no encontrado" });
      }

      // Actualiza los datos del artículo
      servicios.servicio = servicio;
      servicios.descripcion = descripcion;
      servicios.icono = { data: imagenBuffer, contentType };

      await servicios.save();

      res.json({ mensaje: "Servicio editado correctamente" });
    } catch (error) {
      console.error("Error al editar el servicio:", error);
      res.status(500).json({ mensaje: "Error al editar el servicio" });
    }
  };
}

const offersC = new offersController();

module.exports = offersC;
