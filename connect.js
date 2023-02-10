import mysql from "mysql"

export const db = mysql.createConnection({
    host:'sg3plcpnl0125.prod.sin3.secureserver.net',
    user:"akshay_year3",
    password:"MemAkshay123",
    database:"memories_ar"
})
// if(db)
// {
//     console.log("Hllo")
// }