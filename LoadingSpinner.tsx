import { motion } from 'motion/react';
import logoImage from 'figma:asset/db0e6edb29581fa6a112fb65f66710377631e939.png';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const sizeMap = {
  sm: 'h-12 w-12',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
};

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Rotating ring */}
        <motion.div
          className={`${sizeMap[size]} rounded-full border-4 border-transparent border-t-[#00A6A6] border-r-[#F26522]`}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Pulsing logo in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src={logoImage}
            alt="Loading..."
            className="w-3/4 h-3/4 object-contain"
          />
        </motion.div>

        {/* Orbiting particles */}
        <motion.div
          className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#00A6A6]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: `0 ${sizeMap[size].includes('12') ? '24px' : sizeMap[size].includes('24') ? '48px' : '64px'}`,
          }}
        />
        <motion.div
          className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#F26522]"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: `0 ${sizeMap[size].includes('12') ? '24px' : sizeMap[size].includes('24') ? '48px' : '64px'}`,
          }}
        />
      </div>

      {message && (
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
