import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroSlider from '@/components/home/HeroSlider';
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
    </div>
  );
};

export default Home;
