import { motion, AnimatePresence } from 'framer-motion';
import { Memory, CATEGORY_LABELS } from '@/types/memory';
import { X, Calendar, Tag, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface MemoryDetailPanelProps {
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryDetailPanel({ memory, onClose }: MemoryDetailPanelProps) {
  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-screen w-full md:w-[480px] z-50 p-6 overflow-y-auto"
        >
          <Card className="bg-card/95 backdrop-blur-xl border-primary/20 shadow-2xl h-full flex flex-col">
            <div className="p-6 space-y-6 flex-1">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge 
                    className="mb-3"
                    style={{ 
                      backgroundColor: memory.color + '33',
                      color: memory.color,
                      borderColor: memory.color
                    }}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {CATEGORY_LABELS[memory.category]}
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {memory.title}
                  </h2>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {memory.date}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="shrink-0 hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Divider */}
              <div 
                className="h-px w-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${memory.color}66, transparent)`
                }}
              />

              {/* Image placeholder */}
              {memory.image ? (
                <div className="w-full aspect-video rounded-lg overflow-hidden border border-primary/20">
                  <img 
                    src={memory.image} 
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div 
                  className="w-full aspect-video rounded-lg flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(135deg, ${memory.color}11, ${memory.color}05)`,
                    borderColor: memory.color + '33'
                  }}
                >
                  <div 
                    className="text-6xl opacity-20"
                    style={{ color: memory.color }}
                  >
                    {memory.category === 'project' && '💻'}
                    {memory.category === 'achievement' && '🏆'}
                    {memory.category === 'travel' && '✈️'}
                    {memory.category === 'learning' && '📚'}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">About</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {memory.description}
                </p>
              </div>

              {/* Link */}
              {memory.link && (
                <Button
                  variant="outline"
                  className="w-full group border-primary/30 hover:border-primary hover:bg-primary/10"
                  asChild
                >
                  <a href={memory.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
            </div>

            {/* Footer */}
            <div 
              className="p-4 rounded-b-lg border-t"
              style={{
                background: `linear-gradient(to bottom, transparent, ${memory.color}08)`,
                borderColor: memory.color + '22'
              }}
            >
              <p className="text-xs text-muted-foreground text-center">
                Click and drag to explore more memories
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
