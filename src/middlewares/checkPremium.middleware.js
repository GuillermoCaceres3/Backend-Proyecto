const premiumAccess = (req, res, next) => {
    if (req.user.userType === "premium" || req.user.userType === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Premium content only." });
};

export default premiumAccess;