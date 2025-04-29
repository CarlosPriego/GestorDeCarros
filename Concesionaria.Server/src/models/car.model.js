import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/mysql.js";

export const Car = sequelize.define('Car', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    marca: {
        type: DataTypes.STRING
    },
    modelo: {
        type: DataTypes.STRING
    },
    motor: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},
{
    tableName: 'Car',
    timestamps: false,
    createdAt: false
});

