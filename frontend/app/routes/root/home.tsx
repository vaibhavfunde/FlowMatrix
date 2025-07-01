// import React from 'react';
// import type { Route } from "./+types/home";
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "taskHub" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

// function Homepage() {
//   return (
//     <div className='w-full h-screen flex items-center justify-center gap-4'>
//       <Link to="/sign-in">
//         <Button className='bg-blue-500 text-white'>Sign In</Button>
//       </Link>
//       <Link to="/sign-up">
//         <Button variant={'outline'} className='bg-blue-500 text-white'>Sign Up</Button>
//       </Link>
//     </div>
//   );
// }

// export default Homepage;


import React from 'react';
import type { Route } from "./+types/home";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
//import { HeroSection } from '@/components/landing-page/components/ui/hero-section';
// import App from '@/components/landing-page/App';
// import Index from '@/components/landing-page/pages/Index';
//import { HeroSection } from '@/components/ui/hero-section';

//mport { HeroSection } from '@/components/landing-page/src/components/ui/hero-section';
//import App from "../components/landing-page/App";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "taskHub" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// function Homepage() {
//   return (
//     <div className="min-h-screen bg-white ">
    
//       <HeroSection />
//       <Index></Index>
//     </div>
//   );
// }

// export default Homepage;



 import { HeroSection } from "@/components/landing/hero/HeroSection";
// import { FeaturesSection } from "@/components/landing/sections/FeaturesSection";
// import { AboutSection } from "@/components/landing/sections/AboutSection";
import { CTASection } from "@/components/landing/sections/CTASection";
// import { ContactSection } from "@/components/landing/sections/ContactSectin";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { ContactSection } from '@/components/landing/sections/ContactSection';
import { AboutSection } from '@/components/landing/sections/AboutSection';
import { FeaturesSection } from '@/components/landing/sections/FeaturesSection';

const Homepage = () => {
  return (
    <div className="h-full bg-white min-w-0">
       <div className=''>
       <HeroSection />
       </div>
      
      
     
      <FeaturesSection />
      <AboutSection />
      {/* <CTASection /> */}
      <CTASection />
      {/* <ContactSection /> */}
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Homepage;

