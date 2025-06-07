
import React from 'react';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { HomeCTA } from '@/components/home/HomeCTA';
import { HomeFooter } from '@/components/home/HomeFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <HomeNavigation />
      <HomeHero />
      <HomeFeatures />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
};

export default Home;
