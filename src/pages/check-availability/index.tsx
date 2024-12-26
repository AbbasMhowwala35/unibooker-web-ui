import { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'react-calendar/dist/Calendar.css';
import carImage from '../../Images/car.png';
import styles from '@/styles/CheckAvailability.module.css';
import Calendar from 'react-calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdAdd, MdRemove } from 'react-icons/md';
import { useRouter } from 'next/router';

const CheckAvailability = () => {
    const router = useRouter();
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState(1);
    const [note, setNote] = useState('');

    const handleGuestChange = (change: number) => {
        setGuests((prev) => Math.max(1, prev + change));
    };

    const handleContinue = () => {
        console.log({ fromDate, toDate, guests, note });
    };
    const handleRedirect = () => {
        router.push('/checkout');  
    };

    return (
        <main>
            <Container className={styles.availabilityPage}>
                <Row className="justify-content-center text-center my-5 ">
                    <h2>Check Availability</h2>
                </Row>
                <Row>
                    <Col md={6} className={styles.imageSection}>
                        <Image src={carImage} alt="Car" className={`${styles.carImage} img-fluid mb-5`} />
                    </Col>
                    <Col md={6} className={styles.calendarSection}>
                        <div className={styles.calendarContainer}>
                            <Calendar
                                selectRange={true}
                                onChange={(dates) => {
                                    if (Array.isArray(dates)) {
                                        setFromDate(dates[0]);
                                        setToDate(dates[1]);
                                    }
                                }}
                            />
                            <div className={styles.legend}>
                                <p>
                                    <span className={styles.available}></span> Available
                                </p>
                                <p>
                                    <span className={styles.unavailable}></span> Unavailable
                                </p>
                            </div>
                        </div>
                        <Form>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <Form.Group controlId="fromDate">
                                        <Form.Label>Check In</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaCalendarAlt />
                                            </InputGroup.Text>
                                            <Form.Control 
                                                className='customFormcontrol'
                                                type="date"
                                                value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
                                                onChange={(e) => setFromDate(new Date(e.target.value))}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <Form.Group controlId="toDate">
                                        <Form.Label>Check Out</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaCalendarAlt />
                                            </InputGroup.Text>
                                            <Form.Control 
                                                className='customFormcontrol'
                                                type="date"
                                                value={toDate ? toDate.toISOString().split('T')[0] : ''}
                                                onChange={(e) => setToDate(new Date(e.target.value))}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <Form.Group controlId="guests" className="d-flex justify-content-between customFormcontrol">
                                        <Form.Label className={styles.formLabel}>Number of Guests</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="d-flex">
                                                <Button className={styles.counterBtn} onClick={() => handleGuestChange(-1)}>
                                                    <MdRemove />
                                                </Button>
                                                <Form.Control
                                                    type="number"
                                                    value={guests}
                                                    onChange={(e) => setGuests(Number(e.target.value))}
                                                    placeholder="Number of Guests"
                                                   className={styles.guestInput}
                                                    min="1"
                                                />
                                                <Button className={styles.counterBtn} onClick={() => handleGuestChange(1)}>
                                                    <MdAdd />
                                                </Button>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                    <p className="text-muted mt-2">Only 5 guests are allowed.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <Form.Group controlId="note">
                                        <Form.Label>Note to Owner</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={6}
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </Form.Group>
                                </div></div>
                            <Button variant="primary" className="theme_btn" onClick={handleRedirect}>
                                Continue
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default CheckAvailability;
