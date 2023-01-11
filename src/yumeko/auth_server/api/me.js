module.exports = async (req, res) => {
    let user = req.session.owner;

    res.json({
        success: true,
        user: {
            id: user.id,
            username: user.name,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name
        }
    });
}