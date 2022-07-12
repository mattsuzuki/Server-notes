const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    // Read Token off cookies
    const token = req.cookies.Authorization;
    // decode the token
    const decoded = jwt.verify(token, process.env.SECRET);
    // Check expirtation
    if (Date.now() > decoded.exp) return res.sendStatus(401);
    // Find user using decoded sub
    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);
    // attach user to request
    req.user = user;
    // continue on
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
