import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from "@/styles/CarList.module.css";
import { Col, Container, Row } from 'react-bootstrap';
import CarCard from '../components/common/CarCard';
import { Jost } from 'next/font/google';
import Loader from '../components/common/Loader';
import api from '../api/api';
const jostFont = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
});
interface Feature {
    id: string;
    name: string;
}
interface Car {
    id: string;
    name: string;
    item_rating: number;
    is_in_wishlist: boolean
    address: string;
    state_region: string;
    city: string | null;
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
}
interface ItemType {
    id: number;
    name: string;
    description: string;
    status: string;
    image: string | null;
}
interface Make {
    id: number;
    name: string;
    description: string;
    status: string;
    imageURL: string;
}

const Index = () => {
    const [homeData, setHomeData] = useState<Car[]>([]);
    const [filteredData, setFilteredData] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
    const [makes, setMakes] = useState<Make[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([1, 1000]);
    const [years, setYears] = useState<string[]>([]);
    const [odometerRanges, setOdometerRanges] = useState<string[]>([]);
    const [selectedOdometer, setSelectedOdometer] = useState<string[]>([]);
    const [featureData, setFeatureData] = useState<Feature[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/homeData");
                const mergedData = [
                    ...response.data.data.nearby_items,
                    ...response.data.data.featured_items,
                    ...response.data.data.new_arrival_items,
                ];
                setHomeData(mergedData);
                setFilteredData(mergedData);
                setMakes(response.data.data.makes || []);
                setItemTypes(response.data.data.itemTypes || []);
                const yearsSet = new Set<string>();
                mergedData.forEach((car) => {
                    const itemInfo = car.item_info ? JSON.parse(car.item_info) : {};
                    if (itemInfo.year) yearsSet.add(itemInfo.year);
                });
                const odometerSet = new Set<string>();
                const featuresSet = new Set<string>();
                mergedData.forEach((car) => {
                    const itemInfo = car.item_info ? JSON.parse(car.item_info) : {};
                    if (itemInfo.year) yearsSet.add(itemInfo.year);
                    if (itemInfo.odometer) odometerSet.add(itemInfo.odometer);
                    if (itemInfo.features_data) {
                        itemInfo.features_data.forEach((feature: Feature) => {
                            featuresSet.add(feature.name);
                        });
                    }
                });
                setYears(Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a)));
                setOdometerRanges(Array.from(odometerSet));
                setFeatureData(
                    Array.from(featuresSet).map((name, index) => ({
                        id: `feature-${index}`,
                        name,
                    }))
                );
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        const selectedCity = localStorage.getItem("selectedCity");
        const selectedBrand = sessionStorage.getItem("selectedBrand");
        const filtered = homeData.filter((car) => {
            const itemInfo = car.item_info ? JSON.parse(car.item_info) : {};
            const makeType = itemInfo.make_type || "";
            const matchesBrandInSession = !selectedBrand || makeType === selectedBrand;
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(makeType);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(car.item_type_id.toString());
            const matchesCity = !selectedCity || car.city === selectedCity;
            const carPrice = parseFloat(car.price.replace(/[^0-9.-]+/g, ""));
            const matchesPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1];
            const matchesYear = selectedYears.length === 0 || selectedYears.includes(itemInfo.year);
            const matchesOdometer = selectedOdometer.length === 0 || selectedOdometer.includes(itemInfo.odometer);
            const matchesFeatures = selectedFeatures.every((feature: Feature) =>
                itemInfo.features_data && itemInfo.features_data.some((f: Feature) => f.name === feature.name)
            );
            return matchesBrandInSession && matchesBrand && matchesCategory && matchesCity && matchesPrice && matchesYear && matchesOdometer && matchesFeatures;
        });
        setFilteredData(filtered);
    }, [selectedBrands, selectedCategories, homeData, priceRange, selectedOdometer, selectedYears]);

    useEffect(() => {
        const filtered = homeData.filter((car) => {
            const itemInfo = car.item_info ? JSON.parse(car.item_info) : {};
            const matchesFeatures = selectedFeatures.every((feature: Feature) =>
                itemInfo.features_data && itemInfo.features_data.some((f: Feature) => f.name === feature.name)
            );
            return matchesFeatures;
        });
        setFilteredData(filtered);
    }, [selectedFeatures, homeData]);

    const handleSortChange = (option: string) => {
        setSortOption(option);
        const sortedData = [...filteredData];

        if (option === "cheapest") {
            sortedData.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, "")));
        } else if (option === "nearest") {
            sortedData.sort((a, b) => {
                const cityA = a.city || "";
                const cityB = b.city || "";
                return cityA.localeCompare(cityB);
            });
            setFilteredData(sortedData);
        };
    }

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const saveSelectedCar = (car: Car) => {
        sessionStorage.setItem("selectedCar", JSON.stringify(car));
    };

    const handleFeatureChange = (feature: Feature) => {
        setSelectedFeatures((prev) =>
            prev.some((f) => f.id === feature.id)
                ? prev.filter((item) => item.id !== feature.id)
                : [...prev, feature]
        );
    };

    const handleYearChange = (year: string) => {
        setSelectedYears((prev) =>
            prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
        );
    };

    if (loading) {
        return <Loader />;
    }


    return (
        <>
            <Head>
                <title>Unibooker | Car List</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className={`${styles.car_list_main} ${styles.page} ${jostFont.variable}`}>
                <Container>
                    <Row>
                        <Col md={12} className={styles.main_heading}>
                            <Row className='m-3'>
                                <Col md={6} className='text-start'>
                                    <h2>Car List</h2>
                                </Col>
                                <Col md={6} className='text-end'>
                                    <div>
                                        <h5>Sort By</h5>
                                        <select onChange={(e) => handleSortChange(e.target.value)} value={sortOption}>
                                            <option value="">Select Sort</option>
                                            <option value="cheapest">Cheapest Price</option>
                                            <option value="nearest">Nearest Location</option>
                                            <option value="mostViewed">Most Viewed</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <div className={styles.filter_section}>
                                <h5>Categories</h5>
                                <ul>
                                    {itemTypes.map((item) => (
                                        <li key={item?.id}>
                                            <input
                                                type="checkbox"
                                                id={`filter-${item.id}`}
                                                checked={selectedCategories.includes(item.id.toString())}
                                                onChange={() => handleCategoryChange(item.id.toString())}
                                            />
                                            <label htmlFor={`filter-${item.id}`}>{item.name}</label>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.checkbox}>
                                    <h5>Price Range</h5>
                                    <div>Range: ${priceRange[0]} - ${priceRange[1]}</div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="1000"
                                        step="50"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                                    />
                                </div>
                                <h5>Brands</h5>
                                <ul>
                                    {makes.map((make) => (
                                        <li key={make.id}>
                                            <input
                                                type="checkbox"
                                                id={`make-${make.id}`}
                                                checked={selectedBrands.includes(make.name) || sessionStorage.getItem("selectedBrand") === make.name}
                                                onChange={() => handleBrandChange(make.name)}
                                            />
                                            <label htmlFor={`make-${make.id}`}>{make.name}</label>
                                        </li>
                                    ))}
                                </ul>
                                <h5>Odometer</h5>
                                <ul>
                                    {odometerRanges.map((range) => (
                                        <li key={range}>
                                            <input
                                                type="checkbox"
                                                id={`odometer-${range}`}
                                                checked={selectedOdometer.includes(range)}
                                                onChange={() => {
                                                    setSelectedOdometer((prev) =>
                                                        prev.includes(range)
                                                            ? prev.filter((item) => item !== range)
                                                            : [...prev, range]
                                                    );
                                                }}
                                            />
                                            <label htmlFor={`odometer-${range}`}>{range}</label>
                                        </li>
                                    ))}
                                </ul>
                                <h5>Features</h5>
                                <ul>
                                    {featureData.map((feature, index) => (
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                id={`feature-${feature.name}`}
                                                checked={selectedFeatures.some((f) => f.id === feature.id)}
                                                onChange={() => handleFeatureChange(feature)}
                                            />
                                            <label htmlFor={`feature-${feature.name}`}>{feature.name}</label>
                                        </li>
                                    ))}
                                </ul>
                                <h5>Year</h5>
                                <ul>
                                    {years.map((year) => (
                                        <li key={year}>
                                            <input
                                                type="checkbox"
                                                id={`year-${year}`}
                                                checked={selectedYears.includes(year)}
                                                onChange={() => handleYearChange(year)}
                                            />
                                            <label htmlFor={`year-${year}`}>{year}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                        <Col md={9} className='text-center'>
                            {filteredData.length === 0 ? (
                                <div className="no_data">No data available</div>
                            ) : (
                                <div className={styles.cars_row}>
                                    {filteredData.map((car, index) => (
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
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
};

export default Index;