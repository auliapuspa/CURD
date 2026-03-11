import jwt from 'jsonwebtoken';
const secret = 'secret';

const generateToken = (payload) => {
 const token = jwt.sign(payload, secret);
 return token;
}

const decodedToken = (payload) => {
  const decoded = jwt.verify(payload, secret);
  return decoded;       
};

export default{ generateToken, decodedToken };