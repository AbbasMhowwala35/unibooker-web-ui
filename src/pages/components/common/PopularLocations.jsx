import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import styles from "@/styles/Home.module.css";

const PopularLocations = ({ locations, sliderSettings, variant = 'slider' }) => {
    if (!Array.isArray(locations) || locations.length === 0) {
        console.error("The 'locations' prop is not an array or is empty.");
        return null;
    }
    return (
        <>
            {variant === 'slider' ? (
                <Slider className={styles.location_slider} {...sliderSettings}>
                    {locations.map((location, index) => (
                        <div className={styles.location_card} key={index}>
                            <Image
                                className={styles.locationImg}
                                src={location.image}
                                alt={`Location ${index + 1}`}
                            />
                            <h3>{location.name}</h3>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className={styles.grid_layout}>
                    {locations.map((location, index) => (
                        <div className={styles.location_card} key={index}>
                            <Image
                                src={location.image}
                                alt={`Location ${index + 1}`}
                            />
                            <h3>{location.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default PopularLocations;
