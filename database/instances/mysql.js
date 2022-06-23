const  Sequelize = require("sequelize").Sequelize
const dotenv = require("dotenv")

dotenv.config()

const mysql = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PWD,
  
    {
        dialect: "mysql" ,
        port: parseInt(process.env.MYSQL_PORT),
    }
)

module.exports = mysql