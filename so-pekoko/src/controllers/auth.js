import User from '../models/User.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

class Controller {
  #checkMissingMember;
  constructor() {
    this.#checkMissingMember = (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send({ message: 'Missing information' });
        return false;
      }

      return true;
    };
  }

  signup(req, res) {
    if (!this.#checkMissingMember(req, res)) {
      return;
    }

    argon2.hash(req.body.password, {
      type: argon2.argon2id
    }).then(hash => {
      const user = new User({ email: req.body.email, password: hash});

      user
        .save()
        .then((savedUser) => {
          res.status(201).send({
            message: 'User subscribed',
            userId: savedUser._id });
        })
        .catch((error) => {
          res.status(400).send(error);
        });
      }).catch(error => {
        res.status(500).send(error);
      })
  }

  login(req, res) {
    if (!this.#checkMissingMember(req, res)) {
      return;
    }

    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if(!user) {
          setTimeout(
            () => res.status(401).send({ message: 'Connection data invalid' }),
            3000
          )
          return;
        }

        argon2.verify(user.password, password).then(result => {
          if(result){
            res.status(200).send({
              message: 'User logged',
              userId: user.userId,
              token: jwt.sign(
                { userId: user.userId, priviledge: user.priviledge },
                process.env.TOKEN_KEY,
                { expiresIn: process.env.TOKEN_DURATION }
              )
            });
          } else {
            setTimeout(
              () => res.status(401).send({ message: 'Connection data invalid' }),
              3000
            );
            return;
          }
        }).catch(error => {
          res.status(500).send(error);
        });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  deleteUser(req, res) {
    if (!req.body.userId) {
      res.status(400).send({ message: 'Missing information' });
    }

    if(!req.user.priviledge || req.user.userId !== req.body.userId) {
      res.status(403).send('Unauthorized operation');
      return;
    }

    User.deleteOne({ _id: req.body.userId })
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(404).send({ message: `User '${req.body.id}' does not exist` });
          return;
        }

        res.status(200).send({ message: 'User removed' });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
}

const controller = new Controller();
export default controller;
