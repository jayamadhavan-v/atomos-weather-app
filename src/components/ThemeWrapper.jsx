import { motion, AnimatePresence } from 'framer-motion';
import {
  FogEffect,
  LightningEffect,
  RainEffect,
  SnowEffect,
  SunnyParticles,
  WindEffect,
} from '../animations';
import { useWeatherStore } from '../store/useWeatherStore';

const particleEffects = {
  FogEffect,
  LightningEffect,
  RainEffect,
  SnowEffect,
  SunnyParticles,
  WindEffect,
};

export function ThemeWrapper({ children }) {
  const theme = useWeatherStore((state) => state.theme);
  const backgroundClass = theme?.colors?.background || 'bg-[#020412]';
  const overlayClass = theme?.overlay || 'bg-black/20';
  const ParticleEffect = particleEffects[theme?.particles] || null;

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-700 ${backgroundClass}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme?.id || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${overlayClass}`}
        />
      </AnimatePresence>

      {ParticleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <ParticleEffect />
        </div>
      )}

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex-grow flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
