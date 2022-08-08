exports.allAccess = (req, res) => {
    res.status(200);
    res.send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200);
    res.send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200);
    res.send("Admin Content.");
};

exports.syperAdminBoard = (req, res) => {
    res.status(200);
    res.send("Super Admin Content.");
};