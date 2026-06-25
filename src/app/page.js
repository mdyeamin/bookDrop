import CallToAction from '@/components/home/CallToAction';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroSlider from '@/components/home/HeroSlider';
import HowItWorks from '@/components/home/HowItWorks';
import PopularCategories from '@/components/home/PopularCategories';
import TopProviders from '@/components/home/TopProviders';
import React from 'react';

const Home = () => {

  
  return (
    <div>
      <HeroSlider/>
      <FeaturedBooks/>
      <TopProviders/>
      <PopularCategories/>
      <HowItWorks/>
      <CallToAction/>
    </div>
  );
};

export default Home;
