import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Defines the visual styles for the main content area of the NoteCard.
 * Uses `cva` to create a set of variants that control the border and text color
 * based on the note's type (e.g., info, tip, warning).
 */
const noteCardVariants = cva(
  'relative flex w-full flex-row gap-4 rounded-xl border p-6 text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        info: 'border-blue-500/50 border-3 text-blue-700 dark:text-blue-400',
        tip: 'border-emerald-500/50 border-3 text-emerald-700 dark:text-emerald-400',
        warning:
          'border-amber-500/50 border-3 text-amber-700 dark:text-amber-400',
        danger: 'border-red-500/50 border-3 text-red-700 dark:text-red-400',
        quote:
          'border-neutral-500/50 border-3 text-neutral-700 dark:text-neutral-400',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

/**
 * Defines the visual styles for the accent element of the NoteCard.
 * This is intended to be a decorative element that sits behind the main content,
 * providing a subtle background color that matches the card's variant.
 */
const noteCardAccentVariants = cva('absolute inset-0 -z-10 rounded-xl', {
  variants: {
    variant: {
      info: 'bg-blue-500/50',
      tip: 'bg-emerald-500/50',
      warning: 'bg-amber-500/50',
      danger: 'bg-red-500/50',
      quote: 'bg-neutral-500/50',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * A container component that establishes a relative positioning context for its children,
 * typically `NoteCardContent` and `NoteCardAccent`. It controls the overall size and layout.
 */
const NoteCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative w-full max-w-md ', className)}
    {...props}
  />
));
NoteCard.displayName = 'NoteCard';

/**
 * A decorative accent component designed to be placed inside `NoteCard`.
 * It creates a visual background element that is offset from the main content card,
 * adding a sense of depth and style.
 */
const NoteCardAccent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof noteCardAccentVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      noteCardAccentVariants({ variant }),
      // DECISION: The accent is explicitly translated to create a consistent,
      // non-configurable offset shadow effect. This ensures a uniform look
      // across all instances of the NoteCard.
      'transition-transform translate-x-2 translate-y-2',
      className
    )}
    {...props}
  />
));
NoteCardAccent.displayName = 'NoteCardAccent';

interface NoteCardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noteCardVariants> {
  /**
   * An optional icon to be displayed at the start of the card content.
   * It's recommended to use an SVG element.
   */
  icon?: React.ReactNode;
}

/**
 * The main content container for the NoteCard. It applies the primary styling
 * based on the `variant` prop and arranges the optional icon and children.
 */
const NoteCardContent = React.forwardRef<HTMLDivElement, NoteCardContentProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(noteCardVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <div className='flex-shrink-0 [&>svg]:h-6 [&>svg]:w-6'>{icon}</div>
      )}
      <div className='flex-grow'>{children}</div>
    </div>
  )
);
NoteCardContent.displayName = 'NoteCardContent';

export { NoteCard, NoteCardAccent, NoteCardContent };
