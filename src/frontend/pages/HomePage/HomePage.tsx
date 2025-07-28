import Banner from "@/_components/ui/Banner";
import BestSellers from "@/_components/ui/BestSellers";
import BrandShowcase from "@/_components/ui/BrandShowcase";
import FeaturedProducts from "@/_components/ui/FeaturedProducts";
import ProductCategoryCard from "@/_components/ui/ProductCategoryCard";
import SpecialOffers from "@/_components/ui/SpecialOffers";

const HomePage = () => {
  return (
    <>
      <Banner />
      <ProductCategoryCard />
      <FeaturedProducts />
      <SpecialOffers />
      <BrandShowcase />
      <BestSellers/>
    </>
  );
};

export default HomePage;
