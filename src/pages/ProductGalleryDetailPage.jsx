import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import "../styles/ProductGalleryDetailPage.css";
import {
    Stairs as StairsIcon,
    Straighten as FloorIcon,
    ViewColumn as CladdingIcon,
    Window as WindowSillIcon,
    DoorFront as DoorSillIcon,
    Kitchen as KitchenCountertopIcon,
    TableBar as TableTopIcon,
    Bathroom as BathroomSinkIcon,
    AccountBalance as TombstoneIcon,
    BorderAll as CoppingIcon,
} from '@mui/icons-material';

const iconLinksBase = [
    { icon: <StairsIcon fontSize="large" />, type: "STAIR", alt: "Stair Examples" },
    { icon: <FloorIcon fontSize="large" />, type: "FLOOR", alt: "Floor Examples" },
    { icon: <CladdingIcon fontSize="large" />, type: "CLADDING", alt: "Cladding Examples" },
    { icon: <WindowSillIcon fontSize="large" />, type: "WINDOW SILL", alt: "Window Sill Examples" },
    { icon: <DoorSillIcon fontSize="large" />, type: "DOOR SILL", alt: "Door Sill Examples" },
    { icon: <KitchenCountertopIcon fontSize="large" />, type: "KITCHEN COUNTERTOP", alt: "Kitchen Countertop Examples" },
    { icon: <TableTopIcon fontSize="large" />, type: "TABLE TOP", alt: "Table Top Examples" },
    { icon: <BathroomSinkIcon fontSize="large" />, type: "BATHROOM SINK", alt: "Bathroom Sink Examples" },
    { icon: <TombstoneIcon fontSize="large" />, type: "TOMBSTONE", alt: "Tombstone Examples" },
    { icon: <CoppingIcon fontSize="large" />, type: "COPPING", alt: "Copping Examples" },
];

const ProductGalleryDetailPage = () => {
    const location = useLocation()
    const { id } = useParams();
    const product = location.state?.data
    const [availableTypesByProductData, setAvailableTypesByProductData] = useState({});

    useEffect(() => {
        const fetchAvailableTypes = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}availableProductTypes.json`);
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
    const productImage = `${import.meta.env.BASE_URL}assets/product_images/${productIdForUrl}.webp`;
    const capitalize = (str) => {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const availableIconLinks = iconLinksBase.filter(link =>
        availableTypesByProductData[productIdForUrl]?.includes(link.type)
    );

    return (
        <div className='product-gallery-detail'>
            <div className='product-gallery-detail-title'>
                <h3>{capitalize(product.type)}</h3>
                <h1>{product.name}</h1>
            </div>
            <div className='product-gallery-detail-hero'>
                <img
                    src={productImage}
                    alt={`${product.name}`}
                    className='product-gallery-detail-image'
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
                                    {icon}
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
