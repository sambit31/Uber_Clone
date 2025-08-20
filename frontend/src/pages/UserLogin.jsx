import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  // 🔹 Local states for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔹 Context (global state: logged in user)
  const { setUser } = useContext(UserContext);

  // 🔹 Router navigation
  const navigate = useNavigate();

  // 🔹 Form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        loginData
      );

      if (response.status === 200) {
        // ✅ destructure response
        const { user, token } = response.data;

        // Update global user context
        setUser(user);

        // Save JWT token in localStorage
        localStorage.setItem('token', token);

        // ✅ Redirect to home
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }

    // Clear input fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-40" src={logo} alt="logo" />

        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeee] mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-[#eeee] font-semibold mb-7 px-4 py-2 w-full text-lg">
            Login
          </button>

          <p className="text-center font-semibold mb-7 px-4 py-2 text-lg">
            New here?{' '}
            <Link className="text-[#00BCD4] font-semibold" to="/signup">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="flex items-center justify-center bg-[#00BCD4] text-[#eeee] font-semibold mb-7 px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
