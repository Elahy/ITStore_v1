import { Link, useHistory } from "react-router-dom";
import CartLogo from "./CartLogo";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const Header = () => {
  const { role } = useSelector((store) => store.userInfoStore);
  const history = useHistory();

  const profileHandler = () => {
    history.push("/profile");
  };
  const logoClickHandler = () => {
    history.push("/");
  };

  return (
    <header>
      <h1 onClick={logoClickHandler} className="logo">
        ITStore
      </h1>
      <SearchBar />
      <nav>
        <ul className="nav_links">
          <li>
            <Link to="/products" className="navbtn">
              Sale!
            </Link>
          </li>
          {/* <li>
            <Link to="/products" className="navbtn">
              New Collection
            </Link>
          </li> */}
          <li>
            <Link to="/contact" className="navbtn">
              Contact
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link to="/dashboard" className="navbtn">
                DashBoard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="cartLogo">
        <CartLogo />
        {role ? (
          <button className="homebtn" onClick={profileHandler}>
            Profile
          </button>
        ) : (
          <Link to="/signin" className="homebtn">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
