import Sauce from '../models/Sauce.js';

class Controller {
  getSauces(req, res) {
    Sauce.find()
      .then((sauces) => {
        res.status(200).send(sauces);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  getSauce(req, res) {
    res.status(500).send({});
  }

  addSauce(req, res) {
    res.status(500).send({});
  }

  updateSauce(req, res) {
    res.status(500).send({});
  }

  deleteSauce(req, res) {
    res.status(500).send({});
  }

  likeSauce(req, res) {
    res.status(500).send({});
  }
}

const controller = new Controller();

export default controller;
