import { useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { productExamplesData } from '../scripts/productExamplesData.js';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import '../styles/CarouselPage.css';

const CarouselPage = () => {
    const location = useLocation();
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const queryParams = new URLSearchParams(location.search);
    const productType = queryParams.get('type');
    const productName = location.state.productIdForUrl;

    if (!productType) {
        return (
            <div className="carousel-modal-error">
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
            <div className="carousel-modal-empty">
                <h2>{pageTitle} Examples</h2>
                <p>No examples found for this product type.</p>
            </div>
        );
    }

    return (
        <div className="carousel-modal">
            <h2 className="carousel-modal-title">
                {pageTitle} Examples for {productName}
            </h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={filteredImages.length > 3}
                style={{ flex: 1, width: '100vw', height: '100%' }}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                initialSlide={0}
            >
                {filteredImages.map((imageInfo, index) => (
                    <SwiperSlide key={index}>
                        <div className="carousel-slide-content">
                            <img
                                src={`${import.meta.env.BASE_URL}/${imageInfo.src}`}
                                alt={`${imageInfo.productName} - ${productType} Example ${index + 1}`}
                                className="carousel-slide-image"
                                loading="lazy"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Thumbnails */}
            <div className="carousel-thumbnails">
                {filteredImages.map((imageInfo, idx) => (
                    <img
                        key={idx}
                        src={`${import.meta.env.BASE_URL}/${imageInfo.src}`}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`carousel-thumbnail${idx === activeIndex ? ' active' : ''}`}
                        onClick={() => {
                            swiperRef.current?.slideToLoop(idx);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselPage;
