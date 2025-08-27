const authVerify = (req, res) => {
    res.status(200).json({id: req.userId, userType: req.userType});
}

module.exports = authVerify;