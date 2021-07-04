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
        res.status(400).send({ error });
      });
  }

  login(req, res) {
    if (!this.#checkMissingMember(req, res)) {
      return;
    }

    res.status(500).send({});
  }

  deleteUser(req, res) {
    if (!req.body.id) {
      res.status(400).send({ message: 'Missing information' });
    }

    User.remove({ _id: req.body.id })
      .then((count) => {
        if (count === 0) {
          res.status(404).send({ message: `User '${req.body.id}' does not exist` });
        }

        req.status(200).send({ message: 'User removed' });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  }
}

const controller = new Controller();
export default controller;
