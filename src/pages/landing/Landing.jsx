import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Globe,
  Palette,
  Layers,
  Radar,
  Clock,
  Calendar,
  Compass,
  PenTool,
  Monitor,
  Sun,
  CloudRain,
  Snowflake,
  CloudLightning,
  Cloud
} from 'lucide-react';
import { motion } from 'framer-motion';
import climateEarthGif from '../../assets/Climate Change Earth GIF.gif';
import FloatingHeroCard from './FloatingHeroCard';
import ExperienceItem from './ExperienceItem';
import FeatureCard from './FeatureCard';

export default function Landing() {
  // Premium animation presets
  const premiumTransition = {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1]
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: premiumTransition
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const floatingCardMotion = {
    initial: { opacity: 0, scale: 0.9 },
    animate: (delay) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      y: -10,
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Gentle perpetual float animation for hero cards
  const floatAnim = {
    animate: {
      y: [0, -3, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const constraintsRef = React.useRef(null);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#020412]">
      
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex flex-col items-center justify-center px-margin text-center pt-24 overflow-visible bg-[#020412]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-headline text-[72px] leading-[1.1] tracking-[-0.02em] font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary mb-6"
          >
            Explore Weather Beyond Forecasts
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-body text-[18px] text-on-surface-variant mb-10 max-w-2xl mx-auto"
          >
            Atmos is an immersive weather exploration platform delivering real-time climate intelligence through cinematic visualizations and dynamic atmospheric data.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-gutter justify-center items-center"
          >
            <Link to="/dashboard" className="px-10 py-4 rounded-full bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary-container font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1">
              Enter Atmos
            </Link>
            <Link to="/maps" className="px-10 py-4 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-on-surface font-bold text-lg hover:bg-white/10 transition-all">
              Explore the Globel
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Hero Cards with perpetual motion and drag interaction */}
        <div ref={constraintsRef} className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible">
          {/* Real-Time Forecasts Card */}
          <FloatingHeroCard
            customDelay={0.8}
            positionClass="top-[20%] left-[10%]"
            floatDelay={0}
            icon={<Zap className="text-[#00eefc]" size={24} />}
            title="Real-Time Forecasts"
          />

          {/* Global Exploration Card */}
          <FloatingHeroCard
            customDelay={1}
            positionClass="top-[15%] right-[10%]"
            floatDelay={0.5}
            icon={<Globe className="text-[#aa73ff]" size={24} />}
            title="Global Exploration"
          />

          {/* Dynamic Themes Card */}
          <FloatingHeroCard
            customDelay={1.2}
            positionClass="bottom-[20%] left-[15%]"
            floatDelay={1}
            icon={<Palette className="text-[#00ffaa]" size={24} />}
            title="Dynamic Themes"
          />

          {/* Motion Experience Card */}
          <FloatingHeroCard
            customDelay={1.4}
            positionClass="bottom-[25%] right-[15%]"
            floatDelay={1.5}
            icon={<Layers className="text-[#ff0055]" size={24} />}
            title="Motion Experience"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-margin bg-[#020412]">
        <div className="max-w-[1440px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={premiumTransition}
          className="font-headline text-[40px] font-semibold text-center mb-16 text-secondary"
        >
          Platform Features
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
        >
          <FeatureCard
            icon={<Radar className="text-primary mb-4 " size={40} />}
            title="Real-Time Forecasts"
            description="Instant hyper-local data updates processed with millisecond latency for total accuracy."
          />
          <FeatureCard
            icon={<Clock className="text-secondary mb-4 " size={40} />}
            title="Hourly Updates"
            description="Drill down into precise weather patterns for the next 24 hours with intuitive visuals."
          />
          <FeatureCard
            icon={<Calendar className="text-tertiary mb-4 " size={40} />}
            title="7-Day Forecast"
            description="Extended long-range climate modeling powered by neural atmospheric simulations."
          />
          <FeatureCard
            icon={<Compass className="text-primary mb-4 " size={40} />}
            title="Interactive Exploration"
            description="Freely navigate a cinematic 3D globe with real-time particle effects for wind and precipitation."
          />
          <FeatureCard
            icon={<PenTool className="text-secondary mb-4 " size={40} />}
            title="Dynamic Themes"
            description="Interface colors and elements adapt beautifully to the current conditions of your location."
          />
          <FeatureCard
            icon={<Monitor className="text-tertiary mb-4 " size={40} />}
            title="Responsive Experience"
            description="Seamless fluid design that provides a premium desktop cockpit or a powerful mobile tool."
          />
        </motion.div>
        </div>
      </section>

      {/* Atmospheric Experience Section */}
      <section className="py-24 overflow-hidden bg-[#020412]">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-margin">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={premiumTransition}
            >
              <h2 className="font-headline text-[40px] font-semibold mb-6 text-on-surface">The Atmospheric Experience</h2>
              <p className="font-body text-[18px] text-on-surface-variant mb-8 leading-relaxed">
                Every glance at Atmos is a visual narrative. Our dynamic theme engine recalculates the UI's visual DNA based on the climate data, shifting the atmosphere of the platform to match the reality of the sky.
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-gutter"
              >
                <ExperienceItem icon={<Sun className="text-yellow-400" size={20} />} label="Sunny Gold" borderColor="border-yellow-400" />
                <ExperienceItem icon={<CloudRain className="text-blue-400" size={20} />} label="Rainy Indigo" borderColor="border-blue-400" />
                <ExperienceItem icon={<Snowflake className="text-white" size={20} />} label="Snow Crystal" borderColor="border-white" />
                <ExperienceItem icon={<CloudLightning className="text-purple-500" size={20} />} label="Storm Electric" borderColor="border-purple-500" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ ...premiumTransition, duration: 1.5 }}
              className="relative"
            >
              {/* Climate change earth GIF */}
              <div className="relative mx-auto mt-12 w-full max-w-[560px] aspect-square rounded-full overflow-hidden bg-[#101b2d]">
                <img
                  src={climateEarthGif}
                  alt="Climate change Earth"
                  className="relative z-10 w-full h-full translate-x-[2%] scale-[1.18] rounded-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-margin text-center relative overflow-hidden bg-[#020412]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={premiumTransition}
          className="relative z-10 max-w-2xl mx-auto glass-card p-margin rounded-3xl shadow-[0_0_30px_rgba(170,115,255,0.12)] border-white/10"
        >
          <h2 className="font-headline text-[40px] font-semibold mb-4 text-white">Start Exploring Weather</h2>
          <p className="font-body text-on-surface-variant mb-10">Join the future of climate intelligence and experience a deeper connection with our world's atmosphere.</p>
          <Link to="/dashboard" className="px-12 py-5 rounded-full bg-secondary-container text-on-secondary-container font-extrabold text-xl hover:bg-white transition-all transform hover:scale-105 shadow-xl inline-block">
            Experience Atmos
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
