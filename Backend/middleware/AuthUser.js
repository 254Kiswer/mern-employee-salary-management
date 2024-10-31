import EmployeeData from '../models/EmployeeDataModel.js'

export const verifyUser = async(req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please log in to your account!"});
    }
    try {
        const employee = await EmployeeData.findOne({
            where: {
                employee_id: req.session.userId
            }
        });
        if(!employee) return res.status(404).json({msg: "User not found"});
        req.userId = employee.id;
        req.accessRights = employee.accessRights;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "An error occurred on the server." });
    }
}

export const adminOnly = async (req, res, next) => {
    try {
        const employee = await EmployeeData.findOne({
            where:{
                employee_id: req.session.userId
            }
        });
        if(!employee) return res.status(404).json({msg: "Employee data not found"});
        if(employee.accessRights !== "admin") return res.status(403).json({msg: "Access forbidden"});
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "An error occurred on the server" });
    }
}