// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization'); // or 'Authorization: Bearer <token>'
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    // Remove "Bearer " if you are sending it as "Bearer <token>"
    const extractedToken = token.replace('Bearer ', '');
    const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
