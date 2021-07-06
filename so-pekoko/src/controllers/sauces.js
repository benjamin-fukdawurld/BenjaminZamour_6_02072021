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
    });
  }

  likeSauce(req, res) {
    if(!req.params.id) {
      res.status(400).send({message: 'Missing information'});
      return;
    }

    if(req.body.like < -1 || req.body.like > 1) {
      res.status(400).send({ message: `Invalid 'like' value, received ${req.body.like}` });
    }

    Sauce.findOne({_id: req.params.id}).then(result => {
      if(!result) {
        res.status(404).send({ message: 'Cannot find sauce'});
        return;
      }

      let likeIndex = result.usersLiked.findIndex(userId =>
        userId.toString() === req.user.userId
      );

      let dislikeIndex = result.usersDisliked.findIndex(userId =>
        userId.toString() === req.user.userId
      );

      const updateLikes = (addData, removeData) => {
        const { addIndex, addArray } = addData;
        const { removeIndex, removeArray } = removeData;

        if(addIndex >= 0) {
          res.status(400).send({message: 'Cannot like/dislike a sauce twice'});
          return;
        }

        if(removeIndex >= 0) {
          removeArray.splice(removeIndex, 1);
          removeData.countUpdater();
        }

        addArray.push(req.user.userId);
        addData.countUpdater();
      }

      if(req.body.like === 1) {
        updateLikes(
          {
            addIndex: likeIndex,
            addArray: result.usersLiked,
            countUpdater: () => ++result.likes
          },
          {
            removeIndex: dislikeIndex,
            removeArray: result.usersDisliked,
            countUpdater: () => --result.dislikes
          });
      } else if(req.body.like === -1) {
        updateLikes(
          {
            addIndex: dislikeIndex,
            addArray: result.usersDisliked,
            countUpdater: () => ++result.dislikes
          },
          {
            removeIndex: likeIndex,
            removeArray: result.usersLiked,
            countUpdater: () => --result.likes
          });
      } else {
        if(likeIndex >= 0) {
          result.usersLiked.splice(likeIndex, 1);
          --result.likes;
        }

        if(dislikeIndex >= 0) {
          result.usersDisliked.splice(dislikeIndex, 1);
          --result.dislikes;
        }
      }

      delete result._id;

      Sauce.updateOne({ _id: req.params.id }, result)
        .then(() => res.status(200).send({ message: "Like status updated" }))
        .catch((error) => res.status(500).send(error))
    }).catch(error => {
      res.status(400).send(error);
    })
  }
}

const controller = new Controller();

export default controller;
