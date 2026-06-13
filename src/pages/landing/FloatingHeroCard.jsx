import { motion } from 'framer-motion';

export default function FloatingHeroCard({
  customDelay,
  positionClass,
  floatDelay,
  icon,
  title
}) {
  // Perpetual floating micro-animation
  const cardFloatAnim = {
    animate: {
      y: [0, -3, 0],
      transition: {
        duration: 4,
        delay: floatDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      custom={customDelay}
      variants={{
        initial: { opacity: 0, scale: 0.9, y: 30 },
        animate: (delay) => ({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            delay,
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1]
          }
        }),
        hover: {
          scale: 1.05,
          y: -10,
          transition: { duration: 0.4, ease: "easeOut" }
        }
      }}
      initial="initial"
      animate="animate"
      whileHover="hover"
      drag
      dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
      dragElastic={0.7}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={`absolute ${positionClass} pointer-events-auto cursor-grab active:cursor-grabbing z-20`}
    >
      {/* Perpetual Float Wrapper */}
      <motion.div animate={cardFloatAnim.animate} className="relative">

        {/* The Card Container clips the snake runner to a clean 2px border track. */}
        <div className="floating-hero-border relative p-[2px] rounded-xl overflow-hidden z-10 w-full h-full">
          {/* Inner Content Card (perfectly sized to leave exactly 2px border) */}
          <div className="relative z-10 w-full bg-[#15102a]/95 backdrop-blur-xl p-[20px] rounded-[10px] flex items-center gap-3 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_28px_rgba(0,0,0,0.28)] whitespace-nowrap">
            {icon}
            <span className="font-headline text-[20px] font-medium text-white">{title}</span>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
