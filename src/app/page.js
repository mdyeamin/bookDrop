import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroSlider from '@/components/home/HeroSlider';
import React from 'react';

const Home = () => {
  return (
    <div>
      <HeroSlider/>
      <FeaturedBooks/>
    </div>
  );
};

export default Home;
