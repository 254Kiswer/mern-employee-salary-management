import JobTitleData from "../models/JobTitleDataModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import { Op } from "sequelize";

// menampilkan semua data jabatan
export const getJobTitleData = async (req, res) => {
    try {
        let response;
        if (req.accessRights === "admin") {
            response = await JobTitleData.findAll({
                attributes: ['id', 'job_title', 'basic_salary', 'transport_allowance', 'meal_allowance'],
                include: [{
                    model: EmployeeData,
                    attributes: ['employeeName', 'username', 'accessRights'],
                }]
            });
        } else {
            if (req.userId !== JobTitleData.userId) return res.status(403).json({ msg: "Access Forbidden" });
            await JobTitleData.update({
                job_title, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ job_id: jobTitle.job_id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk menampilkan data jabatan by ID
export const getJobTitleDataByID = async (req, res) => {
    try {
        const response = await JobTitleData.findOne({
            attributes: [
                'id','job_title', 'basic_salary', 'transport_allowance', 'meal_allowance',
            ],
            where: {
                id: req.params.id
            }
        });
        if(response){
            res.status(200).json(response);
        }else{
            res.status(404).json({msg: 'Job data with that ID not found'});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Method to add job data
export const createJobTitleData = async (req, res) => {
    const {
        job_id, job_title, basic_salary, transport_allowance, meal_allowance
    } = req.body;
    try {
        if (req.accessRights === "admin") {
            await JobTitleData.create({
                job_id: job_id,
                job_title: job_title,
                basic_salary: basic_salary,
                transport_allowance: transport_allowance,
                meal_allowance: meal_allowance,
                userId: req.userId
            });
        } else {
            if (req.userId !== JobTitleData.userId) return res.status(403).json({ msg: "Access Forbidden" });
            await JobTitleData.update({
                job_title, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ job_id: job_title.job_id }, { userId: req.userId }]
                },
            });
        }
        res.status(201).json({ success: true, message: "Job data successfully saved" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}

// method untuk update data jabatan
export const updateJobTitleData = async (req, res) => {
    try {
        const jobTitle = await JobTitleData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jobTitle) return res.status(404).json({ msg: "Data not found" });
        const { job_title, basic_salary, transport_allowance, meal_allowance } = req.body;
        if (req.accessRights === "admin") {
            await JobTitleData.update({
                job_title, basic_salary, transport_allowance, meal_allowance,
            }, {
                where: {
                    id: jobTitle.id
                }
            });
        } else {
            if (req.userId !== jobTitle.userId) return res.status(403).json({ msg: "Access Forbidden" });
            await DataJabatan.update({
                job_title, basic_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ job_id: jobTitle.job_id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Job data successfully updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk delete data jabatan
export const deleteJobTitleData = async (req, res) => {
    try {
        const jobTitle = await JobTitleData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jobTitle) return res.status(404).json({ msg: "Data not found" });
        if (req.accessRights === "admin") {
            await jobTitle.destroy({
                where: {
                    id: jobTitle.id
                }
            });
        } else {
            if (req.userId !== jobTitle.userId) return res.status(403).json({ msg: "Access Forbidden" });
            await jobTitle.destroy({
                where: {
                    [Op.and]: [{ job_id: jobTitle.job_id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Job data successfully deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}