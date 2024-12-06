const jwt = require('jsonwebtoken');

const secretKey = 'creamy'; // Replace with your actual secret key

export const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
