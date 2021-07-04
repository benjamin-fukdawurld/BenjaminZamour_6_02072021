import User from '../models/User.js';

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

    delete req.body._id;
    const user = new User(req.body);

    user
      .save()
      .then((savedUser) => {
        console.log(savedUser.toJSON());
        res.status(201).send({ userId: savedUser._id });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  login(req, res) {
    if (!this.#checkMissingMember(req, res)) {
      return;
    }

    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (user.password !== password) {
          res.status(400).send({ message: 'Connection data invalid' });
        }

        res.status(200).send({ userId: user.userId, token: 'some crypted token' });
      })
      .catch((error) => {
        res.status(400).send(error);
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
