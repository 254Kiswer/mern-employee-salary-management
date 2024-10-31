import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo, ButtonThree } from '../../../../../components';
import { getMe } from '../../../../../config/redux/action';

const FormEditAttendanceData = () => {
    const [ID, setID] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [presnt, setPresent] = useState('');
    const [sick, setSick] = useState('');
    const [absent, setAbsent] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/attendanceData/${id}`);
                setEmployeeName(response.data.employeeName);
                setID(response.data.ID);
                setJobTitle(response.data.jobTitle);
                setPresent(response.data.present);
                setSick(response.data.sick);
                setAbsent(response.data.absent);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    }, [id]);

    const updateAttendanceData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('employeeName', employeeName);
            formData.append('ID', ID);
            formData.append('jobTitle', jobTitle);
            formData.append('present', presnt);
            formData.append('sick', sick);
            formData.append('absent', absent);

            const response = await axios.patch(`http://localhost:5000/attendanceData/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/attendanceData');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.msg
            });
        }
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.accessRights !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Form Edit employee attendance data' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Form Edit Data Attendance Data
                            </h3>
                        </div>
                        <form onSubmit={updateAttendanceData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Employee Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='employeeName'
                                            name='employeeName'
                                            value={employeeName}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                            disabled
                                            placeholder='Enter Name'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            ID <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='ID'
                                            name='ID'
                                            value={ID}
                                            onChange={(e) => setID(e.target.value)}
                                            required
                                            disabled
                                            placeholder='Enter ID Number'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Job Title <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='jobTitle'
                                            name='jobTitle'
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            required={true}
                                            disabled
                                            placeholder='Enter Job Title'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Present <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='present'
                                            name='present'
                                            value={present}
                                            onChange={(e) => setPresent(e.target.value)}
                                            required
                                            placeholder='Enter Present Days'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Sick <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='sick'
                                            name='sick'
                                            value={sick}
                                            onChange={(e) => setSick(e.target.value)}
                                            required
                                            placeholder='Enter Sick Days'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Absent <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='absent'
                                            name='absent'
                                            value={absent}
                                            onChange={(e) => setAbsent(e.target.value)}
                                            required
                                            placeholder='Enter Absent Days'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Update</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/attendanceData" >
                                        <ButtonTwo  >
                                            <span>Cancel</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormEditAttendanceData;
