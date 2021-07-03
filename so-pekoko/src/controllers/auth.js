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

    res.status(500).send({});
  }

  login(req, res) {
    if (!this.#checkMissingMember(req, res)) {
      return;
    }

    res.status(500).send({});
  }
}

const controller = new Controller();
export default controller;
