/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import 'react-calendar/dist/Calendar.css';
import styles from '@/styles/CheckAvailability.module.css';
import Calendar from 'react-calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import api from '../api/api';
import { toast, ToastContainer } from 'react-toastify';
interface Profile {
    token: string;
    id: string;
    name: string;
    email: string;
}
interface AvailabilityData {
    available_dates: { date: string, price: string }[];
    booked_dates: { date: string }[];
    not_available_dates: { date: string }[];
}
interface CarDetails {
    id: number;
    name: string;
    image: string;
    address: string;
    price: string;
}

const CheckAvailability = () => {
    const router = useRouter();
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string>('');
    const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);
    const [itemId, setItemId] = useState<string>('');
    const [selectedCar, setSelectedCar] = useState<CarDetails | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isavailable, setIsAvailable] = useState<boolean>(false);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setProfile(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const availabilityData = sessionStorage.getItem('availability');
        const itemId = sessionStorage.getItem('itemId');
        const selectedCarData = sessionStorage.getItem('carDetails');
        if (itemId) {
            setItemId(itemId);
        }

        if (selectedCarData) {
            const parsedCarData = JSON.parse(selectedCarData);
            setSelectedCar(parsedCarData);
        }

        if (availabilityData) {
            setAvailabilityData(JSON.parse(availabilityData));
        }
    }, []);

    const handleRedirect = async () => {
        if (!fromDate || !toDate || !startTime || !endTime) {
            toast.error("Please select check-in, check-out, start time, and end time.");
            return;
        }
        if (!selectedCar) {
            toast.error("Car details are missing.");
            return;
        }
        const checkoutData = {
            ...selectedCar,
            checkInDate: fromDate.toISOString().split('T')[0],
            checkOutDate: toDate.toISOString().split('T')[0],
            startTime: startTime,
            endTime: endTime,
        };
        sessionStorage.setItem('checkoutDetails', JSON.stringify(checkoutData));
        sessionStorage.removeItem('carDetails');
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

    function formatAMPM(date: Date): string {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }


    const checkAvailability = async (selectedDate: Date) => {
        const selectedDateStr = selectedDate.toISOString().split('T')[0];
        const requestData = {
            item_id: itemId,
            check_in: selectedDateStr,
            check_out: selectedDateStr,
            token: profile?.token,
        };

        try {
            const response = await api.post('/checkBookingAvailability', requestData);
            const data = response.data.data;
            const { availability } = data;
            if (response.data.status === 200) {
                if (availability.is_available) {
                    setIsAvailable(true);
                    setStartTime(response.data.data.availability.next_start_time)
                }
            }
        } catch (error: any) {
            setIsAvailable(false);
            if (error.response?.status === 422) {
                const overlapDetails = error.response.data.data.bookingOverlapDetails;
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred: ", error);
            }
        }
    };

    function formatTime(date: Date): string {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    useEffect(() => {
        if (startTime) {
            try {
                const [time, period] = startTime.split(" ");
                let [hours, minutes] = time.split(":").map(Number);
                if (period === "PM" && hours !== 12) hours += 12;
                if (period === "AM" && hours === 12) hours = 0;
                const startDate = new Date(1970, 0, 1, hours, minutes);
                const slots: { start: string; end: string }[] = [];
                const currentTime = new Date();
                const currentHour = currentTime.getHours();
                const currentMinute = currentTime.getMinutes();
                const startSlotTime = currentTime.getTime() + (30 - currentMinute % 30) * 60000;
                const startSlotDate = new Date(startSlotTime);

                for (let i = 0; i < 24; i++) {
                    const startSlot = new Date(startSlotDate.getTime() + i * 30 * 60000);
                    const endSlot = new Date(startSlot.getTime() + 30 * 60000);
                    slots.push({
                        start: formatTime(startSlot),
                        end: formatTime(endSlot),
                    });
                }
                setTimeSlots(slots);
            } catch (error) {
                console.error("Error generating time slots:", error);
            }
        }
    }, [startTime]);

    const handleStartTimeChange = (e: any) => {
        const selectedStartTime = e.target.value;
        setStartTime(selectedStartTime);
        const startTimeObj = new Date(`1970-01-01T${selectedStartTime}:00Z`);
        startTimeObj.setMinutes(startTimeObj.getMinutes() + 30);
        setEndTime(formatAMPM(startTimeObj));
    };

    return (
        <main>
            <Container className={styles.availabilityPage}>
                <Row className="justify-content-center text-center my-5 ">
                    <h2>Check Availability</h2>
                </Row>
                <Row>
                    <Col md={6} className={styles.imageSection}>
                        <Image src={selectedCar?.image || ''} alt="Car" width={500} height={500} className={`${styles.carImage} img-fluid rounded mb-5`} />
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
                                {isavailable && (
                                    <>
                                        <div className="col-md-6 mb-4">
                                            <Form.Group controlId="startTime">
                                                <Form.Label>Start Time</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={startTime ?? ''}
                                                    onChange={handleStartTimeChange}
                                                >
                                                    {timeSlots.length > 0 ? (
                                                        timeSlots.map((slot, index) => (
                                                            <option key={index} value={slot.start}>
                                                                {slot.start}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No available time slots</option>
                                                    )}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>

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
                                    </>
                                )}
                                <Button
                                    className="theme_btn"
                                    variant="primary"
                                    onClick={handleRedirect}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </main>
    );
};

export default CheckAvailability;
