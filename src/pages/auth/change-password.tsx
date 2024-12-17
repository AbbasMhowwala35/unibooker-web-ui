import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import Newsletter from "../components/common/Newsletter";
import styles from '@/styles/Auth.module.css';
import Image from "next/image";
import changePassword from '../../Images/changePassword.svg';
import { Jost } from "next/font/google";
import { useState } from "react";

const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <div className={`${styles.page} ${jostFont.variable}`}>
        <div className={styles.authContainer}>
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className={styles.authBox_image}>
                  <Image src={changePassword} alt="changePassword" />
                </div>
              </Col>
              <Col md={6}>
                <div className={styles.authBox}>
                  <div className={styles.contentBox}>
                    <h2 className={styles.authTitle}>Change Password?</h2>
                    <p className={styles.authPara}>Verification code was sent to your email address.</p>
                  </div>
                  <form>
                    {/* Email Input with Icon */}
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <input
                          type="number"
                          placeholder="456780"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    <button type="submit" className={styles.authButton}>
                      Continue
                    </button>
                  </form>
                  {/* Sign Up Option */}
                  <div className={styles.authLinks}>
                    <p>Try again<Link href="/auth/signup"> Go Back</Link></p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Newsletter />
      </div>
    </>
  );
};

export default ChangePassword;
