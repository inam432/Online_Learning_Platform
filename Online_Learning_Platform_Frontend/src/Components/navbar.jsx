import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
            <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                    <Link className="nav-link" to="/courses">
                        View Courses Available
                    </Link>{props.role==="instructor"?
                    <Link className="nav-link" to="/create_Course">
                        Create a course
                    </Link>:null}
                    <Link className="nav-link" to="/">
                        Log out
                    </Link>
                </div>
</div>
            </div>
        </nav>
    );
}
export default Navbar;