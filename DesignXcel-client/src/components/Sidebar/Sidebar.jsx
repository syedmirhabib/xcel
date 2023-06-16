import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import { FaHistory, FaHome, FaMoneyCheckAlt, FaUserAlt } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { FcAddDatabase } from 'react-icons/fc';
import { GrSelect } from 'react-icons/gr';
import { AiOutlineBars } from 'react-icons/ai';
import { AuthContext } from '../../providers/AuthProvider';
import Logo from '../Logo/Logo';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { BsFillJournalBookmarkFill, BsPeopleFill } from 'react-icons/bs';

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);

  const toggleHandler = event => {
    setToggle(event.target.checked);
  };

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold bg-slate-800'>
            <Logo />
          </div>
        </div>
        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-200 bg-opacity-50 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full' : 'md:translate-x-0'
        } transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className='w-full hidden md:flex py-2 justify-center items-center bg-rose-100 mx-auto'>
              <Logo />
            </div>
            <div className='flex flex-col items-center mt-6 -mx-2'>
              <Link to='/dashboard'>
                <img
                  className='object-cover w-24 h-24 mx-2 rounded-full'
                  src={user?.photoURL}
                  alt='avatar'
                  referrerPolicy='no-referrer'
                />
              </Link>
              <Link to='/dashboard'>
                <h4 className='mx-2 mt-2 font-medium text-gray-800 hover:underline'>
                  {user?.displayName}
                </h4>
              </Link>
              <Link to='/dashboard'>
                <p className='mx-2 mt-1 text-sm font-medium text-gray-600 hover:underline'>
                  {user?.email}
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          {isAdmin && (
            <div className='flex flex-col justify-between flex-1 mt-6'>
              <nav>
                <>
                  {/* Menu Links */}
                  <NavLink
                    to='/dashboard/manageclass'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdLibraryBooks className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Manage Classes</span>
                  </NavLink>
                  <NavLink
                    to='/dashboard/allusers'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaUserAlt className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Manage Users</span>
                  </NavLink>
                </>
              </nav>
            </div>
          )}

          {isInstructor && (
            <div className='flex flex-col justify-between flex-1 mt-6'>
              <nav>
                <>
                  {/* Menu Links */}
                  <NavLink
                    to='/dashboard/addclass'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FcAddDatabase className='w-7 h-7' />
                    <span className='mx-4 font-medium'>Add a Class</span>
                  </NavLink>
                  <NavLink
                    to='/dashboard/myclass'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <BsFillJournalBookmarkFill className='w-5 h-5' />
                    <span className='mx-4 font-medium'>My Classes</span>
                  </NavLink>
                </>
              </nav>
            </div>
          )}

          {!isAdmin && !isInstructor && (
            <div className='flex flex-col justify-between flex-1 mt-6'>
              <nav>
                <>
                  {/* Menu Links */}
                  <NavLink
                    to='/dashboard/mycart'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdLibraryBooks className='w-5 h-5' />
                    <span className='mx-4 font-medium'>My selected classes</span>
                  </NavLink>
                  <NavLink
                    to='/dashboard/enrolledclass'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <GrSelect className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Enrolled Classes</span>
                  </NavLink>
                  <NavLink
                    to='/dashboard/paymenthistory'
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaHistory className='w-5 h-5' />
                    <span className='mx-4 font-medium'>Payment History</span>
                  </NavLink>
                </>
              </nav>
            </div>
          )}

          {/* Logout Button */}
          <div className='flex items-center px-4 -mx-2'>
            <button
              onClick={handleLogOut}
              className='flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform bg-red-500 hover:bg-red-600 hover:text-white rounded-md focus:outline-none'
            >
              <GrLogout className='w-5 h-5' />
              <span className='mx-4 font-medium'>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
