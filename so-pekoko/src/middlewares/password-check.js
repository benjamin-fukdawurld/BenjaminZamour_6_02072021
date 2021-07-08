import pwdValidator from 'password-validator';

const schema = new pwdValidator();
schema
    .is().min(6)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .is().not().oneOf([
        'Pa$$w0rd',
        'Pa$sw0rd',
        'Pas$w0rd'
    ])


export default function (req, res, next) {
    const failedRules = schema.validate(req.body.password, { list: true });
    if(failedRules.length !== 0) {
        res.status(400).send({ message: 'Password is not strong enough', failedRules });
        return;
    }

    next();
}