/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'react-calendar/dist/Calendar.css';
import carImage from '../../Images/car.png';
import styles from '@/styles/CheckAvailability.module.css';
import Calendar from 'react-calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import api from '../api/api';

interface Profile {
    token: string;
    id: string;
    name: string;
    email: string;
}
interface AvailableDate {
    date: string;
    price: string;
}

interface AvailabilityData {
    available_dates: { date: string, price: string }[];
    booked_dates: { date: string }[];
    not_available_dates: { date: string }[];
}

const CheckAvailability = () => {
    const router = useRouter();
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    // const [guests, setGuests] = useState(1);
    // const [note, setNote] = useState('');
    const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [timeSlots, setTimeSlots] = useState<{ start: string, end: string }[]>([]);
    const [itemId, setItemId] = useState<string>('');
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setProfile(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const availabilityData = sessionStorage.getItem('availability');
        const itemId = sessionStorage.getItem('itemId');

        if (itemId) {
            setItemId(itemId);
        }

        if (availabilityData) {
            setAvailabilityData(JSON.parse(availabilityData));
        }
    }, []);

    useEffect(() => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Start 30 minutes from now
        const startTimeStr = currentTime.toISOString().split('T')[1].split('.')[0];
        setStartTime(startTimeStr);

        const nextDay = new Date(currentTime);
        nextDay.setDate(currentTime.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        setEndTime(formatAMPM(nextDay)); // Set end time to 12:00 AM next day
    }, []);

    const formatAMPM = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${formattedMinutes} ${ampm}`;
    };

    // const handleGuestChange = (change: number) => {
    //     setGuests((prev) => Math.max(1, prev + change));
    // };

    const handleRedirect = () => {
        router.push('/checkout');
    };



    const availableDates = availabilityData?.available_dates?.map((item: any) => item.date);
    const bookedDates = availabilityData?.booked_dates?.map((item: any) => item.date);
    const priceData = availabilityData?.available_dates?.reduce((acc: any, item: any) => {
        acc[item.date] = item.price;
        return acc;
    }, {});


    const tileClassName = ({ date }: any) => {
        const dateString = date.toISOString().split('T')[0];
        if (availableDates?.includes(dateString)) {
            return styles.availablity;
        } else if (bookedDates?.includes(dateString)) {
            return styles.booking;
        }
        return '';
    };

    const tileContent = ({ date }: any) => {
        const dateString = date.toISOString().split('T')[0];
        if (availableDates?.includes(dateString)) {
            return (
                <div className={styles.priceLabel}>
                    {priceData[dateString] ? `${priceData[dateString]} USD` : ''}
                </div>
            );
        }
        return null;
    };

    const handleDateChange = async (dates: any) => {
        if (Array.isArray(dates)) {
            setFromDate(dates[0]);
            setToDate(dates[1]);
            await checkAvailability(dates[0]);
        }
    };

    const checkAvailability = async (selectedDate: Date) => {
        const selectedDateStr = selectedDate.toISOString().split('T')[0];
        const requestData = {
            item_id: itemId,
            check_in: selectedDateStr,
            check_out: selectedDateStr,
            token: profile?.token
        };

        try {
            const response = await api.post('/checkBookingAvailability', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data.data;
            if (data.status === 200 && data.data?.availability?.is_available) {
                const nextStartTimeStr = data.data.availability.next_start_time;
                const nextStartTime = new Date(`1970-01-01T${nextStartTimeStr}`);

                // Generate time slots every 30 minutes starting from nextStartTime
                const timeSlots: { start: string, end: string }[] = [];
                for (let i = 0; i < 24 * 2; i++) { // 24 hours, each with 2 slots (30 min)
                    const slotTime = new Date(nextStartTime);
                    slotTime.setMinutes(nextStartTime.getMinutes() + i * 30);
                    const endTime = new Date(slotTime);
                    endTime.setMinutes(slotTime.getMinutes() + 30);

                    // Push the time slot into the array
                    timeSlots.push({
                        start: formatAMPM(slotTime),
                        end: formatAMPM(endTime)
                    });
                }

                // Check for overlap details and exclude those slots from available time slots
                const overlapDetails = data.data?.bookingOverlapDetails;
                if (overlapDetails && overlapDetails.length > 0) {
                    const bookedSlots = overlapDetails.map((detail: any) => detail.start_time);
                    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot.start));
                    if (availableSlots.length > 0) {
                        setTimeSlots(availableSlots);
                        setStartTime(availableSlots[0].start);
                        setEndTime(availableSlots[0].end);
                    } else {
                        console.log('No available slots after filtering.');
                    }
                } else {
                    setTimeSlots(timeSlots);
                    setStartTime(timeSlots[0].start);
                    setEndTime(timeSlots[0].end);
                }
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                const overlapDetails = error.response?.data?.data?.bookingOverlapDetails;
                if (overlapDetails && overlapDetails.length > 0) {
                    const bookedStartTime = new Date(`1970-01-01T${overlapDetails[0].start_time}`);
                    const nextAvailableSlot = new Date(bookedStartTime);
                    nextAvailableSlot.setMinutes(bookedStartTime.getMinutes() + 30);
                    const nextEndSlot = new Date(nextAvailableSlot);
                    nextEndSlot.setMinutes(nextAvailableSlot.getMinutes() + 30);
                    const nextStartTimeStr = formatAMPM(nextAvailableSlot);
                    const nextEndTimeStr = formatAMPM(nextEndSlot);
                    setStartTime(nextStartTimeStr);
                    setEndTime(nextEndTimeStr);
                    setTimeSlots([{ start: nextStartTimeStr, end: nextEndTimeStr }]);
                }
            } else {
                console.error("Error fetching availability:", error);
            }
        }
    };

    const handleSubmit = async () => {
        const requestData = {
            item_id: itemId,
            check_in: fromDate ? fromDate.toISOString().split('T')[0] : '',
            check_out: toDate ? toDate.toISOString().split('T')[0] : '',
            start_time: startTime,
            end_time: endTime,
            token: profile?.token
        };

        try {
            const response = await api.post('/checkBookingAvailability', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data.data;
            if (data.status === 200) {
                console.log("Booking successful", data);
                handleRedirect();
            } else {
                console.log("Booking failed", data);
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
        }
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
                                onChange={handleDateChange}
                                tileClassName={tileClassName}
                                tileContent={tileContent}
                            />
                            <div className={styles.legend}>
                                <p>
                                    <span className={styles.available}></span> Available
                                </p>
                                <p>
                                    <span className={styles.booked}></span> Booked
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
                                                className="customFormcontrol"
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
                                                className="customFormcontrol"
                                                type="date"
                                                value={toDate ? toDate.toISOString().split('T')[0] : ''}
                                                onChange={(e) => setToDate(new Date(e.target.value))}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <Form.Group controlId="startTime">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        >
                                            {timeSlots.map((slot, index) => (
                                                <option key={index} value={slot.start}>
                                                    {slot.start}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                {/* End Time Input */}
                                <div className="col-md-6 mb-4">
                                    <Form.Group controlId="endTime">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        >
                                            {timeSlots.map((slot, index) => (
                                                <option key={index} value={slot.end}>
                                                    {slot.end}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default CheckAvailability;
