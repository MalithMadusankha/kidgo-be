const admin = require("firebase-admin");

// Firebase Authentication middleware
async function Authenticate(req, res, next) {
  try {
    if (req.headers.authorization) {
      const idToken = req.headers.authorization.split(" ")[1];
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } else {
      res.status(401).send({ res: "Authorization heder is not found " });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ res: "Unauthorized user" });
  }
}

module.exports = Authenticate;
