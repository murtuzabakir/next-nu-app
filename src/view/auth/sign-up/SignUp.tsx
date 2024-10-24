"use client";
import React, { useEffect, useState } from "react";
import styles from "./sign-up.module.scss";
// import Button from "@/src/components/button/Button";
import Input from "@/src/components/input/Input";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { IconSize } from "@/src/constants/iconsize.constant";
import { useRouter } from "next/navigation";
// import { ButtonType } from "@/src/components/button/types";
import { validateEmail } from "@/src/utils/validators.utils";
import Button from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/types";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateEmail(email.trim()));
  }, [email]);

  return (
    <div className={styles["signin__main-container"]}>
      <div className={styles["left__component-con"]}>
        <div className={styles["left__main-con"]}>
          <h1 className={styles["sign__up-text"]}>Sign up</h1>
          <Input
            autoWidth
            placeholder="Enter your work email address"
            value={email}
            onChange={(e) => {
              setEmail(e);
            }}
            prefixIcon={<EnvelopeSimple size={IconSize.M} />}
          />
          <Button
            isDisabled={!isValid}
            title="Continue"
            buttonType={ButtonType.tertiary}
            onClick={() => {
              router.push("/onboarding-page-1");
            }}
          />
          <p className={styles["already__have-account-text"]}>
            Already have an account?{" "}
            <button
              onClick={() => {
                router.push("/sign-in");
              }}
              className={styles["login__text"]}
            >
              {" "}
              Login
            </button>
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

export default SignUp;
