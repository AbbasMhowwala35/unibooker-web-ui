import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Newsletter from "../components/common/Newsletter";
import styles from '@/styles/Auth.module.css';
import Image from "next/image";
import forgot_password from '../../Images/forgot_password.png';
import { Jost } from "next/font/google";

const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const ForgotPassword = () => {
  // const [passwordVisible, setPasswordVisible] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  return (
    <>
      <div className={`${styles.page} ${jostFont.variable}`}>
        <div className={styles.authContainer}>
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <div className={styles.authBox_image}>
                  <Image src={forgot_password} alt="Login" />
                </div>
              </Col>
              <Col md={6}>
                <div className={styles.authBox}>
                  <div className={styles.contentBox}>
                    <h2 className={styles.authTitle}>Change Password?</h2>
                    <p className={styles.authPara}>To reset your password, please enter the email address associated with your account. We will then send you a secure link to create a new password.</p>
                  </div>
                  <form>
                    {/* Email Input with Icon */}
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

export default ForgotPassword;
