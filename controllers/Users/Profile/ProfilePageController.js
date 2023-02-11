const db = require('../../../connect.js')

export const getUserProfile = (req, res) => {
    const { id } = req.body.id;
    db.query('SELECT id,firstName,lastName,bio,profilePhoto,accVerified FROM `users` WHERE id=?', [id], (err, results) => {
        if (err || results.length) {
            return res.status(404).json({ error: 'user not found or does not exist' });
        } else {
            res.status(200).json(results);
        }
    });

}