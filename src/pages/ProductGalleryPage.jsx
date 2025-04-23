import { useAuth } from '../hooks/useAuth';
import { productsData } from "../products"
import { Link } from 'react-router-dom';
import "../styles/ProductGalleryPage.css";

export default function HomePage() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };



    return (
        <>
            <button onClick={handleLogout}>Logout</button>
            <div className='product-gallery'>
                {
                    productsData.map(product => {
                        const productId = `${product.codename}-${product.name}`;
                        const productImage = `${import.meta.env.BASE_URL}/assets/product_images/${productId}.webp`;
                        console.log(productImage);

                        return (
                            <div key={product.codename} className='product-gallery-container'>
                                <Link to={`/product-gallery/${productId}`} state={{ data: product }}>
                                    <img src={productImage} alt={`${product.type} ${product.name}`} className='product-gallery-image' loading="lazy" />
                                </Link>
                                <h5 className='product-gallery-title'>{product.name}</h5>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );

};
