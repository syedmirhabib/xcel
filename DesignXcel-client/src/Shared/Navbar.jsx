import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Avatar from "../components/Avatar/Avatar";
import { AuthContext } from "../providers/AuthProvider";
import useCart from "../hooks/useCart";

const Navbar = () => {
const { user, logOut } = useContext(AuthContext);
const [cart] = useCart();

const handleLogOut = () => {
logOut()
.then(() => {})
.catch((error) => console.log(error));
};

const navOptions = (
<>
<li>
<NavLink
to="/"
className={({ isActive }) => (isActive ? "active" : "default")}
>
Home
</NavLink>
</li>
<li>
<NavLink
to="/instructors"
className={({ isActive }) => (isActive ? "active" : "default")}
>
Instructors
</NavLink>
</li>
<li>
<NavLink
to="/classes"
className={({ isActive }) => (isActive ? "active" : "default")}
>
Classes
</NavLink>
</li>
{user && (
<li>
<NavLink
to="dashboard"
className={({ isActive }) => (isActive ? "active" : "default")}
>
Dashboard{" "}
<span className="badge badge-secondary">{cart?.length || 0}</span>
</NavLink>
</li>
)}
</>
);

return (
<nav className="navbar fixed z-10 bg-opacity-30 max-w-screen-xxl bg-black text-orange-700">
<div className="navbar-start">
<div className="dropdown">
<label tabIndex={0} className="btn btn-ghost lg:hidden">
<svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
         >
<path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M4 6h16M4 12h8m-8 6h16"
           />
</svg>
</label>
<ul
         tabIndex={0}
         className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
       >
{navOptions}
</ul>
</div>
<div className="btn btn-ghost normal-case text-xl">
<Link to="/" className="font-extrabold text-lg text-blue-600">
<div className="-mt-3">
Design
<span className="text-orange-600">Xcel</span>
</div>
</Link>
</div>
</div>
<div className="navbar-center hidden lg:flex">
<ul className="menu menu-horizontal px-1">{navOptions}</ul>
</div>
<div className="navbar-end">
{user ? (
<>
<button onClick={handleLogOut} className="btn btn-ghost">
LogOut
</button>
<Avatar />
</>
) : (
<>
<li>
<Link to="/login">Login</Link>
</li>
</>
)}
</div>
</nav>
);
};

export default Navbar;