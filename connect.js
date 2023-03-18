const mysql = require("mysql")

const db = mysql.createPool({

   host:"sg3plcpnl0125.prod.sin3.secureserver.net",
   user: "akshay_year3",
   password: "MemAkshay123",
   database: "memories_ar",
})

module.exports = db

// const mysql = require("mysql")

// const db = mysql.createPool({

//     host:"localhost",
//     user: "root",
//     database: "memories_ar",
// })

// module.exports = db
