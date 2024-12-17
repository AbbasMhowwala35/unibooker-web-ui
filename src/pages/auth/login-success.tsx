import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import Newsletter from "../components/common/Newsletter";
import styles from '@/styles/Auth.module.css';
import Image from "next/image";
import success from '../../Images/success.svg';
import pattern from '../../Images/pattern.svg';
import { Jost } from "next/font/google";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const LoginSuccess = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className={`${styles.page} ${jostFont.variable}`}>
        <div className={styles.authContainer}>
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className={styles.authBox_image}>
                  <Image src={success} alt="changePassword" />
                </div>
              </Col>
              <Col md={6} className="text-center">
                <div className={styles.authBox}>
                  <div className={styles.contentBox}>
                    <h2 className={styles.authTitle}>Great! Password Changed</h2>
                    <p className={styles.authPara}>Don’t worry We’ll let you know if there is any problem with your account</p>
                  </div>
                  <button type="submit" className={styles.authButton}>
                      Login
                    </button>
                  {/* Sign Up Option */}
                  <div className={styles.authLinks}>
                    <p>Try again<Link href="/auth/signup"> Go Back</Link></p>
                  </div>
                </div>
                <div className={styles.patternBox}>
                    <Image src={pattern} alt="Pattern" />
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

export default LoginSuccess;
