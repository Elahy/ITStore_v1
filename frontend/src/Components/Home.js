// import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ContactUs from "../ReComponent/ContactUs";
import styles from "./Home.module.css";

function Home() {
  const history = useHistory();
  const handleBrowse = () => history.push("/products");
  return (
    <>
      <div className={styles.headerhero}>
        <div className={styles.headerbg}>
          <img src="../images/Boat.jpg" alt="Background" />
        </div>
        <div className={styles.headercontent}>
          <p className={styles.heading1}>Latest Technology at Best Price!</p>
          <h1>welcome to ITstore!</h1>
          <div className={styles.button}>
            <p onClick={handleBrowse}>shop now</p>
          </div>
          <p className={styles.heading2}>
            Fastest Delivery all over the country!
          </p>
        </div>
      </div>

      <section className={styles.products}>
        <div className={styles.container}>
          <div className={styles.productsheader}>
            <h2>popular products</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className={styles.product}>
            <figure>
              <img src="../images/collection1.jpg" alt="product" />
              <figcaption>MAC Pro</figcaption>
              <figcaption>2,50,000 BDT</figcaption>
            </figure>
          </div>
          <div className={styles.product}>
            <figure>
              <img src="../images/collection2.jpg" alt="product" />
              <figcaption>EVGA RTX 3090</figcaption>
              <figcaption>1,50,000 BDT</figcaption>
            </figure>
          </div>
          <div className={styles.product}>
            <figure>
              <img src="../images/collection3.jpg" alt="product" />
              <figcaption>HP EliteDesk</figcaption>
              <figcaption>57,000 BDT</figcaption>
            </figure>
          </div>

          <div className={styles.product}>
            <figure>
              <img src="../images/collection4.jpg" alt="product" />
              <figcaption>LG Monitor</figcaption>
              <figcaption>48,000 BDT</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.blog}>
        <div className={styles.blogcontainer}>
          <div className={styles.blogheader}>
            <h2>latest from blog</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className={styles.blogcontent}>
            <div className={styles.blog1}>
              <div className={styles.blog1imageholder}>
                <img src="../images/p1.jpg" alt="blog" />
              </div>
              <div className={styles.blog1content}>
                <h4>HP Probook</h4>
                <h3>Best Laptop in Mid Range Budget!</h3>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <p className={styles.button}>view post</p>
              </div>
            </div>
            <div className={styles.blog2}>
              <div className={styles.blog2imageholder}>
                <img src="../images/p4.jpg" alt="blog" />
              </div>
              <div className={styles.blog2content}>
                <h4>Ryzen 5600</h4>
                <h3>Processor Of the Year 2021</h3>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <p className={styles.button}>view post</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactUs />
    </>
  );
}

export default Home;
