import React from 'react';
import location1 from '../../Images/locations/1.png';
import location2 from '../../Images/locations/2.png';
import location3 from '../../Images/locations/3.png';
import location4 from '../../Images/locations/4.png';
import Link from 'next/link';
import PopularLocations from '../components/common/PopularLocations';
import styles from "@/styles/Home.module.css";
import { Jost } from 'next/font/google';
// Define Jost font
const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const locations = [
  { name: 'Location 1', image: location1 },
  { name: 'Location 2', image: location2 },
  { name: 'Location 3', image: location3 },
  { name: 'Location 4', image: location4 },
  { name: 'Location 1', image: location1 },
  { name: 'Location 2', image: location2 },
  { name: 'Location 3', image: location3 },
  { name: 'Location 4', image: location4 },
  { name: 'Location 1', image: location1 },
  { name: 'Location 2', image: location2 },
  { name: 'Location 3', image: location3 },
  { name: 'Location 4', image: location4 },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Place() {
  return (
    <section className={`${styles.popular_locations} ${jostFont.variable}`}>
      <h2 className={styles.main_heading}>Popular Locations</h2>
      <PopularLocations
        locations={locations}
        sliderSettings={sliderSettings}
        variant="grid"
      />
      <Link className={styles.btn_link} href="/locations">
        Explore All
      </Link>
    </section>
  );
}
