import React from 'react';
import styles from '../../styles/About.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
    return (
        <section className={styles.aboutPage}>
            <Container>
                <Row>
                    <Col md={6} className={styles.aboutImage}>
                        <img
                            src="https://via.placeholder.com/500"
                            alt="About Us"
                            className="img-fluid"
                        />
                    </Col>
                    <Col md={6} className={styles.aboutContent}>
                        <h1 className={styles.aboutHeading}>About Us</h1>
                        <p className={styles.aboutDescription}>
                            Welcome to our website! We are a passionate team dedicated to providing the best
                            solutions for our customers. Our journey began with a simple goal: to make a
                            difference by offering high-quality services and products that meet the needs of
                            our clients.
                        </p>
                        <p className={styles.aboutDescription}>
                            Over the years, we’ve grown into a trusted name in the industry, thanks to our
                            commitment to excellence and our customer-centric approach. We believe in
                            continuous learning, innovation, and teamwork to achieve great results.
                        </p>
                        <p className={styles.aboutDescription}>
                            Thank you for being a part of our story. We look forward to serving you and
                            making your experience with us truly exceptional.
                        </p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4} className={styles.aboutCard}>
                        <h3>Our Mission</h3>
                        <p>
                            To deliver outstanding services and solutions that create value for our
                            customers and positively impact their lives.
                        </p>
                    </Col>
                    <Col md={4} className={styles.aboutCard}>
                        <h3>Our Vision</h3>
                        <p>
                            To be a global leader known for innovation, quality, and commitment to our
                            customers.
                        </p>
                    </Col>
                    <Col md={4} className={styles.aboutCard}>
                        <h3>Our Values</h3>
                        <p>
                            Integrity, customer satisfaction, teamwork, and innovation drive everything
                            we do.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;
