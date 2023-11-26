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
}

const offersC = new offersController();

module.exports = offersC;
