import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // ✅ correct usage

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: { firstname, lastname },
      email,
      password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const user = response.data.user;
        setUserData(user);
        setUser(user); // ✅ now works
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-40 " src={logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium mb-2">What's your name</h3>
          <div className="flex gap-2 mb-5">
            <input
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              required
              className="bg-[#eeee] w-1/2 px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeee] mb-5 px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-[#111] text-[#eeee] font-semibold mb-5 px-4 py-2 w-full text-lg">
            Create account
          </button>

          <p className="text-center font-semibold mb-7 px-4 py-2 text-lg">
            Already have an account?{' '}
            <Link
              className="text-[#00BCD4] font-semibold mb-7 px-4 py-2 w-full text-lg"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-signup"
          className="flex items-center justify-center bg-[#00BCD4] text-[#eeee] font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Register as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
