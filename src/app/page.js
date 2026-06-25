import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroSlider from '@/components/home/HeroSlider';
import TopProviders from '@/components/home/TopProviders';
import React from 'react';

const Home = () => {

  
  return (
    <div>
      <HeroSlider/>
      <FeaturedBooks/>
      <TopProviders/>
    </div>
  );
};

export default Home;
