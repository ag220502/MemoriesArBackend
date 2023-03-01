const queries = require('../../crudOperations/Users/users');

const allUsers = async (req, res) => {
    const data = await queries.allUsers();
    res.send(data);
    }

module.exports = {
    allUsers
}