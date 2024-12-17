import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import Newsletter from "../components/common/Newsletter";
import styles from '@/styles/Auth.module.css';
import Image from "next/image";
import signup from '../../Images/signup.png';
import { Jost } from "next/font/google";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";

const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agree, setAgree] = useState(false); 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleCheckboxChange = () => {
    setAgree(!agree);
  };

  return (
    <>
      <div className={`${styles.page} ${jostFont.variable}`}>
        <div className={styles.authContainer}>
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className={styles.authBox_image}>
                  <Image src={signup} alt="signup" />
                </div>
              </Col>
              <Col md={6}>
                <div className={styles.authBox}>
                  <div className={styles.contentBox}>
                    <h2 className={styles.authTitle}>Get Started</h2>
                    <p className={styles.authPara}>Create an account to continue.</p>
                  </div>
                  <form>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.984 15.3467C8.11633 15.3467 4.81348 15.9314 4.81348 18.2733C4.81348 20.6153 8.09538 21.221 11.984 21.221C15.8516 21.221 19.1535 20.6353 19.1535 18.2943C19.1535 15.9533 15.8725 15.3467 11.984 15.3467Z" stroke="#E94165" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9839 12.0059C14.522 12.0059 16.5792 9.94779 16.5792 7.40969C16.5792 4.8716 14.522 2.81445 11.9839 2.81445C9.44582 2.81445 7.38772 4.8716 7.38772 7.40969C7.37915 9.93922 9.42296 11.9973 11.9515 12.0059H11.9839Z" stroke="#E94165" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                          type="text"
                          placeholder="First Name"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.984 15.3467C8.11633 15.3467 4.81348 15.9314 4.81348 18.2733C4.81348 20.6153 8.09538 21.221 11.984 21.221C15.8516 21.221 19.1535 20.6353 19.1535 18.2943C19.1535 15.9533 15.8725 15.3467 11.984 15.3467Z" stroke="#E94165" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9839 12.0059C14.522 12.0059 16.5792 9.94779 16.5792 7.40969C16.5792 4.8716 14.522 2.81445 11.9839 2.81445C9.44582 2.81445 7.38772 4.8716 7.38772 7.40969C7.37915 9.93922 9.42296 11.9973 11.9515 12.0059H11.9839Z" stroke="#E94165" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Last Name"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_1930_6463)">
                            <path d="M22.0004 16.9201V19.9201C22.0016 20.1986 21.9445 20.4743 21.8329 20.7294C21.7214 20.9846 21.5577 21.2137 21.3525 21.402C21.1473 21.5902 20.905 21.7336 20.6412 21.8228C20.3773 21.912 20.0978 21.9452 19.8204 21.9201C16.7433 21.5857 13.7874 20.5342 11.1904 18.8501C8.77425 17.3148 6.72576 15.2663 5.19042 12.8501C3.5004 10.2413 2.44866 7.27109 2.12042 4.1801C2.09543 3.90356 2.1283 3.62486 2.21692 3.36172C2.30555 3.09859 2.44799 2.85679 2.63519 2.65172C2.82238 2.44665 3.05023 2.28281 3.30421 2.17062C3.5582 2.05843 3.83276 2.00036 4.11042 2.0001H7.11042C7.59573 1.99532 8.06621 2.16718 8.43418 2.48363C8.80215 2.80008 9.0425 3.23954 9.11042 3.7201C9.23704 4.68016 9.47187 5.62282 9.81042 6.5301C9.94497 6.88802 9.97408 7.27701 9.89433 7.65098C9.81457 8.02494 9.62928 8.36821 9.36042 8.6401L8.09042 9.9101C9.51398 12.4136 11.5869 14.4865 14.0904 15.9101L15.3604 14.6401C15.6323 14.3712 15.9756 14.1859 16.3495 14.1062C16.7235 14.0264 17.1125 14.0556 17.4704 14.1901C18.3777 14.5286 19.3204 14.7635 20.2804 14.8901C20.7662 14.9586 21.2098 15.2033 21.527 15.5776C21.8441 15.9519 22.0126 16.4297 22.0004 16.9201Z" stroke="#E94165" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1930_6463">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <input
                          type="number"
                          placeholder="Phone"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z" fill="#E94165"/>
                        </svg>
                        <input
                          type="date"
                          placeholder="Dob"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#E94165" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#E94165" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input
                          type="text"
                          placeholder="Address"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.4 0H3.6C2.64522 0 1.72955 0.335825 1.05442 0.933597C0.379285 1.53137 0 2.34212 0 3.1875V13.8125C0 14.6579 0.379285 15.4686 1.05442 16.0664C1.72955 16.6642 2.64522 17 3.6 17H20.4C21.3548 17 22.2705 16.6642 22.9456 16.0664C23.6207 15.4686 24 14.6579 24 13.8125V3.1875C24 2.34212 23.6207 1.53137 22.9456 0.933597C22.2705 0.335825 21.3548 0 20.4 0ZM3.6 2.125H20.4C20.7183 2.125 21.0235 2.23694 21.2485 2.4362C21.4736 2.63546 21.6 2.90571 21.6 3.1875L12 8.3725L2.4 3.1875C2.4 2.90571 2.52643 2.63546 2.75147 2.4362C2.97652 2.23694 3.28174 2.125 3.6 2.125ZM21.6 13.8125C21.6 14.0943 21.4736 14.3645 21.2485 14.5638C21.0235 14.7631 20.7183 14.875 20.4 14.875H3.6C3.28174 14.875 2.97652 14.7631 2.75147 14.5638C2.52643 14.3645 2.4 14.0943 2.4 13.8125V5.61L11.376 10.4656C11.5584 10.5589 11.7654 10.608 11.976 10.608C12.1866 10.608 12.3936 10.5589 12.576 10.4656L21.6 5.61V13.8125Z" fill="#E94165" />
                        </svg>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          className={styles.authInput}
                        />
                      </div>
                    </div>
                    {/* Password Input with Eye Icon */}
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#E94165" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7 11.0002V7.00015C6.99876 5.7602 7.45828 4.56402 8.28938 3.64382C9.12047 2.72362 10.2638 2.14506 11.4975 2.02044C12.7312 1.89583 13.9671 2.23406 14.9655 2.96947C15.9638 3.70488 16.6533 4.785 16.9 6.00015" stroke="#E94165" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          placeholder="Password"
                          required
                          className={styles.authInput}
                        />
                        <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWithIcon}>
                        <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#E94165" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7 11.0002V7.00015C6.99876 5.7602 7.45828 4.56402 8.28938 3.64382C9.12047 2.72362 10.2638 2.14506 11.4975 2.02044C12.7312 1.89583 13.9671 2.23406 14.9655 2.96947C15.9638 3.70488 16.6533 4.785 16.9 6.00015" stroke="#E94165" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          placeholder="Confirm Password"
                          required
                          className={styles.authInput}
                        />
                        <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                    {/* Terms and Conditions Checkbox */}
                    <div className={styles.authLinks}>
                      <label className={styles.checkboxLabel}>
                        <input 
                          type="checkbox" 
                          checked={agree} 
                          onChange={handleCheckboxChange} 
                          required
                          className={styles.checkboxInput}
                        />
                        <span>
                          By creating an account, you agree to our 
                          <Link href="/terms-and-conditions"> Terms and Conditions</Link>
                        </span>
                      </label>
                    </div>
                    <button type="submit" className={styles.authButton}>
                      Login
                    </button>
                  </form>
                  {/* Sign In with Google/Apple */}
                  <div className={styles.socialSignIn}>
                    <p>Or Sign in with</p>
                    <Button className={styles.socialButton} variant="outline-dark">
                      <FaGoogle className={styles.socialIcon} />
                    </Button>
                    <Button className={styles.socialButton} variant="outline-dark">
                      <FaApple className={styles.socialIcon} />
                    </Button>
                  </div>
                  {/* Sign Up Option */}
                  <div className={styles.authLinks}>
                    <p>Already have an account??<Link href="/auth/login"> Sign In</Link></p>
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

export default Signup;
