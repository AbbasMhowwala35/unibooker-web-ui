// Header Component
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../Images/logo.svg';
import userIcon from '../../../Images/user.svg';
import wishlist from '../../../Images/heart.svg';
import cart from '../../../Images/cart.svg';
import topbg from '../../../Images/bg-prop.svg';
import styles from "@/styles/Layout.module.css";
import locationWhite from '../../../Images/location-white.svg'
import { Col, Container, Row } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Breadcrumbs from './Breadcrumbs';
const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {!isHomePage && (<div className={styles['top-bar']}>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <Col md={4} className={styles['top-bar-left']}>
              <p>Collect Your Coupon <Link href="/">Get Now</Link></p>
            </Col>
            <Col md={4} className={styles['top-bar-center']}>
              <p><Image src={locationWhite} alt='Location' /> Sonadanga Khulna, Bangladesh</p>
            </Col>
            <Col md={4} className={styles['top-bar-right']}></Col>
          </Row>
        </Container>
      </div>)}
      {!isHomePage && (<div className={styles['top-bar-img']}>
        <Image src={topbg} alt='BG' />
      </div>)}
      <header
        className={`${styles['theme-header']} ${isHomePage ? styles['header-absolute'] : styles['header-static']
          }`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-img">
              <Link href="/">
                <Image src={logo} className={styles['logo']} alt="UniBooker" />
              </Link>
            </div>
          </div>
          {/* Navigation Menu Section */}
          {isHomePage ? (
            <nav className={styles['menu-section']}>
              <ul className={`nav ${styles.nav}`}>
                <li className={`nav-item ${styles['nav-item']}`}>
                  <Link className={`nav-link ${styles['nav-link']}`} href="/" passHref>
                    Home
                  </Link>
                </li>
                <li className={`nav-item ${styles['nav-item']}`}>
                  <Link className={`nav-link ${styles['nav-link']}`} href="/about" passHref>
                    About
                  </Link>
                </li>
                <li className={`nav-item ${styles['nav-item']}`}>
                  <Link className={`nav-link ${styles['nav-link']}`} href="/car-list" passHref>
                    Car List
                  </Link>
                </li>
                <li className={`nav-item ${styles['nav-item']}`}>
                  <Link className={`nav-link ${styles['nav-link']}`} href="/place" passHref>
                    Place
                  </Link>
                </li>
                <li className={`nav-item ${styles['nav-item']}`}>
                  <Link className={`nav-link ${styles['nav-link']}`} href="/contact" passHref>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <div className={styles['search-bar']}>
              <div className={styles['dropdown']}>
                <button className={styles['dropdown-btn']}>
                  Explore <span>▼</span>
                </button>
              </div>
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
          {/* Profile Section */}
          {!isHomePage ? (
          <div className='d-flex gap-3'>
            <div className={styles['profile-section']}>
              <Image src={userIcon} className={styles['user-icon']} alt="User Profile" />
            </div>
            <div className={styles['profile-section']}>
              <Image src={wishlist} className={styles['user-icon']} alt="Wishlist" />
            </div>
            <div className={styles['profile-section']}>
              <Image src={cart} className={styles['user-icon']} alt="Cart" />
            </div>
          </div>
          ) : (
            <div className={styles['profile-section']}>
              <Image src={userIcon} className={styles['user-icon']} alt="User Profile" />
            </div>
          )}
        </div>
      </header>
      {!isHomePage && (<Breadcrumbs /> )}
    </>
  );
};

export default Header;
