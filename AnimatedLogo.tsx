import { motion } from 'motion/react';
import logoImage from 'figma:asset/db0e6edb29581fa6a112fb65f66710377631e939.png';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-24 w-24',
  xl: 'h-32 w-32',
};

export function AnimatedLogo({ size = 'md', animate = true }: AnimatedLogoProps) {
  return (
    <motion.div
      className={`relative ${sizeMap[size]}`}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={animate ? {
        opacity: 1,
        scale: 1,
        rotate: 0,
      } : { opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      whileHover={animate ? {
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.3 }
      } : undefined}
    >
      <motion.img
        src={logoImage}
        alt="SKEET Logo"
        className="w-full h-full object-contain"
        animate={animate ? {
          filter: [
            'drop-shadow(0 0 0px rgba(0, 166, 166, 0))',
            'drop-shadow(0 0 8px rgba(0, 166, 166, 0.6))',
            'drop-shadow(0 0 12px rgba(242, 101, 34, 0.4))',
            'drop-shadow(0 0 8px rgba(0, 166, 166, 0.6))',
            'drop-shadow(0 0 0px rgba(0, 166, 166, 0))',
          ],
        } : undefined}
        transition={animate ? {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        } : undefined}
      />
      
      {/* Animated particles */}
      {animate && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00A6A6]"
            animate={{
              y: [-5, -15, -5],
              x: [0, 5, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#F26522]"
            animate={{
              y: [5, 15, 5],
              x: [0, -5, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}
    </motion.div>
  );
}
