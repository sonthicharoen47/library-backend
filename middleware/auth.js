const ensureAuthenticated = (req, res, next) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    
    return next();
  }
  res.send("fail login please");
};

module.exports = ensureAuthenticated;
