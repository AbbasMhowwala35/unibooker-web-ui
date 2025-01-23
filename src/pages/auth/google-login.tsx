import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import styles from "@/styles/Auth.module.css";

const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" }); 
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className={`${styles.page}`}>
      <div>
        <div className={styles.socialSignIn}>
          <p>Or Sign in with</p>
          <Button
            onClick={handleLogin}
            className={styles.socialButton}
            variant="outline-dark"
          >
            <FaGoogle className={styles.socialIcon} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
