import React from "react";
import Image from "next/image";
import styles from "../../../styles/CarCard.module.css";
import star from '../../../Images/star.svg'
import locationIcon from '../../../Images/location.svg'
import wishlistIcon from '../../../Images/wishlist.svg'
import car1 from '../../../Images/car1.png'

interface CarCardProps {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    location?: string;
    price: string;
    distance: string;
    wishlist?: string;
}

const CarCard: React.FC<CarCardProps> = ({
    id,
    name,
    rating,
    reviews,
    location,
    price,
    distance,
    wishlist,
}) => {
    
    return (
        // <Link href={`/cars/${id}`} passHref>
        <div className={styles.most_viewed_cars_cards} key={id}>
            <Image src={car1} alt={name} />
            <div className={styles.most_viewed_cars_cards_content_top}>
                <h3>{name}</h3>
            </div>
            <div className={styles.most_viewed_cars_cards_content_bottom}>
                <div className={styles.most_viewed_cars_cards_content_bottom_content}>
                    <span>
                        <Image src={star} alt="Star" /> {rating} ({reviews} Reviews)
                    </span>
                    {location && (
                        <span>
                            <Image src={locationIcon} alt="Location" /> {location}
                        </span>
                    )}
                    <span>
                        {price} /night <sub>{distance}</sub>
                    </span>
                </div>
                {wishlist && (
                    <div className={styles.most_viewed_cars_cards_content_wishlist}>
                        <Image src={wishlistIcon} alt="Wishlist" />
                    </div>
                )}
            </div>
        </div>
        // </Link>
    );
};

export default CarCard;
