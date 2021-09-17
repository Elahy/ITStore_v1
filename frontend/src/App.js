import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Components/Miscellaneous/Loader";
import ProductList from "./Components/ProductList";
import Policy from "./Components/Miscellaneous/Policy";
import NotFound from "./Components/Miscellaneous/NotFound";
import ProductDetails from "./Components/ProductDetails";
import Success from "./Components/Miscellaneous/Success";
import Home from "./Components/Home/index";
import LoginPage from "./Pages/LoginPage";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Cart from "./Components/Cart/Cart";
import ContactUs from "./Components/Miscellaneous/ContactUs";
import SignupPage from "./Pages/SignupPage";
import UserProfile from "./Pages/User/UserProfile";
import CheckOutPage from "./Pages/CheckOutPage";
import Header from "./Components/Home/Header";

function App() {
  const { role } = useSelector((store) => store.userInfoStore);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/products">
                <ProductList />
              </Route>
              <Route path="/products/:id">
                <ProductDetails />
              </Route>
              <Route exact path="/signin">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignupPage />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route exact path="/profile">
                <UserProfile />
              </Route>
              <Route path="/contact">
                <ContactUs />
              </Route>
              <Route path="/PrivacyPolicy">
                <Policy />
              </Route>
              <Route path="/success">
                <Success />
              </Route>
              {role === "admin" && (
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
              )}
              {role === "admin" && (
                <Route path="/checkout">
                  <CheckOutPage />
                </Route>
              )}
              <Route
                path="/facebook"
                component={() => {
                  window.location.href = "https://www.facebook.com/";
                  return null;
                }}
              />
              <Route path="/*">
                <NotFound />
              </Route>
            </Switch>
          </main>
          <footer>
            <div className="bottom-details">
              <span className="copyright_text">Copyright © 2021 ITStore.</span>
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
