export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
};

export const isMod = (req, res, next) => {
    if (!req.user || (req.user.role !== "mod" && req.user.role !== "admin")) {
        return res.status(403).json({ message: "Access denied. Moderator only." });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
};
