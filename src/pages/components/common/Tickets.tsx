import React, { useState } from 'react';
import styles from "../../../styles/Profile.module.css";

const Tickets = () => {
    const [activeTab, setActiveTab] = useState("Open");
    const openTickets = [
        {
            id: 1,
            title: "Ticket 1",
            description: "Issue with login functionality",
            deliveredTime: "12:30 PM",
            deliveredDate: "2024-12-21",
        },
        {
            id: 2,
            title: "Ticket 2",
            description: "Bug in payment gateway",
            deliveredTime: "02:00 PM",
            deliveredDate: "2024-12-20",
        },
    ];

    const closedTickets = [
        {
            id: 3,
            title: "Ticket 3",
            description: "Feature request: Dark mode",
            deliveredTime: "11:00 AM",
            deliveredDate: "2024-12-15",
        },
        {
            id: 4,
            title: "Ticket 4",
            description: "UI issue in dashboard",
            deliveredTime: "01:30 PM",
            deliveredDate: "2024-12-10",
        },
    ];

    const tickets = activeTab === "Open" ? openTickets : closedTickets;
    return (
        <div className={styles.ProfileChildCard}>
            <h3>Tickets</h3>
            <div className={styles.ProfileChildCardForm}>
                <div className={styles.Tabs}>
                    <div className={styles.TabsList}>
                        <button
                            className={`${styles.TabButton} ${activeTab === "Open" ? styles.ActiveTab : ""}`}
                            onClick={() => setActiveTab("Open")}
                        >
                            Open
                        </button>
                        <button
                            className={`${styles.TabButton} ${activeTab === "Closed" ? styles.ActiveTab : ""}`}
                            onClick={() => setActiveTab("Closed")}
                        >
                            Closed
                        </button>
                    </div>
                </div>
                <div className={styles.ReviewsGrid}>
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className={styles.ReviewCard}>
                            <div className={styles.ReviewCardHeader}>
                                <div className={styles.ReviewCardHeaderAvtar}>
                                    <div className={`${styles.ReviewCardInfo} ${styles.TicketInfo}`}>
                                        <h4>Ticket: {ticket.id}</h4>
                                        <h6>{ticket.title}</h6>
                                        <p>{ticket.description}</p>
                                    </div>
                                </div>
                                <div className={styles.ReviewsInfo}>
                                    <p className={styles.ReviewDate}><span className={styles.deliveredText}>Delivered on </span>{ticket.deliveredDate} <br /> {ticket.deliveredTime}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tickets;
