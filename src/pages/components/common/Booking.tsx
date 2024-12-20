import React, { useState } from "react";
import car from '../../../Images/car.png'
import location from '../../../Images/location.svg'
import styles from "../../../styles/Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import { BsCalendar2Event, BsFillPersonFill, BsStarFill } from "react-icons/bs";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Booking = () => {
  const bookings = {
    upcoming: [
      {
        id: 1,
        name: "Asteria hotel",
        location: "Wilora NT 0872, Australia",
        distance: "12 km",
        price: "$165.3",
        rating: "5.0",
        dates: "13 April 2024 - 17 April 2024",
        status: "Paid",
        owner: {
          name: "Sabbir Sourov",
          email: "asteriahotel@gmail.com",
          phone: "+9 681 08629",
        },
        imageUrl: car,
      },
    ],
    previous: [
      {
        id: 2,
        name: "Sunrise Villa",
        location: "Malibu, California",
        distance: "18 km",
        price: "$200.5",
        rating: "4.8",
        dates: "10 March 2024 - 14 March 2024",
        status: "Completed",
        owner: {
          name: "John Doe",
          email: "sunrisevilla@gmail.com",
          phone: "+1 123 456 789",
        },
        imageUrl: car,
      },
    ],
    cancelled: [
      {
        id: 3,
        name: "Ocean Breeze Resort",
        location: "Miami Beach, Florida",
        distance: "25 km",
        price: "$300.0",
        rating: "4.5",
        dates: "20 February 2024 - 25 February 2024",
        status: "Cancelled",
        owner: {
          name: "Anna Smith",
          email: "oceanbreeze@gmail.com",
          phone: "+1 987 654 321",
        },
        imageUrl: car,
      },
    ],
  };
  const [activeTab, setActiveTab] = useState<keyof typeof bookings>("upcoming");

  return (
    <div className={styles.ProfileChildCard}>
      <h3>My Bookings</h3>
      <div className={styles.ProfileChildCardForm}>
        <div className={styles.Tabs}>
          <div className={styles.TabsList}>
            <button
              className={`${styles.TabButton} ${activeTab === "upcoming" ? styles.ActiveTab : ""
                }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${styles.TabButton} ${activeTab === "previous" ? styles.ActiveTab : ""
                }`}
              onClick={() => setActiveTab("previous")}
            >
              Previous
            </button>
            <button
              className={`${styles.TabButton} ${activeTab === "cancelled" ? styles.ActiveTab : ""
                }`}
              onClick={() => setActiveTab("cancelled")}
            >
              Cancelled
            </button>
          </div>
          <Link href="/" className={styles.SeeAllLink}>See All</Link>
        </div>
        <div className={styles.BookingGrid}>
          {bookings[activeTab].map((booking) => (
            <div key={booking.id} className={styles.BookingCard}>
               <Image src={booking.imageUrl} alt={booking.name} className={styles.BookingImage} width={300} height={200} />
              <div className={styles.BookingDetails}>
                <div className={styles.BookingDetailsRow}>
                  <div>
                    <h4>{booking.name}</h4>
                    <p className={styles.BookingLocation}><Image src={location} alt="Location" />{booking.location}<sub className={styles.BookingDistance}>{booking.distance}</sub></p>
                  </div>
                  <div>
                    <p className={styles.BookingPrice}>{booking.price} <span>/night</span></p>
                    <p className={styles.BookingRating}>{booking.rating} <BsStarFill /></p>
                  </div>
                </div>
                <div>
                </div>
                <div className={styles.BookingDetailsSection}>
                  <div>
                    <p className={styles.BookingDates}><BsCalendar2Event className={styles.Icon} />{booking.dates}<sub className={styles.BookingStatus}>{booking.status}</sub></p>
                    <p className={styles.BookingOwner}> <BsFillPersonFill className={styles.Icon} />
                      Owner: {booking.owner.name}
                    </p>
                    <p>
                      <FaEnvelope className={styles.Icon} /> {booking.owner.email}
                    </p>
                    <p>
                      <FaPhoneAlt className={styles.Icon} /> {booking.owner.phone}
                    </p>
                  </div>
                  <div></div>
                </div>
                <div className={styles.BookingActions}>
                  <button className={styles.CancelButton}>Cancel</button>
                  <button className={styles.EReceiptButton}>E-Receipt</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
