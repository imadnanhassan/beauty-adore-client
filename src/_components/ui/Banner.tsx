import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  mainImage: string;
  productImage: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "NECKLACES",
    subtitle: "GRACE REDEFINED",
    description:
      "Elevate every look with our exquisite necklaces. From pendants to chokers, these designs add sophistication to any style.",
    buttonText: "SHOP NECKLACES",
    mainImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/12ring.jpg",
    productImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/rings.jpg",
  },
  {
    id: 2,
    title: "EARRINGS",
    subtitle: "TIMELESS ELEGANCE",
    description:
      "Discover our stunning collection of earrings that complement every occasion. From subtle studs to statement pieces.",
    buttonText: "SHOP EARRINGS",
    mainImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/12ring.jpg",
    productImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/rings.jpg",
  },
  {
    id: 3,
    title: "BRACELETS",
    subtitle: "WRIST PERFECTION",
    description:
      "Adorn your wrists with our carefully crafted bracelets. Each piece tells a story of craftsmanship and beauty.",
    buttonText: "SHOP BRACELETS",
    mainImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/12ring.jpg",
    productImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/rings.jpg",
  },
  {
    id: 4,
    title: "RINGS",
    subtitle: "ETERNAL BEAUTY",
    description:
      "Complete your look with our exquisite ring collection. From delicate bands to bold statement pieces.",
    buttonText: "SHOP RINGS",
    mainImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/12ring.jpg",
    productImage:
      "https://www.sliderrevolution.com/wp-content/uploads/revslider/Prismara-Jewelry-Shop-Slider-Template/rings.jpg",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="relative w-full h-[500px] lg:h-screen overflow-hidden bg-stone-100"
      onWheel={(e) => {
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        e.preventDefault();
      }}
    >
      {/* Main Slider Container */}
      <div className="lg:flex   h-full">
        {/* Left Panel - Main Image with Text Overlay */}
        <div className="relative lg:w-1/2 w-full h-full overflow-hidden">
          <div
            key={`main-${currentSlide}`}
            className="absolute inset-0 transition-all duration-500 ease-in-out transform"
            style={{
              backgroundImage: `url(${currentSlideData.mainImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center items-start h-full px-16 text-white ">
              <div className="transform transition-all duration-700 ease-out">
                <h1 className="text-6xl md:text-7xl font-light tracking-wider mb-4 opacity-0 animate-[fadeInUp_0.8s_0.2s_ease-out_forwards]">
                  {currentSlideData.title}
                </h1>
                <p className="text-sm tracking-[0.3em] font-light opacity-0 animate-[fadeInUp_0.8s_0.4s_ease-out_forwards]">
                  {currentSlideData.subtitle}
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="absolute bottom-8 left-16 flex space-x-6 z-10">
              <Facebook className="w-5 h-5 text-white/80 hover:text-white transition-colors cursor-pointer" />
              <Youtube className="w-5 h-5 text-white/80 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="w-5 h-5 text-white/80 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Right Panel - Product Image and Description */}

        <div className=" relative lg:w-1/2 w-full h-full bg-gradient-to-br from-[#d4c1b0] to-[#a88f7a] overflow-hidden flex flex-col items-center justify-center px-16 py-12">
          <div
            key={`product-${currentSlide}`}
            className="flex flex-col items-center max-w-md"
          >
            {/* Arched Product Image Frame */}
            <div className="relative mb-12 opacity-0 animate-[fadeInUp_0.8s_0.6s_ease-out_forwards]">
              <div
                className="w-80 h-96 rounded-t-full border-4 border-white/30 shadow-2xl transition-all duration-700 ease-out transform hover:scale-105"
                style={{
                  backgroundImage: `url(${currentSlideData.productImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            {/* Product Description */}
            <div className="text-center">
              <p className="text-white text-base leading-relaxed mb-8 opacity-0 animate-[fadeInUp_0.8s_0.8s_ease-out_forwards]">
                {currentSlideData.description}
              </p>
              <button className="group relative overflow-hidden bg-transparent border-2 border-white/50 text-white px-10 py-4 text-sm tracking-wider font-medium transition-all duration-300 hover:bg-white hover:text-stone-700 rounded-full opacity-0 animate-[fadeInUp_0.8s_1s_ease-out_forwards]">
                <span className="relative z-10">
                  {currentSlideData.buttonText}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Arrows - Vertical */}
          <div className="absolute bottom-8 right-16 flex space-x-4 z-20">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-stone-700 w-8"
                : "bg-stone-400 hover:bg-stone-600"
            }`}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
