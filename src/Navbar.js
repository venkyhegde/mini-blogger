import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar sticky-top bg-light bg-gradient bg-opacity-50 d-flex flex-row border-bottom border-primary border-opacity-10">
            <div className="d-flex vw-100">
                <div className="flex-grow-1 ps-4">
                    <strong className="navbar-brand-font text-dark">Mini Blogger</strong>
                </div>
                <div className="ps-4 pe-4">
                    <Link className="btn btn-sm btn-outline-secondary border-0 bold-font" to="/">Home</Link>
                </div>
                <div className="ps-4 pe-4">
                    <Link className="btn btn-sm btn-outline-secondary border-0 bold-font" to="/new">New Post</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;