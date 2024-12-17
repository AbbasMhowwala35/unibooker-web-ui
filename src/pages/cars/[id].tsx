import { useRouter } from 'next/router';
import styles from "../../styles/CarDetails.module.css";
import { Col, Container, Row } from 'react-bootstrap';

const CarDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const cars = [
        {
            id: "1",
            name: "Tesla",
            rating: 5,
            reviews: 242,
            location: "Wilora NT 0872, Australia",
            price: "$165,3",
            distance: "12 km",
            wishlist: "/static/wishlist.png",
        },
        {
            id: "2",
            name: "BMW",
            rating: 4.5,
            reviews: 128,
            location: undefined,
            price: "$120,0",
            distance: "8 km",
            wishlist: undefined,
        },
    ];
    const car = cars.find((car) => car.id === id);
    if (!car) {
        return <p>Car not found</p>;
    }

    return (
        <section className={styles.carsDetailsMain}>
            <Container>
                <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                        <div>
                            <h1>{car.name}</h1>
                            <p>Rating: {car.rating}</p>
                            <p>Location: {car.location || 'Not Available'}</p>
                            <p>Price: {car.price}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CarDetails;
