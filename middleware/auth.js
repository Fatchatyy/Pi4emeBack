import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    //const jwtSecret = generateRandomString(32); // 32 bytes (256 bits) is a common length for JWT secrets
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    // process.env.JWT_SECRET
    const verified = jwt.verify(token, process.env.JWT_SECRET );
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
