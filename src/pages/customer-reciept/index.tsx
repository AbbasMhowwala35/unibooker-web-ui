import React from 'react'
import { Container, Row } from 'react-bootstrap'
import styles from '@/styles/Reciept.module.css';

const CustomerReciept = () => {
    return (
        <main>
            <Container className={styles.availabilityPage}>
                <Row className="justify-content-center text-center my-5 ">
                    <h2>Customer Receipt</h2>
                </Row>
                <Row className={styles.ReceiptPage}>
                    <div>
                        <h3>Customer Receipt #91</h3>
                        <div className={styles.ReceiptCard}>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                                <div><p>2024-06-12</p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Reservation Code <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                 <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Boat Details</h3>
                        <div className={styles.ReceiptCard}>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                                <div><p>2024-06-12</p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Reservation Code <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                 <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>User Details</h3>
                        <div className={styles.ReceiptCard}>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                                <div><p>2024-06-12</p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Reservation Code <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                 <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Trip Details</h3>
                        <div className={styles.ReceiptCard}>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                                <div><p>2024-06-12</p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                <div><p>Reservation Code <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                            <div className={styles.RecieptCardRow}>
                                 <div><p>Booked by <br /><span>Yash Chaudhary</span></p></div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </main>
    )
}

export default CustomerReciept
