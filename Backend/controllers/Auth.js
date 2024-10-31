import EmployeeData from "../models/EmployeeDataModel.js";
import argon2 from "argon2";
import { verifyUser } from "../middleware/AuthUser.js";

export const Login = async (req, res) => {
  let user = {};
  const employee = await EmployeeData.findOne({
    where: {
      username: req.body.username
    }
  });

  if (!employee) {
    return res.status(404).json({ msg: "Employee Data Not Found" });
  }

  const match = await argon2.verify(employee.password, req.body.password);

  if (!match) {
    return res.status(400).json({ msg: "Incorrect Password" });
  }

  req.session.userId = employee.employee_id;

  user = {
    employee_id: employee.id,
    employeeName: employee.employeeName,
    username: employee.username,
    accessRights: employee.accessRights
  }

  res.status(200).json({
    employee_id: user.employee_id,
    employeeName: user.employeeName,
    username: user.username,
    accessRights: user.accessRights,
    msg: "Login Successful"
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please Log In to Your Account!" });
  }
  const employee = await EmployeeData.findOne({
    attributes: ['id', 'nid', 'employeeName', 'username', 'accessRights'],
    where: {
      employee_id: req.session.userId
    }
  });
  if (!employee) return res.status(404).json({ msg: "User Not Found" });
  res.status(200).json(employee);
}

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Unable to log out" });
    res.status(200).json({ msg: "You Have Logged Out" });
  });
}

export const changePassword = async (req, res) => {
  await verifyUser(req, res, () => { });

  const userId = req.userId;

  const user = await EmployeeData.findOne({
    where: {
      id: userId
    }
  });

  const { password, confPassword } = req.body;

  if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password Do Not Match" });

  try {
    const hashPassword = await argon2.hash(password);

    await EmployeeData.update(
      {
        password: hashPassword
      },
      {
        where: {
          id: user.id
        }
      }
    )
    res.status(200).json({ msg: "Password Successfully Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};