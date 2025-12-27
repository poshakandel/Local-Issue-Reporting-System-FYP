export const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "SuperAdmin") {
    return res.status(403).json({ message: "Super Admin access only" });
  }
  next();
};

export const isWardAdmin = (req, res, next) => {
  if (req.user.role !== "WardAdmin") {
    return res.status(403).json({ message: "Ward Admin access only" });
  }
  next();
};

export const isCitizen = (req, res, next) => {
  if (req.user.role !== "Citizen") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

