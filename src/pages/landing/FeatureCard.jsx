import { motion } from 'framer-motion';

function FeatureCard({ icon, title, description }) {
    const cardVariants = {
        hidden: {
            opacity: 0,
            x: 100,
        },
        
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };


    return (
        <motion.div
            variants={cardVariants}
            className="relative h-full group"
        >
            <div
                className="h-full"
            >
                <div className="relative z-10 h-full w-full bg-surface-container-lowest/95 backdrop-blur-xl p-container-padding rounded-[14px] flex flex-col justify-between transition-colors duration-300 group-hover:bg-surface-container-lowest/80 border border-white/5 group-hover:border-white/10">
                    <div>
                        <div className="mb-4 transition-transform duration-300">
                            {icon}
                        </div>
                        <h3 className="font-headline text-[24px] font-medium mb-2 text-primary-fixed-dim transition-colors duration-300 group-hover:text-white">{title}</h3>
                        <p className="text-on-surface-variant font-body transition-colors duration-300 group-hover:text-on-surface">{description}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


export default FeatureCard;
