const adminAuth = (req, resp, next) => {
  const token = "xyz"; //req.body?.token
  const isAdminAutherized = token === "xyz";

  if (!isAdminAutherized) {
    resp.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

const userAuth = (req, resp, next) => {
  const token = "xyz"; //req.body?.token
  const isAdminAutherized = token === "xyz";

  if (!isAdminAutherized) {
    resp.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
