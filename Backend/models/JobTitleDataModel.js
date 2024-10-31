import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import EmployeeData from './EmployeeDataModel.js';

const {DataTypes} = Sequelize;

const JobTitleData = db.define('jobTitle_data',{
        job_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        job_title: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        basic_salary: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        transport_allowance: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        meal_allowance: {
            type: DataTypes.INTEGER(50)
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        freezeTableName: true
});

EmployeeData.hasMany(JobTitleData);
JobTitleData.belongsTo(EmployeeData, {foreignKey: 'userId'});

export default JobTitleData;