const adminOnly = (req, res, next) => {
    if (req.user && req.user.userType === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};

module.exports = adminOnly;
