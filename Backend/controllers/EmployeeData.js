import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import path from "path";

// menampilkan semua data Pegawai
export const getEmployeeData = async (req, res) => {
    try {
        const response = await EmployeeData.findAll({
            attributes: [
                'id', 'nid', 'employeeName',
                'gender', 'job_title', 'dateOfEntry',
                'status', 'photo', 'accessRights'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data Pegawai berdasarkan ID
export const getEmployeeDataByID = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nid', 'employeeName',
                'gender', 'job_title', 'username', 'dateOfEntry',
                'status', 'photo', 'accessRights'
            ],
            where: {
                id: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that ID not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data pegawai berdasarkan NIK
export const getEmployeeDataByNid = async (req, res) => {
    try {
        const response = await EmployeeData.findOne({
            attributes: [
                'id', 'nid', 'employeeName',
                'gender', 'job_title', 'dateOfEntry',
                'status', 'photo', 'accessRights'
            ],
            where: {
                nik: req.params.nid
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that NID not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// method untuk mencari data pegawai berdasarkan Nama
export const getEmployeeDataByName = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({
            attributes: [
                'id', 'nid', 'employeeName',
                'gender', 'job_title', 'dateOfEntry',
                'status', 'photo', 'accessRights'
            ],
            where: {
                employeeName: req.params.name
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee data with that name not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//  method untuk tambah data Pegawai
export const createEmployeeData = async (req, res) => {
    const {
        nid, employeeName,
        username, password, confPassword, gender,
        job_title, dateOfEntry,
        status, accessRights
    } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and confirmation password do not match" });
    }

    if (!req.files || !req.files.photo) {
        return res.status(400).json({ msg: "Photo upload failed. Please upload the photo again" });
    }

    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Photo file does not match the format" });
    }

    if (fileSize > 2000000) {
        return res.status(422).json({ msg: "Image size must be less than 2 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }

        const hashPassword = await argon2.hash(password);

        try {
            await EmployeeData.create({
                nid: nid,
                employeeName: employeeName,
                username: username,
                password: hashPassword,
                gender: gender,
                job_title: job_title,
                dateOfEntry: dateOfEntry,
                status: status,
                photo: fileName,
                url: url,
                accessRights: accessRights
            });

            res.status(201).json({ success: true, message: "Registration successful" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    });
};


// method untuk update data Pegawai
export const updateEmployeeData = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employee) return res.staus(404).json({ msg: "Employee data not found" });
    const {
        nid, employeeName,
        username, gender,
        job_title, dateOfEntry,
        status, accessRights
    } = req.body;

    try {
        await EmployeeData.update({
            nid: nid,
            employeeName: employeeName,
            username: username,
            gender: gender,
            job_title: job_title,
            dateOfEntry: dateOfEntry,
            status: status,
            accessRights: accessRights
        }, {
            where: {
                id: pegawai.id
            }
        });
        res.status(200).json({ msg: "Employee data successfully updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Method untuk update password Pegawai
export const changePasswordAdmin = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!employee) return res.status(404).json({ msg: "Employee data not found" });


    const { password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Password and confirmation password do not match" });

    try {
        if (employee.accessRights === "employee") {
            const hashPassword = await argon2.hash(password);

            await EmployeeData.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id: employee.id
                    }
                }
            );

            res.status(200).json({ msg: "Employee password successfully updated" });
        } else {
            res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// method untuk delete data Pegawai
export const deleteEmployeeData = async (req, res) => {
    const employee = await EmployeeData.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!employee) return res.status(404).json({ msg: "Employee data not found" });
    try {
        await EmployeeData.destroy({
            where: {
                id: employee.id
            }
        });
        res.status(200).json({ msg: "Employee data successfully deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}