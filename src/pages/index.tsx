import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Jost } from "next/font/google";
import d1 from '../Images/d1.svg'
import d2 from '../Images/d2.svg'
import d3 from '../Images/d3.svg'
import testimonial from '../Images/testimonial.png'
import person1 from '../Images/person1.jpg'
import Newsletter from "./components/common/Newsletter";
import { BsShieldFillCheck } from "react-icons/bs";
import CarCard from "./components/common/CarCard";
import Loader from "./components/common/Loader";
import Popularlocations from './components/common/PopularLocations'
import api from "./api/api";
import Slider from "react-slick";
import styles from "@/styles/Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useRouter } from "next/router";
interface MostViewedItem {
  id: string;
  name: string;
  item_rating: number;
  address: string;
  state_region: string;
  city: string;
  zip_postal_code: string;
  price: string;
  latitude: string;
  longitude: string;
  status: string;
  item_type_id: string;
  image: string;
  item_info: string;
  is_verified: string;
  is_featured: string;
  booking_policies_id: number;
  weekly_discount: string;
  weekly_discount_type: string;
  monthly_discount: string;
  monthly_discount_type: string;
  doorStep_price: string | null;
  cancellation_reason_title: string;
  cancellation_reason_description: string[];
  features_data: {
    id: number;
    name: string;
    image_url: string | null;
  }[];
  host_id: string;
  host_first_name: string;
  host_last_name: string;
  host_email: string;
  host_phone: string;
  host_player_id: string;
  host_profile_image: string;
  gallery_image_urls: string[];
  review_data: {
    id: number;
    booking_id: string;
    guest_id: string;
    guest_name: string;
    guest_profile_image: string | null;
    rating: string;
    message: string;
    created_at: string;
    updated_at: string;
  }[];
  total_reviews: number;
  is_in_wishlist: boolean;
  item_type: string;
}
interface HomeData {
  locations: {
    city_name: string;
    image: string;
  }[];
  makes: {
    id: string;
    imageURL: string;
    name: string
  }[];
  most_viewed_items: MostViewedItem[]
  featured_items: MostViewedItem[]
  testimonials: {
    name: string;
    message: string;
  }[];
  popularCompanies: {
    name: string;
    logo: string;
  }[];
}

const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  margin: 30,
  arrows: true,
  prevArrow: <div className="prev-arrow">Prev</div>,
  nextArrow: <div className="next-arrow">Next</div>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <button className={styles.nextArrow}>Next</button>,
  prevArrow: <button className={styles.prevArrow}>Prev</button>,
};

