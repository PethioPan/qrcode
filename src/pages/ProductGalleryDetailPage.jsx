import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import "../styles/ProductGalleryDetailPage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStairs,
    faRulerHorizontal,
    faColumns,
    faWindowMaximize,
    faDoorOpen,
    faSink,
    faTable,
    faMonument,
    faBorderAll,
} from '@fortawesome/free-solid-svg-icons';

const iconLinksBase = [
    { icon: faStairs, type: "STAIR", alt: "Stair Examples" },
    { icon: faRulerHorizontal, type: "FLOOR", alt: "Floor Examples" }, // Consider faRulerHorizontal
    { icon: faColumns, type: "CLADDING", alt: "Cladding Examples" }, // Consider faBrickWall or faCube
    { icon: faWindowMaximize, type: "WINDOW SILL", alt: "Window Sill Examples" },
    { icon: faDoorOpen, type: "DOOR SILL", alt: "Door Sill Examples" },
    { icon: faSink, type: "KITCHEN COUNTERTOP", alt: "Kitchen Countertop Examples" },
    { icon: faTable, type: "TABLE TOP", alt: "Table Top Examples" },
    { icon: faSink, type: "BATHROOM SINK", alt: "Bathroom Sink Examples" },
    { icon: faMonument, type: "TOMBSTONE", alt: "Tombstone Examples" }, // Consider faCross
    { icon: faBorderAll, type: "COPPING", alt: "Copping Examples" },   // Consider faOutdent
];

const ProductGalleryDetailPage = () => {
    const location = useLocation()
    const { id } = useParams();
    const product = location.state?.data
    const [availableTypesByProductData, setAvailableTypesByProductData] = useState({});

    useEffect(() => {
        const fetchAvailableTypes = async () => {
            try {
                const response = await fetch('/availableProductTypes.json');
                if (response.ok) {
                    const data = await response.json();
                    setAvailableTypesByProductData(data);
                    // console.log("Available Types by Product (from JSON):", data);
                } else {
                    console.error('Failed to fetch available product types from JSON');
                }
            } catch (error) {
                console.error('Error fetching available product types:', error);
            }
        };

        fetchAvailableTypes();
    }, []);

    if (!product) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Error</h2>
                <p>Product details not available.</p>
                <Link to="/product-gallery">Return to Gallery</Link>
            </div>
        );
    }
    const productIdForUrl = `${product.codename}-${product.name}`;
    const productImage = `../../assets/product_images/${productIdForUrl}.webp`;
    const capitalize = (str) => {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const availableIconLinks = iconLinksBase.filter(link =>
        availableTypesByProductData[productIdForUrl]?.includes(link.type)
    );

    return (
        <div className='product-gallery-detail'>
            <h3>{capitalize(product.type)}</h3>
            <h1>{product.name}</h1>
            <div className='product-gallery-detail-hero'>
                <img
                    src={productImage}
                    alt={`${product.name}`}
                    className='product-gallery-image'
                    onError={(e) => { e.target.style.display = 'none'; }}
                    loading="lazy"
                />
                <ul className='product-gallery-detail-icons-list'>
                    {availableIconLinks.length > 0 ? (
                        availableIconLinks.map(({ icon, type, alt }) => (
                            <li key={type}>
                                <Link
                                    to={`/product-gallery/${id}/carousel?type=${type}`}
                                    state={{ productIdForUrl: productIdForUrl }}
                                    title={alt}>
                                    <FontAwesomeIcon icon={icon} size="3x" />
                                    <h3>{type.toLowerCase().split((" ")).map(word => (capitalize(word))).join(" ")}</h3>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>
                            <h3>No Product Examples Available</h3>
                        </li>
                    )}
                </ul>
            </div>
            <p className='product-gallery-detail-description'>{product.description}</p>
        </div>
    )
}

export default ProductGalleryDetailPage
