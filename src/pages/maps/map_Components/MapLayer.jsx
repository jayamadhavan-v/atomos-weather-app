import {motion } from "framer-motion";
import useMapStore from "../../../store/useMapStore";
import {
  ThermometerSun,
  Wind,
  Cloud,
  CloudHail,
  WindArrowDown,
} from "lucide-react";

const MapLayer = () => {
  const { selectedLayer, setSelectedLayer } = useMapStore();

  const weatherLayer = [
    {
      label: "Temperature",
      value: "temp_new",
      icon: ThermometerSun,
    },
    {
      label: "Wind",
      value: "wind_new",
      icon: Wind,
    },
    {
      label: "Rain",
      value: "precipitation_new",
      icon: CloudHail,
    },
    {
      label: "Clouds",
      value: "clouds_new",
      icon: Cloud,
    },
    {
      label: "Pressure",
      value: "pressure_new",
      icon: WindArrowDown,
    },
  ];

  const selectedStyle =
    "my-1 bg-blue-500 text-white px-3 py-3 rounded-full font-medium cursor-pointer flex items-center justify-center transition-transform ";

  const notSelectedStyle =
    "my-1 bg-gray-700 px-3 py-3 rounded-full font-medium cursor-pointer flex items-center justify-center transition-transform ";

 const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    rotate: 8,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 20,
    },
  },
};


  return (
    <motion.div
      className="absolute top-2 right-4 z-[1000] flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {weatherLayer.map((layer) => {
        const Icon = layer.icon;

        return (
          <motion.button
            key={layer.value}
            variants={itemVariants}
            whileHover={{
              scale: 1.12,
              transition: {
                duration: 0.2,
              },
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setSelectedLayer(layer.value)}
            className={
              selectedLayer === layer.value
                ? selectedStyle
                : notSelectedStyle
            }
          >
            <Icon size={18} />
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default MapLayer;