import Sauce from '../models/Sauce.js';
import fs from 'fs/promises';
import path from 'path';

class Controller {
  getImageUrl(req) {
    return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }

  deleteImageIfExists(filename) {
    const filePath = path.resolve(path.dirname(''), 'images', filename);
    return new Promise((resolve, reject) => {
        fs.access(filePath)
        .then(() => {
          fs.unlink(filePath)
          resolve();
        })
        .catch(() => resolve());
    });
  }

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
    let sauceData = JSON.parse(req.body.sauce);
    delete sauceData._id;
    const sauce = new Sauce({
      ...sauceData,
      imageUrl: this.getImageUrl(req)
    });


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
      return;
    }

    const sauceData = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: this.getImageUrl(req)
    } : { ...req.body };

    Sauce.findOne({_id: req.params.id}).then(result => {
      if(!result) {
        res.status(404).send({ message: 'Cannot find sauce'});
        return;
      }

      if(!req.user.priviledge && result.userId.toString() !== req.user.userId) {
        res.status(403).send({ message: 'Operation unauthorized'});
        return
      }

      const filename = result.imageUrl.split('/images/')[1];
      this.deleteImageIfExists(filename).then(() => {
        Sauce.updateOne({ _id: req.params.id }, { _id: req.params.id, ...sauceData })
          .then(() => res.status(200).send({ message: 'Sauce updated' }))
        });
    }).catch(error => {
      res.status(400).send(error);
    })
  }

  deleteSauce(req, res) {
    if(!req.params.id) {
      res.status(400).send({message: 'Missing information'});
      return;
    }

    Sauce.findOne({_id: req.params.id}).then(result => {
      if(!result) {
        res.status(404).send({ message: 'Cannot find sauce'});
        return;
      }

      if(!req.user.priviledge && result.userId.toString() !== req.user.userId) {
        res.status(403).send({ message: 'Operation unauthorized'});
        return
      }

      const filename = result.imageUrl.split('/images/')[1];
      this.deleteImageIfExists(filename).then(() => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).send({ message: 'Sauce removed' }))
        });
    }).catch(error => {
      res.status(400).send(error);
    })
  }

  likeSauce(req, res) {
    res.status(500).send({});
  }
}

const controller = new Controller();

export default controller;
