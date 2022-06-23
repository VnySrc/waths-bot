const mysql = require("../database/instances/mysql")
const { DataTypes } = require("sequelize");

const Client = mysql.define("Client",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phase: {    
        type: DataTypes.STRING,
        allowNull: false,
    },
    collection: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
},
    {
    timestamps: false,
    createdAt: false,
    }
)

module.exports = Client