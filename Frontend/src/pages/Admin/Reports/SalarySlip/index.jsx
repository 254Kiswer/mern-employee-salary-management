import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../../../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, ButtonOne } from '../../../../components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TfiPrinter } from 'react-icons/tfi'
import Swal from 'sweetalert2';
import { BiSearch } from 'react-icons/bi';
import { fetchSalarySlipByMonth, fetchSalarySlipByName, fetchSalarySlipByYear, getEmployeeData, getMe } from '../../../../config/redux/action';

const SalarySlip = () => {
    const [searchMonth, setSearchMonth] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchName, setSearchName] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);
    const { employeeData } = useSelector((state) => state.employeeData);

    const handleSearchMonth = (event) => {
        setSearchMonth(event.target.value);
    };

    const handleSearchYear = (event) => {
        setSearchYear(event.target.value);
    };

    const handleSearchName = (event) => {
        setSearchName(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const selectedMonth = searchMonth;
        const selectedYear = searchYear;
        const selectedName = searchName;

        let yearDataFound = false;
        let monthDataFound = false;
        let nameDataFound = false;

        await Promise.all([
            dispatch(fetchSalarySlipByYear(selectedYear, () => (yearDataFound = true))),
            dispatch(fetchSalarySlipByMonth(selectedMonth, () => (monthDataFound = true))),
            dispatch(fetchSalarySlipByName(selectedName, () => (nameDataFound = true))),
        ]);
        setShowMessage(true);

        if (yearDataFound && monthDataFound && nameDataFound) {
            setShowMessage(false);
            navigate(
                `/report/salary-slip/print-page?month=${selectedMonth}&year=${selectedYear}&name=${selectedName}`
            );
        } else {
            setShowMessage(false);
            Swal.fire({
                icon: 'error',
                title: 'Data Not Found',
                text: 'Sorry, the data you are looking for was not found',
                timer: 2000,
            });
        }
    };

    const nameOptions = employeeData.map((employee) => (
        <option key={employee.id} value={employee.employeeName}>
            {employee.employeeName}
        </option>
    ));

    useEffect(() => {
        dispatch(getEmployeeData());
    }, [dispatch]);

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
            <Breadcrumb pageName='Employee Salary Slip' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Filter Employee Salary Slip
                            </h3>
                        </div>
                        <form onSubmit={handleSearch}>
                            {showMessage && (
                                <p className="text-meta-1">Data Not Found</p>
                            )}
                            <div className='p-6.5'>
                                <div className='mb-4.5 '>
                                    <div className='w-full mb-4'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Month <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                value={searchMonth}
                                                onChange={handleSearchMonth}
                                                required
                                            >
                                                <option value=''>Select Month</option>
                                                <option value='January'>January</option>
                                                <option value='Februari'>Februari</option>
                                                <option value='March'>March</option>
                                                <option value='April'>April</option>
                                                <option value='May'>May</option>
                                                <option value='June'>June</option>
                                                <option value='Juli'>Juli</option>
                                                <option value='August'>August</option>
                                                <option value='September'>September</option>
                                                <option value='October'>October</option>
                                                <option value='November'>November</option>
                                                <option value='December'>December</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            yaer <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <input
                                                type="number"
                                                placeholder="Enter Year..."
                                                value={searchYear}
                                                onChange={handleSearchYear}
                                                required
                                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <BiSearch />
                                            </span>
                                        </div>
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Employee Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                value={searchName}
                                                onChange={handleSearchName}
                                                required
                                            >
                                                <option value=''>Select Employee Name</option>
                                                {nameOptions}
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <ButtonOne type='submit'>
                                        <span>Print Salary Slip</span>
                                        <span>
                                            <TfiPrinter />
                                        </span>
                                    </ButtonOne>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SalarySlip;