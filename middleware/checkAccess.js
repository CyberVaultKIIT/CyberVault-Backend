function checkAccess(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user?.role;
  
      if (allowedRoles.includes(userRole)) {
        return next();
      } else {
    
        return res.status(401).json({ message: "Access Forbidden: Insufficient permissions" });
      }
    };
  }
  
  module.exports = {checkAccess};
  