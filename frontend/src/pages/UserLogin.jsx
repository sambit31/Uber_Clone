
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email: email, password: password })
    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className="w-40 " src={logo} alt="logo" />
      <form onSubmit={submitHandler} >
         <h3 className='text-xl font-medium mb-2'>What your email</h3>
         <input value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-[#eeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
         <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
         <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder='password' />

        <button className='bg-[#111] text-[#eeee] font-semibold mb-7 px-4 py-2 w-full text-lg'>Login</button>
       <p className='text-center  font-semibold mb-7 px-4 py-2  text-lg'>New here? <Link className='text-[#00BCD4] font-semibold mb-7 px-4 py-2 w-full text-lg' to="/signup">Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to="/captain-login" className='flex items-center justify-center bg-[#00BCD4] text-[#eeee] font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin