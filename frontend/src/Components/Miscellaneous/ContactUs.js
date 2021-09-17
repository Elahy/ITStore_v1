import React from "react";
import styles from "./ContactUs.module.css";

function ContactUs() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h4>cantact us</h4>
        <p>41/A Free School Street, Dhanmondi, Dhaka</p>
        <p>+ (880) 193 452 8562</p>
        <p>itstore@gmail.com</p>
        <p className={styles.email}>
          email us
          <span>
            <img
              src="https://res.cloudinary.com/de8cuyd0n/image/upload/v1520412541/E-commerce%20landing%20page/icons/get_in_touch_1x.png"
              alt="email"
            />
          </span>
        </p>
      </div>
    </section>
  );
}

export default ContactUs;
