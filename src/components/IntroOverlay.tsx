import { motion } from 'framer-motion';
import { MousePointer2, Navigation } from 'lucide-react';
import { Button } from './ui/button';

interface IntroOverlayProps {
  onDismiss: () => void;
}

export function IntroOverlay({ onDismiss }: IntroOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto px-6 text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
            Memory Corridor
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            A journey through time and achievement
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg bg-card/50 backdrop-blur border border-primary/20"
          >
            <MousePointer2 className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Interact</h3>
            <p className="text-sm text-muted-foreground">
              Click on any glowing memory stone to explore details, images, and links
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-lg bg-card/50 backdrop-blur border border-primary/20"
          >
            <Navigation className="w-8 h-8 text-accent mb-3" />
            <h3 className="text-lg font-semibold mb-2">Navigate</h3>
            <p className="text-sm text-muted-foreground">
              Drag to rotate, scroll to zoom, and explore the corridor at your own pace
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onDismiss}
            size="lg"
            className="text-lg px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Enter the Corridor
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground"
        >
          Each stone represents a milestone — project, achievement, travel, or learning
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
