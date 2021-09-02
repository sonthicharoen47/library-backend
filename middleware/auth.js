const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("fail login please");
};

module.exports = { ensureAuthenticated };
