const checkAdmin = (req, res, next) => {
    if (req.user && req.user.userType === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  };
  
export default checkAdmin