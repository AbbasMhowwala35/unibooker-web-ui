import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../styles/CarCard.module.css";
import star from '../../../Images/star.svg';
import locationIcon from '../../../Images/location.svg';
import wishlistIcon from '../../../Images/wishlist.svg';
import heartfilled from '../../../Images/heart-filled.svg';
import api from '@/pages/api/api';
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

interface CarCardProps {
    id: string;
    name: string;
    rating: number;
    location?: string;
    price: string;
    image: string;
    item_rating: number;
    item_info: string;
    is_in_wishlist?: boolean;
    saveSelectedCar: (car: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const CarCard: React.FC<CarCardProps> = ({
    id,
    name,
    item_rating,
    location,
    image,
    is_in_wishlist = false,
    saveSelectedCar
}) => {
    const [inWishlist, setInWishlist] = useState(is_in_wishlist);
    const handleWishlistToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const payload = {
            item_id: id,
            token: userData?.token,
        };

        try {
            if (inWishlist) {
                const response = await api.get("/removeFromWishlist", { params: payload });
                if (response.status === 200) {
                    setInWishlist(false);
                    toast.success("Removed from wishlist!");
                } else {
                    toast.error("Failed to remove from wishlist.");
                }
            } else {
                const response = await api.post("/addToWishlist", payload);
                if (response.status === 200) {
                    setInWishlist(true);
                    toast.success("Added to wishlist!");
                } else {
                    toast.error("Failed to add to wishlist.");
                }
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div className={styles.most_viewed_cars_cards} key={id}>

            <div className={styles.most_viewed_cars_cards_overlay}>
                <Image className={styles.most_viewed_cars_img} src={image} width={315} height={400} alt={name} />
            </div>
            <div className={styles.most_viewed_cars_cards_content_top}>
                <Link href={`/cars/${id}`} onClick={() => saveSelectedCar({ id, name, image, item_rating })}>  <h3>{name}</h3>  </Link>
            </div>
            <div className={styles.most_viewed_cars_cards_content_bottom}>
                <div className={styles.most_viewed_cars_cards_content_bottom_content}>
                    <span>
                        <Image src={star} alt="Star" /> {item_rating} Reviews
                    </span>
                    {location && (
                        <span>
                            <Image src={locationIcon} alt="Location" /> {location}
                        </span>
                    )}
                </div>
                <div
                    className={styles.most_viewed_cars_cards_content_wishlist}
                    onClick={handleWishlistToggle}
                    style={{ cursor: "pointer" }}
                >
                    <Image src={inWishlist ? heartfilled : wishlistIcon} alt="Wishlist Icon" />
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default CarCard;