import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { productExamplesData } from '../productExamplesData';

const CarouselPage = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const productType = queryParams.get('type');
    const productName = location.state.productIdForUrl;

    if (!productType) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Error</h2>
                <p>Product type not specified in URL query parameter (e.g., ?type=STAIR).</p>
            </div>
        );
    }

    const imagesForType = productExamplesData?.[productType] ?? [];

    const filteredImages = productName
        ? imagesForType.filter(
            (image) => image.productName.toUpperCase() === productName.toUpperCase()
        )
        : imagesForType;

    const pageTitle = productType.replace('-', ' ');

    if (filteredImages.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ textTransform: 'capitalize' }}>{pageTitle} Examples</h2>
                <p>No examples found for this product type.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', textTransform: 'capitalize' }}>
                {pageTitle} Examples for {productName}
            </h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 40 },
                }}
                navigation
                pagination={{ clickable: true }}
                loop={filteredImages.length > 3}
                style={{ paddingBottom: '40px', height: '35vw' }}
            >
                {filteredImages.map((imageInfo, index) => (
                    <SwiperSlide key={index}>
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src={imageInfo.src}
                                alt={`${imageInfo.productName} - ${productType} Example ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '600px',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                                loading="lazy"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselPage;
