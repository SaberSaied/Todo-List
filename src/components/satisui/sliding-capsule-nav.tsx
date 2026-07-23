import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface CapsuleOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SlidingCapsuleProps<T extends string = string> {
  /** Array of option items to render inside the capsule nav */
  options: CapsuleOption<T>[];
  /** Currently selected option value */
  value: T;
  /** Callback fired when an option is selected */
  onChange: (value: T) => void;
  /** Optional container class name */
  className?: string;
  /** Class name for the active highlight background capsule */
  activeClassName?: string;
  /** Class name for individual option buttons */
  optionClassName?: string;
  /** Unique layout ID for motion layout animations when multiple instances exist */
  layoutId?: string;
}

export function SlidingCapsule<T extends string = string>({
  options,
  value,
  onChange,
  className,
  activeClassName,
  optionClassName,
  layoutId = 'sliding-capsule-nav',
}: SlidingCapsuleProps<T>) {
  const [hoveredOption, setHoveredOption] = React.useState<T | null>(null);

  return (
    <div
      className={cn(
        'relative flex flex-wrap items-center gap-1 rounded-2xl border border-input bg-transparent p-1 shadow-xs',
        className,
      )}
      onMouseLeave={() => setHoveredOption(null)}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        const isHovered = hoveredOption === option.value;
        const shouldShowGhost = isHovered || (!hoveredOption && isActive);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            onMouseEnter={() => setHoveredOption(option.value)}
            className={cn(
              'relative flex flex-1 min-w-[60px] items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer select-none',
              'rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'text-primary-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground',
              optionClassName,
            )}
            aria-pressed={isActive}
          >
            {/* Layer 1: Active Capsule Background */}
            {isActive && (
              <motion.div
                layoutId={`${layoutId}-active`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className={cn(
                  'absolute inset-0 z-10 rounded-xl bg-primary shadow-xs',
                  activeClassName,
                )}
              />
            )}

            {/* Layer 2: Hover/Focus Ghost Background */}
            {shouldShowGhost && (
              <motion.div
                layoutId={`${layoutId}-ghost`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                className="absolute inset-0 z-0 rounded-xl bg-muted/80 dark:bg-slate-800/60"
              />
            )}

            {/* Content (Z-Index above capsules) */}
            <span className="relative z-20 flex items-center gap-1.5 capitalize">
              {option.icon}
              {typeof option.label === 'string' ? <span>{option.label}</span> : option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
