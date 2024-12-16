function checkAccess(...allowedRoles) {
    return (req, res, next) => {
      console.log("Entering the function")
      const userRole = req.user?.role;
  
      if (allowedRoles.includes(userRole)) {
        console.log("Entering the if statement")
        return next();
      } else {
        console.log("Entering the else statement")
        return res.status(403).json({ message: "Access Forbidden: Insufficient permissions" });
      }
    };
  }
  
  module.exports = {checkAccess};
  