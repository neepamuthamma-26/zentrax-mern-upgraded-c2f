const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  // Log incoming request headers for debugging token issues
  try {
    console.log("[AUTH] Incoming request:", req.method, req.originalUrl);
    console.log("[AUTH] Request headers:", JSON.stringify(req.headers));
  } catch (e) {
    // ignore logging errors
  }

  const token =
    req.headers["x-auth-token"] ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  console.log("[AUTH] Extracted token:", token ? `${token.substring(0, 20)}...` : null);

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized — no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach lean user object (no password) to request
    req.user = await User.findById(decoded.id).select("-password").lean();
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};

module.exports = { requireAuth, requireRole };
