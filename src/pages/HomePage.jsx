import React from 'react';
import Navbar from '../components/Home/Navbar';
import HeroIllustration from '../components/Home/HeroIllustration';
import RegCards from "../components/Home/RegCards";
import AboutSection from '../components/Home/AboutSection'; // Import the About section
import FeaturesSection from '../components/Home/FeaturesSection';
import Footer from '../components/Home/FooterSection';
// import ProductPage from '../components/Home/ProductsSection';

function HomePage() {
  return (
    <>
      <div className='rounded-4xl'>
        <Navbar/>
      </div>
      <HeroIllustration/>
      <AboutSection /> 
      <FeaturesSection />
      {/* <ProductPage /> */}
      <RegCards/>
      <Footer />
    </>
  );
}

export default HomePage;