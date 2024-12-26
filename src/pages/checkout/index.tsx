import Head from "next/head";
import { Jost } from "next/font/google";
import styles from "../../styles/Checkout.module.css";
import Newsletter from "../components/common/Newsletter";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import car from '../../Images/car.png'
import wishlist from '../../Images/wishlist.svg'
import location from '../../Images/location.svg'
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
// Define Jost font
const jostFont = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
});

export default function Home() {
    const router = useRouter();
    
    const handleRedirect = () => {
        router.push('/customer-reciept');  
    };

    return (
        <div className={`${styles.page} ${jostFont.variable}`}>
            <Head>
                <title>Unibooker | Review Summary</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.checkoutMainSection}`}>
                <Container>
                    <Row className="text-center mb-5">
                        <h1>Review Summary</h1>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className={styles.checkoutImgSection}>
                                <div className={styles.checkoutImgSectionBlock}>
                                    <Image src={car} className="img-fluid mb-4" alt="Car" />
                                    <Image src={wishlist} className={styles.checkoutImgSectionBlockWishlist} alt="wishlist" />
                                </div>
                                <div className={styles.checkoutContentSectionBlock}>
                                    <div className={styles.checkoutContentHeadingBlock}>
                                        <h4>Asteria hotel</h4>
                                        <p><Image src={location} alt="Location" />Wilora NT 0872, Australia</p>
                                    </div>
                                    <div className={styles.checkoutContentDetailBlock}>
                                        <h6>$165,3 <span>/Night</span></h6>
                                        <p>5.0<BsStarFill /></p>
                                        <small>12km</small>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className={styles.checkoutContentSection}>
                                <div className={styles.checkoutRightSectionContent}>
                                    <h3>Your Trip</h3>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Check In <span>2024-04-15</span></h6>
                                        <p>Check Out <span>2024-04-15</span></p>
                                    </div>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Number of Guests</h6>
                                        <p>3</p>
                                    </div>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Booking For Someone </h6>
                                        <p>N/A</p>
                                    </div>
                                </div>
                                <div className={styles.checkoutRightSectionContent}>
                                    <h3>Price Details</h3>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Price (1night)</h6>
                                        <p className={styles.greenText}>USD 500.00</p>
                                    </div>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Service Charge</h6>
                                        <p>USD 10.00</p>
                                    </div>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Cleaning Charge</h6>
                                        <p>USD 10.00</p>
                                    </div>
                                    <div className={styles.checkoutContentSectionRow}>
                                        <h6>Tax</h6>
                                        <p>USD 10.00</p>
                                    </div>
                                    <div className={`${styles.checkoutContentSectionRow} ${styles.TotalPrice}`}>
                                        <h6>Total Price</h6>
                                        <p>USD 545.00</p>
                                    </div>
                                </div>
                                <div className={styles.checkoutRightSectionPolicy}>
                                    <div className={styles.checkoutRightSectionPolicyBox}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_1966_5371)">
                                                <g clip-path="url(#clip1_1966_5371)">
                                                    <path d="M8 6.13281H21" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8 12.1328H21" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8 18.1328H21" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 6.13281H3.01" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 12.1328H3.01" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 18.1328H3.01" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1966_5371">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                                <clipPath id="clip1_1966_5371">
                                                    <rect width="24" height="24" fill="white" transform="translate(0 0.132812)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p>House Rules</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_1966_5380)">
                                                <path d="M9.99981 18.9999C9.76615 19.0004 9.53972 18.919 9.35981 18.7699C9.25855 18.686 9.17485 18.5829 9.11349 18.4665C9.05214 18.3502 9.01435 18.2229 9.00227 18.0919C8.99019 17.9609 9.00408 17.8289 9.04312 17.7033C9.08217 17.5777 9.1456 17.461 9.22981 17.3599L13.7098 11.9999L9.38981 6.62994C9.30674 6.52765 9.24471 6.40996 9.20728 6.28362C9.16985 6.15728 9.15775 6.02479 9.17169 5.89376C9.18563 5.76273 9.22533 5.63575 9.2885 5.52011C9.35168 5.40447 9.43708 5.30246 9.53981 5.21994C9.64327 5.1289 9.76444 5.06024 9.8957 5.01825C10.027 4.97626 10.1655 4.96185 10.3026 4.97594C10.4397 4.99002 10.5724 5.03229 10.6924 5.1001C10.8123 5.1679 10.917 5.25977 10.9998 5.36994L15.8298 11.3699C15.9769 11.5489 16.0573 11.7733 16.0573 12.0049C16.0573 12.2366 15.9769 12.461 15.8298 12.6399L10.8298 18.6399C10.7295 18.761 10.6021 18.8566 10.4578 18.9192C10.3136 18.9817 10.1567 19.0094 9.99981 18.9999Z" fill="#BDBDBD" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1966_5380">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.checkoutRightSectionPolicy}>
                                    <div className={styles.checkoutRightSectionPolicyBox}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                            <path d="M4 9.13281H20" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4 15.1328H20" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 3.13281L8 21.1328" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16 3.13281L14 21.1328" stroke="#17BEBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <p>Cancellation Policy</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <g clip-path="url(#clip0_1966_5380)">
                                                <path d="M9.99981 18.9999C9.76615 19.0004 9.53972 18.919 9.35981 18.7699C9.25855 18.686 9.17485 18.5829 9.11349 18.4665C9.05214 18.3502 9.01435 18.2229 9.00227 18.0919C8.99019 17.9609 9.00408 17.8289 9.04312 17.7033C9.08217 17.5777 9.1456 17.461 9.22981 17.3599L13.7098 11.9999L9.38981 6.62994C9.30674 6.52765 9.24471 6.40996 9.20728 6.28362C9.16985 6.15728 9.15775 6.02479 9.17169 5.89376C9.18563 5.76273 9.22533 5.63575 9.2885 5.52011C9.35168 5.40447 9.43708 5.30246 9.53981 5.21994C9.64327 5.1289 9.76444 5.06024 9.8957 5.01825C10.027 4.97626 10.1655 4.96185 10.3026 4.97594C10.4397 4.99002 10.5724 5.03229 10.6924 5.1001C10.8123 5.1679 10.917 5.25977 10.9998 5.36994L15.8298 11.3699C15.9769 11.5489 16.0573 11.7733 16.0573 12.0049C16.0573 12.2366 15.9769 12.461 15.8298 12.6399L10.8298 18.6399C10.7295 18.761 10.6021 18.8566 10.4578 18.9192C10.3136 18.9817 10.1567 19.0094 9.99981 18.9999Z" fill="#BDBDBD" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1966_5380">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.checkoutRightSectionPolicyContent}>
                                    <p>By selecting the button below, I agree to the <Link href="/">Hosts&apos;s Rules</Link>,  <Link href="/">Ground rules for quest</Link>,  <Link href="/">UniBooker&apos;s Rebooking </Link>and  <Link href="/">Refund Policy </Link>and that UniBooker can  <Link href="/">charge my Payment </Link>method if I&apos;m responsible for damage. I agree to pay the total amount shown if the Host accepts my booking request.</p>
                                    <Button type="button" onClick={handleRedirect} className={styles.payNowButton}>Pay Now</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Newsletter />
        </div>
    );
}