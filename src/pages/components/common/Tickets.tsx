import React, { useState, useEffect } from 'react';
import styles from "../../../styles/Profile.module.css";
import api from '@/pages/api/api';
interface Ticket {
    id: number;
    user_id: string;
    thread_id: string;
    thread_status: string;
    title: string;
    description: string;
    module: number;
    created_at: string;
    updated_at: string;
}

const Tickets = () => {
    const [activeTab, setActiveTab] = useState("Open");
    const [openTickets, setOpenTickets] = useState<Ticket[]>([]);
    const [closedTickets, setClosedTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTickets = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get('/getUserThreads');
            if (response.status === 200 && response.data) {
                const threads: Ticket[] = response.data.data.threads || [];
                const open = threads.filter((thread) => thread.thread_status === "1");
                const closed = threads.filter((thread) => thread.thread_status !== "1");

                setOpenTickets(open);
                setClosedTickets(closed);
            } else {
                setError("Failed to fetch tickets.");
            }
        } catch (err) {
            setError("An error occurred while fetching tickets.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

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
                {loading ? (
                    <p>Loading tickets...</p>
                ) : error ? (
                    <p className={styles.Error}>{error}</p>
                ) : tickets.length > 0 ? (
                    <div className={styles.ReviewsGrid}>
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className={styles.ReviewCard}>
                                <div className={styles.ReviewCardHeader}>
                                    <div className={styles.ReviewCardHeaderAvtar}>
                                        <div className={`${styles.ReviewCardInfo} ${styles.TicketInfo}`}>
                                            <h4>Ticket: {ticket.thread_id}</h4>
                                            <h6>{ticket.title}</h6>
                                            <p>{ticket.description}</p>
                                        </div>
                                    </div>
                                    <div className={styles.ReviewsInfo}>
                                        <p className={styles.ReviewDate}>
                                            <span className={styles.deliveredText}>Created on </span>
                                            {new Date(ticket.created_at).toLocaleDateString()} <br />
                                            {new Date(ticket.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tickets available for {activeTab.toLowerCase()} tab.</p>
                )}
            </div>
        </div>
    );
};

export default Tickets;