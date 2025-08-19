import logo from "../assets/logo.png";
import { Link } from "react-router-dom";


const Start = () => {
  return (
    <div>
        <div className="bg-cover bg-bottom-left bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen  flex justify-between flex-col w-full bg-red-400">
            <img className="w-40 " src={logo} alt="logo" />
            <div className="bg-white py-4 px-4 pb-7">
                <h2 className="text-2xl font-bold ">Get Started with Cabio</h2>
                <Link to="/login" className="flex justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
            </div>
        </div>
    </div>
  );
};

export default Start;