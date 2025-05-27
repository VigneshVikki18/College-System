import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // ✅ Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 🔐 Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔍 Find user by ID (excluding password)
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // 📌 Attach user data to req.user
      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
