import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as needed

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = {
    fullname: {
      firstname: Firstname,
      lastname: Lastname,
    },
    email: email,
    password: password,
  };

    setUserData(newUser);

    // Reset fields
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  };

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className="w-40 " src={logo} alt="logo" />
          <form onSubmit={submitHandler}>
            <h3 className='text-xl font-medium mb-2'>What's your name</h3>
            <div className='flex gap-2 mb-5'>
              <input
                required
                className='bg-[#eeee] w-1/2 px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Firstname'
                value={Firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                required
                className='bg-[#eeee] w-1/2 px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Lastname'
                value={Lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <h3 className='text-xl font-medium mb-2'>What your email</h3>
            <input
              required
              className='bg-[#eeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
            <input
              className='bg-[#eeee] mb-5 px-4 py-2 border w-full text-lg placeholder:text-base'
              required
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='bg-[#111] text-[#eeee] font-semibold mb-5 px-4 py-2 w-full text-lg'>Sign Up</button>
            <p className='text-center font-semibold mb-7 px-4 py-2 text-lg'>
               Already registered?{' '}
              <Link
                className='text-[#00BCD4] font-semibold mb-7 px-4 py-2 w-full text-lg'
                to="/captain-login"
              >
              captain-Login
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            to="/login"
            className='flex items-center justify-center bg-[#00BCD4] text-[#eeee] font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base'
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
