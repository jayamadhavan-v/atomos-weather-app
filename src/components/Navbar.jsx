import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/favicons.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 9,
      },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeIn",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const menuLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 bg-transparent flex justify-center pointer-events-none">
      <motion.div
        className="flex justify-between items-center w-full px-margin max-w-[1440px] relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Link to="/" className="flex items-center gap-3 glass-panel px-5 py-2.5 pointer-events-auto group hover:bg-white/10 transition-all bg-atmos-balck ">
            <img src={Logo} alt="Atmos Logo" width="40" height="40" />
            <span className="font-headline text-[24px] font-bold text-secondary dark:text-secondary-fixed tracking-tighter">atmos</span>
          </Link>
        </motion.div>

        <div className='flex items-center gap-3'>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="hidden md:flex">
            <div className="flex items-center gap-8 glass-panel px-8 py-3 pointer-events-auto border-white/5">
              <Link to="/dashboard" className="font-body text-[16px] text-on-surface hover:text-secondary transition-all duration-300 font-medium">Dashboard</Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="hidden md:flex">
            <div className="flex items-center gap-8 glass-panel px-8 py-3 pointer-events-auto border-white/5">
              <Link to="/maps" className="font-body text-[16px] text-on-surface hover:text-secondary transition-all duration-300 font-medium">Map</Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="glass-panel py-1 px-2 pointer-events-auto h-11 flex items-center rounded-xl hover:bg-white/10 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full mt-4 left-margin right-margin flex flex-col gap-3 items-center md:hidden pointer-events-auto"
            >
              <MobileNavItem
                to="/dashboard"
                label="Dashboard"
                onClick={() => setIsOpen(false)}
                variants={menuLinkVariants}
              />
              <MobileNavItem
                to="/maps"
                label="Map"
                onClick={() => setIsOpen(false)}
                variants={menuLinkVariants}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

function MobileNavItem({ to, label, onClick, variants }) {
  return (
    <motion.div variants={variants} whileHover={{ scale: 1.02 }} className="w-full">
      <Link
        to={to}
        onClick={onClick}
        className="glass-panel w-full text-center py-4 block font-body text-[18px] text-on-surface hover:text-secondary hover:bg-white/5 transition-all border-white/10 shadow-lg backdrop-blur-3xl"
      >
        {label}
      </Link>
    </motion.div>
  );
}
