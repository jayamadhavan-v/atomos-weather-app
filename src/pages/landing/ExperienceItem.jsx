import { motion } from 'framer-motion';

export default function ExperienceItem({ icon, label, borderColor }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-3 p-4 glass-card rounded-lg border-l-4 ${borderColor} cursor-default`}
    >
      {icon}
      <span className="font-bold font-body">{label}</span>
    </motion.div>
  );
}