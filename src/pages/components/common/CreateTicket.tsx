import React, { useState } from 'react';
import styles from "../../../styles/Profile.module.css";
import Link from 'next/link';
import { BsFillSendFill } from 'react-icons/bs';

const CreateTicket = () => {
    const [isTicketCreated, setIsTicketCreated] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsTicketCreated(true);
    };

    return (
        <div className={styles.ProfileChildCard}>
            {!isTicketCreated ? (
                <>
                    <h3>Create Ticket</h3>
                    <div className={styles.ProfileChildCardForm}>
                        <div className={styles.ProfileCreateTicket}>
                        <h4>
                            <input type="checkbox" className='checkInput' id="terms" />
                            Accept the <Link href="/">Terms and Conditions</Link>
                            </h4>

                            <hr />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <form className={styles.ProfileCreateTicketForm} onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <input type="text" id="firstName" className="form-control" placeholder="Ticket Title" required />
                            </div>
                            <div className="row mb-4">
                                <textarea id="aboutYourself" className="form-control" placeholder="Tell us about yourself" required></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className={styles.ProfileCreateTicketFormButton}>Send Ticket</button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div className={styles.TicketDisplayCard}>
                    <h4>Ticket Title</h4>
                    <hr />
                    <p className={styles.TicketDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className={styles.ChatSection}>
                        <div className={styles.ChatBubbleLeft}>Hey there?</div>
                        <span className={`${styles.ChatTimestamp} text-start`}>11:59 am</span>
                        <div className={styles.ChatBubbleLeft}>Ok come with carefully!<br />Remember the address please!</div>
                        <span className={`${styles.ChatTimestamp} text-start`}>11:59 am</span>
                        <div className={styles.ChatBubbleRight}>On my way sir.<br />Will reach in 10 mins</div>
                        <span className={`${styles.ChatTimestamp} text-end`}>11:59 am</span>
                        <div className={styles.ChatBubbleRight}>Btw, I want to know more about the room space and facilities & can I get some more picture of current.</div>
                        <span className={`${styles.ChatTimestamp} text-end`}>11:59 am</span>
                    </div>
                    <div className={styles.MessageInputSection}>
                        <input type="text" className={styles.MessageInput} placeholder="Write a message..." />
                        <button className={styles.SendMessageButton}><BsFillSendFill /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTicket;
