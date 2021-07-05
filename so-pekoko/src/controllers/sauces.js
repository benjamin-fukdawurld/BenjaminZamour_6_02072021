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
    const { id } = req.params;
    Sauce.findOne({ _id: id })
      .then((sauce) => {
        res.status(200).send(sauce);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  addSauce(req, res) {
    let { image, sauce } = req.body;
    sauce = new Sauce(sauce);

    sauce
      .save()
      .then(() => {
        res.status(201).send({ message: 'Sauce added' });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  updateSauce(req, res) {
    if(!req.params.id) {
      res.status(400).send({message: 'Missing information'});
    }

    Sauce.findOne({_id: req.params.id}).then(result => {

    }).catch(error => {
      res.status(400).send(error);
    })
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
