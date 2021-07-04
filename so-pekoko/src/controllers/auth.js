import User from '../models/User.js';
import bcrypt from 'bcrypt';
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

    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({ email: req.body.email, password: hash});

      user
        .save()
        .then((savedUser) => {
          res.status(201).send({ userId: savedUser._id });
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
          res.status(401).send({ message: 'Connection data invalid' });
          return;
        }

        bcrypt.compare(password, user.password).then(result => {
          if(result){
            res.status(200).send({
              userId: user.userId,
              token: jwt.sign(
                { userId: user.userId },
                process.env.TOKEN_KEY,
                { expiresIn: process.env.TOKEN_DURATION }
              )
            });
          } else {
            res.status(401).send({ message: 'Connection data invalid' });
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
