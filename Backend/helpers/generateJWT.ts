import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    return new Promise((res) => {

        const payload = { uid };
        const privateKey: any = process.env.SECRETORPRIVATEKEY;

        jwt.sign(payload, privateKey, {
            expiresIn: '12h'
        }, (err: any, token: any) => {
            if (err) {
                res('An error has occured while generating token');
            } else {
                res(token);
            }
        });
    });
}