export default function Home() {
  const router = useRouter();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [locationClicked, setLocationClicked] = useState<string | undefined>(undefined); // eslint-disable-line
  const [brandClicked, setBrandClicked] = useState<string | undefined>(undefined); // eslint-disable-line
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("/homeData");
          setHomeData(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching home data:", error);
          setLoading(false);
        }
      };
      fetchData();
  }, []);

  const handleLocationClick = (cityName: string) => {
    setLocationClicked(cityName)
    sessionStorage.setItem("selectedCity", cityName);
    router.push('/items-list')
  };

  const handleBrandClick = async (brandName: string) => {
    setBrandClicked(brandName);
    sessionStorage.setItem("selectedBrand", brandName);
    router.push('/items-list');
  };  

  const saveSelectedCar = (car: MostViewedItem) => {
    sessionStorage.setItem("selectedCar", JSON.stringify(car));
  };

  if (loading) {
    return <Loader />;
  }

  const testimonials = [
    {
      name: 'John Doe',
      location: 'New York, USA',
      testimonial: 'We have a unique combination of talents motivated by ambitious goals and a can-do attitude. Our drive to develop excellent products is built on teamwork, passion, and giving team members full control over their work to succeed on their own. We want to create an environment where ideas can flourish.',
      image: person1,
    },
    {
      name: 'Jane Smith',
      location: 'London, UK',
      testimonial: 'Amazing experience! I highly recommend this service.',
      image: person1,
    },
  ];

  return (
    <>
      <Head>
        <title>Unibooker | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${jostFont.variable}`}>
        {/* Hero Section */}
        <div className={styles.hero_bg}>
          <Container>
            <Row>
              <Col md={12}>
                <Card className={styles.search_box}>
                  <Card.Body>
                    <form>
                      <Row>
                        <Col md={2}>
                          <div className="form-inputs mb-3">
                            <label htmlFor="city">City</label>
                            <select id="city" className="form-control">
                              {homeData?.locations.map((location, index) => (
                                <option key={index} value={location.city_name}>
                                  {location.city_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="form-inputs mb-3">
                            <label htmlFor="location">Location</label>
                            <input
                              id="location"
                              type="text"
                              className="form-control"
                              placeholder="Enter a location"
                            />
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="form-inputs mb-3">
                            <label htmlFor="startDate">Trip Starts</label>
                            <input id="startDate" type="datetime-local" className="form-control" />
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="form-inputs mb-3">
                            <label htmlFor="endDate">Trip Ends</label>
                            <input id="endDate" type="datetime-local" className="form-control" />
                          </div>
                        </Col>
                        <Col md={2}>
                          <Button className={styles.theme_btn} type="submit">
                            Search Car
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} lg={6} xl={6} className="mt-5">
                <h1>Easy and Convenient Way of Car Booking in <span>UniBooker</span></h1>
                <p>Vestibulum ultricies aliquam convallis. Maecenas ut tellus mi. Proin tincidunt, lectus eu volutpat.</p>
              </Col>
            </Row>
            <div className={styles.carouselValue}>
              <div className={styles.carouselValueContainer}>
                <div className={styles.carouselValueSection}>
                  <div className={styles.carouselValueSectionIcon}>
                    <BsShieldFillCheck />
                  </div>
                  <div className={styles.carouselValueSectionContent}>
                    <h4>100%</h4>
                    <p>Hassle-free Secured Trip</p>
                  </div>
                </div>
                <div className={styles.carouselValueSection}>
                  <div className={styles.carouselValueSectionIcon}>
                    <BsShieldFillCheck />
                  </div>
                  <div className={styles.carouselValueSectionContent}>
                    <h4>25000+</h4>
                    <p>Quality cars available</p>
                  </div>
                </div>
                <div className={styles.carouselValueSection}>
                  <div className={styles.carouselValueSectionIcon}>
                    <BsShieldFillCheck />
                  </div>
                  <div className={styles.carouselValueSectionContent}>
                    <h4>Delivery</h4>
                    <p>Anywhere, Anytime</p>
                  </div>
                </div>
                <div className={styles.carouselValueSection}>
                  <div className={styles.carouselValueSectionIcon}>
                    <BsShieldFillCheck />
                  </div>
                  <div className={styles.carouselValueSectionContent}>
                    <h4>Endless</h4>
                    <p>Drives, pay by hour</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <main className={`${styles.main} container`}>
          <section className={styles.popular_locations}>
            <h2 className={styles.main_heading}>Popular Locations</h2>
            <Popularlocations
              locations={homeData?.locations}
              sliderSettings={sliderSettings}
              onLocationClick={handleLocationClick}
              variant="slider"
            />
            <Link className={styles.btn_link} href="/">Explore All</Link>
          </section>
          <section className={styles.company_logos}>
            <div className={styles.company_logos_row}>
              {homeData?.makes.map((make) => (
                <div key={make.id}>
                  <div className={styles.company_logos_div}  onClick={() => handleBrandClick(make.name)} style={{ cursor: "pointer" }}>
                    <Image
                      src={make.imageURL}
                      alt={make.name}
                      width={100}
                      height={100}
                      layout="intrinsic"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Most Viewed Cars Section */}
          <section className={styles.most_viewed_cars}>
            <h2 className={styles.main_heading}>Most Viewed Cars</h2>
            <div className={styles.cars_row}>
              {homeData?.most_viewed_items.map((car: MostViewedItem, index) => (
                <div
                  key={index}
                  onClick={() => saveSelectedCar(car)}
                >
                  <CarCard
                    id={car.id}
                    image={car.image}
                    name={car.name}
                    item_rating={car.item_rating}
                    rating={car.item_rating}
                    location={car.address}
                    price={car.price}
                    is_in_wishlist={car.is_in_wishlist}
                    item_info={car.item_info}
                    saveSelectedCar={saveSelectedCar}
                  />
                </div>
              ))}
            </div>
            <Link className={styles.btn_link} href="/">Explore All</Link>
          </section>
          {/* Deliverables Section */}
          <section className={styles.deliverables}>
            <div className={styles.deliverables_row}>
              <div className={styles.deliverables_block}>
                <Image src={d1} alt="Deliverables" />
                <div className={styles.deliverables_content_block}>
                  <h5>700 Destinations</h5>
                  <p>Our expert team handpicked all destinations in this site</p>
                </div>
              </div>
              <div className={styles.deliverables_block}>
                <Image src={d2} alt="Deliverables" />
                <div className={styles.deliverables_content_block}>
                  <h5>700 Destinations</h5>
                  <p>Our expert team handpicked all destinations in this site</p>
                </div>
              </div>
              <div className={styles.deliverables_block}>
                <Image src={d3} alt="Deliverables" />
                <div className={styles.deliverables_content_block}>
                  <h5>700 Destinations</h5>
                  <p>Our expert team handpicked all destinations in this site</p>
                </div>
              </div>
            </div>
          </section>
          {/* Short Advertising Banner */}
          <section className={styles.advertising_banner}>
            <div className={styles.advertising_banner_content}>
              <h3>Lend your car to make <br /> some extra cash</h3>
              <Link className={styles.advertising_btn} href="/">Become A Host</Link>
            </div>
          </section>
          {/* Recommended Cars Section */}
          <section className={styles.recommended_cars}>
            <h2 className={styles.main_heading}>Recommended Cars</h2>
            <div className={styles.cars_row}>
              {homeData?.featured_items.map((car: MostViewedItem, index) => (
                <div
                  key={index}
                  onClick={() => saveSelectedCar(car)}
                >
                  <CarCard
                    id={car.id}
                    image={car.image}
                    name={car.name}
                    item_rating={car.item_rating}
                    rating={car.item_rating}
                    location={car.address}
                    price={car.price}
                    is_in_wishlist={car.is_in_wishlist}
                    item_info={car.item_info}
                    saveSelectedCar={saveSelectedCar}
                  />
                </div>
              ))}
            </div>
          </section>
          {/* Travel Stories Section */}
          <section className={styles.travel_stories}>
            <h3>Client Testimonial</h3>
            <Row className="align-items-center">
              <Col md={6}>
                <Image src={testimonial} className={`${styles.travel_stories_img} img-fluid`} alt="Travel Story" />
              </Col>
              <Col md={6}>
                <div className={styles.clientBox}>
                  <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className={styles.testimonialSlide}>
                        <p>{testimonial.testimonial}</p>
                        <div className={`${styles.testimonialUser} d-flex gap-3`}>
                          <Image src={testimonial.image} className={styles.testimonial_img} alt={`Testimonial from ${testimonial.name}`} />
                          <div className={styles.clientInfo}>
                            <h5>{testimonial.name}</h5>
                            <p>{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </Col>
            </Row>
          </section>
        </main>
        <Newsletter />
      </div>
    </>
  );
}