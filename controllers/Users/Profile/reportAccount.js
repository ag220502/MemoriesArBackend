const queries = require("../../../crudOperations/Users/Profile/reportAccount.js")

const reportAccount = async (req,res)=>{
    const userId = req.body.userId
    const repUsrId = req.body.repUsrId
    const reason = req.body.reason

    if(!userId || !repUsrId || !reason)
    {
        return res.status(400).json("Please select reason.")
    }
    try {
        const insert = await queries.addReportAcc(userId,repUsrId,reason)
        if(insert.affectedRows===1)
        {
            return res.status(200).json("User Reported Successfully.")
        }
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {reportAccount}
