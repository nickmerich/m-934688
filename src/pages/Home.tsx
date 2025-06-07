
import React from 'react';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { HomeTestimonials } from '@/components/home/HomeTestimonials';
import { HomePricing } from '@/components/home/HomePricing';
import { HomeCTA } from '@/components/home/HomeCTA';
import { HomeFooter } from '@/components/home/HomeFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-white no-gradients">
      <HomeNavigation />
      <HomeHero />
      <HomeFeatures />
      <HomeTestimonials />
      <HomePricing />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
};

export default Home;
