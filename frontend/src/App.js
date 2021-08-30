import "./App.css";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";
import Policy from "./Components/Policy";
import NotFound from "./Components/NotFound";
import ProductDetails from "./Components/ProductDetails";
import Success from "./Components/Success";
import UpdateProduct from "./Components/UpdateProduct";
import Home from "./Components/Home";
import DeleteProduct from "./Components/DeleteProduct";
import LoginPage from "./Pages/LoginPage";

function App() {
  const history = useHistory();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(false);
  }, []);
  const logoClickHandler = () => {
    history.push("/");
  };
  const cartClickHandler = () => {
    history.push("/cart");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <header>
            <img
              className="logo"
              src="../images/logo.png"
              onClick={logoClickHandler}
              alt="logo"
            />
            <nav>
              <ul className="nav_links">
                <li>
                  <Link to="/sale" className="navbtn">
                    Sale!
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="navbtn">
                    New Collection
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="navbtn">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="navbtn">
                    Add
                  </Link>
                </li>
              </ul>
            </nav>
            <img
              className="cartSign"
              src="../images/cart.png"
              onClick={cartClickHandler}
              alt="cart"
            />
            <Link to="/signin" className="homebtn">
              Sign In
            </Link>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/products">
                <ProductList />
              </Route>
              <Route exact path="/products/:id">
                <ProductDetails />
              </Route>
              <Route exact path="/signin">
                <LoginPage />
              </Route>
              <Route path="/add">
                <AddProduct />
              </Route>
              <Route path="/update/:id">
                <UpdateProduct />
              </Route>
              <Route path="/delete/:id">
                <DeleteProduct />
              </Route>
              <Route path="/PrivacyPolicy">
                <Policy />
              </Route>
              <Route path="/success">
                <Success />
              </Route>
              <Route path="/*">
                <NotFound />
              </Route>
            </Switch>
          </main>
          <footer>
            <div className="bottom-details">
              <span className="copyright_text">
                Copyright © 2021 E-commerce.
              </span>
              <span className="policy_terms">
                <Link to="/PrivacyPolicy" className="privacy">
                  Privacy policy
                </Link>
              </span>
            </div>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
