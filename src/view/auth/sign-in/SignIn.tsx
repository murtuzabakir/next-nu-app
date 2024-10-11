"use client";
import React from "react";
import styles from "./sign-in.module.scss";
import Button from "@/src/components/button/Button";
import SearchBox from "@/src/components/searchbox/SearchBox";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";

const SignIn = () => {
  return (
    <div className={styles["signin__main-container"]}>
      <div className={styles["left__component-con"]}>
        <div className={styles["left__main-con"]}>
          <h1 className={styles["sign__up-text"]}>Sign up</h1>
          <SearchBox
            autoWidth
            placeholder="Enter your work email address"
            value=""
            onChange={() => {}}
            prefixIcon={<EnvelopeSimple size={IconSize.M} />}
          />
          <Button title="Continue" onClick={() => {}} />
          <p className={styles["already__have-account-text"]}>
            Already have an account?{" "}
            <button className={styles["login__text"]}> Login</button>
          </p>
        </div>
        <p className={styles["info__text"]}>
          By inserting your email you confirm you agree to Nymbleup contacting
          you about our product and services. You can opt out at any time by
          clicking unsubscribe in our emails. Find out more about how we use
          data in our{" "}
          <button onClick={() => {}} className={styles["privacy__text"]}>
            privacy policy
          </button>
        </p>
      </div>
      <div className={styles["right__component-con"]}>
        <h1 className={styles["header__text"]}>Welcome to Nymble Up.</h1>
        <div className={styles["description__text"]}>
          <p>
            At the nexus of AI and business, we redefine predictive workforce
            management. Seamlessly linking sales and staffing, our platform
            ensures optimal efficiency in planning, scheduling, and task
            management.
          </p>
          <p>
            You’ll be able to customise and create your CRM exactly as you want
            it.
          </p>
          <p>Let’s begin.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
