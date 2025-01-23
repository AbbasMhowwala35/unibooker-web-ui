import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import EditProfile from '../components/common/EditProfile'
import Booking from '../components/common/Booking'
import Reviews from '../components/common/Reviews'
import Settings from '../components/common/Settings'
import { Jost } from 'next/font/google'
import styles from "../../styles/Profile.module.css";
import Head from 'next/head'
import { FaClipboardList, FaCog, FaStar, FaUserEdit } from 'react-icons/fa'
import Wallet from '../components/common/Wallet'
import { BsWallet2 } from 'react-icons/bs'
import Tickets from '../components/common/Tickets'
import CreateTicket from '../components/common/CreateTicket'
import Loader from '../components/common/Loader'

// Define Jost font
const jostFont = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
});
const Index = () => {
    const [activeKey, setActiveKey] = useState<string>("editProfile");
    const [userProfile, setUserProfile] = useState(null);
    const [vendorReviews, setVendorReviews] = useState(null);
    const [userItems, setUserItems] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const profileData = sessionStorage.getItem("userProfile");
        const reviewsData = sessionStorage.getItem("vendorReviews");
        const itemsData = sessionStorage.getItem("userItems");

        if (profileData) setUserProfile(JSON.parse(profileData));
        if (reviewsData) setVendorReviews(JSON.parse(reviewsData));
        if (itemsData) setUserItems(JSON.parse(itemsData));
    }, []);
    
    if (loading) {
        return <Loader />;
    }

    console.log(userItems,vendorReviews,userProfile)

    return (
        <div className={`${styles.page} ${jostFont.variable}`}>
            <Head>
                <title>Unibooker | Profile</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.ProfileMainSection}`}>
                <Container>
                    <h2 className="text-center mb-4">Settings</h2>
                    <Row className='mt-5'>
                        <Col md={3}>
                            <div className={styles.ProfileTabs}>
                                <p className={styles.ProfileTabsUsername}>Hello, Alex</p>
                                <h3>Account Settings</h3>
                                <Tabs
                                    activeKey={activeKey}
                                    onSelect={(k) => setActiveKey(k || "")}
                                    id="profile-tabs"
                                    className={styles.ProfileTabsMain}
                                >
                                    <Tab 
                                    eventKey="editProfile" 
                                    title={
                                        <>
                                        <FaUserEdit className="me-2" /> Edit Profile
                                        </>
                                    } 
                                    />
                                    <Tab 
                                    eventKey="booking" 
                                    title={
                                        <>
                                        <FaClipboardList className="me-2" /> Booking
                                        </>
                                    } 
                                    />
                                    <Tab 
                                    eventKey="reviews" 
                                    title={
                                        <>
                                        <FaStar className="me-2" /> Reviews
                                        </>
                                    } 
                                    />
                                    <Tab 
                                    eventKey="settings" 
                                    title={
                                        <>
                                        <FaCog className="me-2" /> Settings
                                        </>
                                    } 
                                    />
                                    <Tab 
                                    eventKey="wallet" 
                                    title={
                                        <>
                                        <BsWallet2 className="me-2" /> Wallet
                                        </>
                                    } 
                                    />
                                    <Tab 
                                    eventKey="ticket" 
                                    title={
                                        <>
                                        <BsWallet2 className="me-2" /> Ticket
                                        </>
                                    } 
                                    />
                                    <Tab 
                                    eventKey="createTicket" 
                                    title={
                                        <>
                                        <BsWallet2 className="me-2" /> Create Ticket
                                        </>
                                    } 
                                    />
                                </Tabs>
                            </div>
                        </Col>
                        <Col md={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="editProfile" active={activeKey === 'editProfile'}>
                                    <EditProfile />
                                </Tab.Pane>
                                <Tab.Pane eventKey="booking" active={activeKey === 'booking'}>
                                    <Booking />
                                </Tab.Pane>
                                <Tab.Pane eventKey="reviews" active={activeKey === 'reviews'}>
                                    <Reviews />
                                </Tab.Pane>
                                <Tab.Pane eventKey="settings" active={activeKey === 'settings'}>
                                    <Settings />
                                </Tab.Pane>
                                <Tab.Pane eventKey="wallet" active={activeKey === 'wallet'}>
                                    <Wallet />
                                </Tab.Pane>
                                <Tab.Pane eventKey="ticket" active={activeKey === 'ticket'}>
                                    <Tickets />
                                </Tab.Pane>
                                <Tab.Pane eventKey="createTicket" active={activeKey === 'createTicket'}>
                                    <CreateTicket />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Index;
