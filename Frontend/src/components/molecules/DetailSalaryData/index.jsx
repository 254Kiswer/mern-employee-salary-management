import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getMe } from '../../../config/redux/action';
import Layout from '../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../components';
import { TfiPrinter } from 'react-icons/tfi';

const DetailSalaryData = () => {
    const [data, setData] = useState({
        year: '',
        month: '',
        nid: '',
        employeeName: '',
        jobTitle: '',
        basicSalary: '',
        transportAllowance: '',
        mealAllowance: '',
        deduction: '',
        total: '',
    });
    const { name } = useParams();
    const [index] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const onSubmitPrint = () => {
        navigate(`/report/salarySlip/print-page?month=${data.month}&year=${data.year}&name=${name}`);
    };

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/salaryData/name/${name}`);
                const data = response.data[0];

                setData(data);
            } catch (error) {
                console.log(error);
            }
        };

        getEmployeeData();
    }, [name]);

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
            <Breadcrumb pageName='Detail Employee Salary Data' />
            <Link to='/SalaryData'>
                <ButtonTwo>
                    <span>Back</span>
                </ButtonTwo>
            </Link>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between'>
                </div>

                <div className='max-w-full overflow-x-auto'>
                    <div className='md:w-2/3'>
                        <div className='w-full md:text-lg'>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Name</span>
                                <span className='inline-block w-7'>:</span>
                                {data.employeeName}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>ID No.</span>
                                <span className='inline-block w-6'>:</span>{' '}
                                <span className='pl-[-10] md:pl-0'></span>
                                {data.nid}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Job Tile</span>
                                <span className='inline-block w-7'>:</span>
                                {data.jobTitle}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Month</span>
                                <span className='pl-[-8] md:pl-0'></span>
                                <span className='inline-block w-7'>:</span>
                                {data.month}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>year</span>
                                <span className='inline-block w-7'>:</span>
                                {data.year}
                                <span className='pl-[-8] md:pl-0'></span>
                            </h2>
                        </div>
                    </div>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    No
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Description
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 1}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Basic salary
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Ksh. {data.basicSalary}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 2}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Transport Allowance
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Ksh. {data.transportAllowance}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 3}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Meal Allowance
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Ksh. {data.mealAllowance}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    {index + 4}
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    deduction
                                </td>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Ksh. {data.deduction}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                </td>
                                <td className='font-medium border-b  border-[#eee] dark:border-strokedark py-5 text-right text-black dark:text-white'>
                                    Total Salary :
                                </td>
                                <td className='font-medium border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Ksh. {data.total}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='w-full md:w-1/2 md:justify-end py-6'>
                        <div className='w-full md:w-auto'>
                            <ButtonOne
                                onClick={onSubmitPrint}
                            >
                                <span>Print Employee Slip</span>
                                <span>
                                    <TfiPrinter />
                                </span>
                            </ButtonOne>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DetailSalaryData;