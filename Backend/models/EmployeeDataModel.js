import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const EmployeeData = db.define('employee_data', {
    employee_id:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nid: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    employee_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    job_title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    dateOfEntry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    url: DataTypes.STRING,
    accessRights: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default EmployeeData;