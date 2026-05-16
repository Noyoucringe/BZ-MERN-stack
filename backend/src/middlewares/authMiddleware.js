import jwt from 'jsonwebtoken'


export const protect = async (req, res, next) => {
  
   const token = req.cookies?.jwt;
   if (!token) {
       return res.status(401).json({ message: "JWT Token is missing" });
   }

   const jwtSecret = process.env.JWT_SECRET;
   if (!jwtSecret) {
       return res.status(500).json({ message: "Server misconfiguration: JWT secret missing" });
   }

   try {
       const verify = jwt.verify(token, jwtSecret);
       req.user = verify;
       next();
   } catch (error) {
       console.error(error);
       return res.status(401).json({ message: "Invalid or expired token" });
   }
}
