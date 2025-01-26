import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../Images/logo.svg';
import userIcon from '../../../Images/user.svg';
import wishlist from '../../../Images/heart.svg';
import cart from '../../../Images/cart.svg';
import styles from "@/styles/Layout.module.css";
import { Container, Navbar, Nav, Form, Dropdown } from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react';
import { BsPinMapFill, BsSearch } from 'react-icons/bs';
import Breadcrumbs from './Breadcrumbs';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '@/context/AuthContext';
interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  aboutYourself: string;
  profileImage: string;
}

const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const isHomePage = router.pathname === "/";
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toDate, setToDate] = useState<Date | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setProfile(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogoClicked = async () => {
    sessionStorage.clear()
  };

  const isLoggedIn = profile !== null;

  return (
    <>
      {/* {!isHomePage && (
        <div className={styles['top-bar']}>
          <Container>
            <Row className='align-items-center justify-content-center'>
              <Col md={6} lg={4} xl={4} className={styles['top-bar-left']}>
                <p>Collect Your Coupon <Link href="/">Get Now</Link></p>
              </Col>
              <Col md={6} lg={4} xl={4} className={styles['top-bar-center']}>
                <p><Image src={locationWhite} alt='Location' /> Sonadanga Khulna, Bangladesh</p>
              </Col>
              <Col md={6} lg={4} xl={4} className={styles['top-bar-right']}></Col>
            </Row>
          </Container>
        </div>
      )} */}
      <header
        className={`${styles['theme-header']} ${isHomePage ? styles['header-absolute'] : styles['header-static']}`}>
        <div className={`container d-flex justify-content-between align-items-center ${styles.headerContainer}`}>
          <div className="logo-section">
            <div className="logo-img">
              <Link href="/" onClick={handleLogoClicked}>
                <Image src={logo} className={styles['logo']} alt="UniBooker" />
              </Link>
            </div>
          </div>
          {/* Navigation Menu Section */}
          {isHomePage ? (
            <Navbar expand="lg" className={styles['menu-section']}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`ml-auto gap-4 ${styles.nav}`}>
                  <Nav.Link className={`${styles['nav-link']}`} href="/">Home</Nav.Link>
                  <Nav.Link className={`${styles['nav-link']}`} href="/about">About</Nav.Link>
                  <Nav.Link className={`${styles['nav-link']}`} href="/car-list">Car List</Nav.Link>
                  <Nav.Link className={`${styles['nav-link']}`} href="/place">Place</Nav.Link>
                  <Nav.Link className={`${styles['nav-link']}`} href="/contact">Contact Us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          ) : (
            <div className={styles['search-bar']}>
              <input
                type="text"
                placeholder="Searching for..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles['search-input']}
              />
              <div className={styles['search-icon']}>
                <BsSearch />
              </div>
            </div>
          )}
          {/* Profile Section with Dropdown */}
          {!isHomePage ? (
            <div className={`d-flex gap-3 ${styles.ProfileSection}`}>
              {isLoggedIn ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="profile-dropdown">
                    <Image src={userIcon} className={styles['user-icon']} alt="User Profile" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                    <Dropdown.Item href="/orders">My Orders</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className={styles['profile-section']}>
                  <Link href={isLoggedIn ? "/profile" : "/auth/login"}><Image src={userIcon} className={styles['user-icon']} alt="User Profile" /></Link>
                </div>
              )}
              <div className={styles['profile-section']}>
                <Link href="/wishlist"><Image src={wishlist} className={styles['user-icon']} alt="Wishlist" /></Link>
              </div>
              <div className={styles['profile-section']}>
                <Link href="#"><Image src={cart} className={styles['user-icon']} alt="Cart" /></Link>
              </div>
            </div>
          ) : isLoggedIn ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="profile-dropdown">
                <Image src={userIcon} className={styles['user-icon']} alt="User Profile" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item href="/orders">My Orders</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className={styles['profile-section']}>
              <Link href={isLoggedIn ? "/profile" : "/auth/login"}><Image src={userIcon} className={styles['user-icon']} alt="User Profile" /></Link>
            </div>
          )}
        </div>
        {!isHomePage && (
          <div className={`${styles['search-bar']} ${styles['mobile-search-bar']}`}>
            <input
              type="text"
              placeholder="Searching for..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles['search-input']}
            />
            <div className={styles['search-icon']}>
              <BsSearch />
            </div>
          </div>
        )}
        {!isHomePage && (
          <Container>
            <div className={`${styles['date-location-picker']} d-flex align-items-center`}>
              <div className={styles['date-picker']}>
                <BsPinMapFill />
                <Form.Control
                  className={styles.customFormcontrolHeader}
                  type="date"
                  value={toDate ? toDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setToDate(new Date(e.target.value))}
                />
              </div>
              <div className={styles['date-picker']}>
                <BsPinMapFill />
                <Form.Control
                  className={styles.customFormcontrolHeader}
                  type="date"
                  value={toDate ? toDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setToDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </Container>
        )}
      </header>
      {!isHomePage && (<Breadcrumbs />)}
    </>
  );
};

export default Header;
