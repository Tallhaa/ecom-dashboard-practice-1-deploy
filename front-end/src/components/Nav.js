import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-sky-100 py-8 px-8 mb-4 flex flex-col md:flex-row lg:flex-row">
      <img
        src="https://media.istockphoto.com/id/1331491686/vector/element-design.jpg?s=612x612&w=0&k=20&c=QIMRS2IPiQyyTZJR_G1JAjH_ErBBkrDPtQe2GBNgm2w="
        alt="logo"
        className="w-20 pl-6 md:float-left md:flex inline-flex lg:float-left"
      />
      {auth ? (
        <nav>
          <ul className="bg-sky-100 flex flex-col md:flex-row lg:flex-row">
            <li className="list-none">
              <Link className="pl-6 text-xl" to="/">
                Home
              </Link>
            </li>
            <li className="list-none">
              <Link className="pl-6 text-xl" to="/add">
                Add Product
              </Link>
            </li>
            <li className="list-none">
              <Link className="pl-6 text-xl" to="/update">
                Update
              </Link>
            </li>
            <li className="list-none">
              <Link className="pl-6 text-xl" to="/login" onClick={handleLogout}>
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="ml-auto">
          <ul className="bg-sky-100 flex flex-col md:flex-row lg:flex-row">
            <li>
              <Link className="pl-6 text-xl" to="/signup">
                Signup
              </Link>
            </li>
            <li className="list-none">
              <Link className="pl-6 text-xl" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default Nav;
