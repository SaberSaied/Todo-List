import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import type { CreateTodoInput, Category } from '../types/todo';
import { createTodoSchema } from '../schemas/todoSchema';
import { useTodoStore } from '../store/todoStore';
import { PlusCircle, Flame, Briefcase, User, ShoppingBag, HeartPulse, MoreHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { MicroExpander } from './satisui/micro-expander';
import { Rating } from './satisui/rating';
import { SlidingCapsule, type CapsuleOption } from './satisui/sliding-capsule-nav';

const categoryOptions: CapsuleOption<Category>[] = [
  { value: 'work', label: 'Work', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { value: 'personal', label: 'Personal', icon: <User className="w-3.5 h-3.5" /> },
  { value: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  { value: 'health', label: 'Health', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  { value: 'other', label: 'Other', icon: <MoreHorizontal className="w-3.5 h-3.5" /> },
];

export const TodoForm: React.FC = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      category: 'other',
    },
  });

  const selectedPriority = watch('priority');

  const priorityToRating = (p?: 'low' | 'medium' | 'high'): number => {
    switch (p) {
      case 'low':
        return 1;
      case 'medium':
        return 2;
      case 'high':
        return 3;
      default:
        return 2;
    }
  };

  const ratingToPriority = (val: number): 'low' | 'medium' | 'high' => {
    if (val <= 1) return 'low';
    if (val === 2) return 'medium';
    return 'high';
  };

  const onSubmit = (data: CreateTodoInput) => {
    addTodo(data);
    reset();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-indigo-500" />
          Add New Task
        </h2>
      </div>

      {/* Title Field using Input component */}
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title <span className="text-rose-500">*</span>
        </label>
        <Input
          id="title"
          type="text"
          placeholder="e.g. Finish quarterly report"
          aria-invalid={!!errors.title}
          {...register('title')}
          className="h-10 px-4 rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-500"
        />
        <AnimatePresence>
          {errors.title && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-rose-500 font-medium mt-1"
            >
              {errors.title.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Description Field */}
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Description (Optional)
        </label>
        <textarea
          id="description"
          rows={2}
          placeholder="Add details or context..."
          {...register('description')}
          className="w-full px-4 py-2 rounded-xl bg-transparent border border-input text-slate-900 dark:text-slate-100 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none transition-all resize-none md:text-sm"
        />
        <AnimatePresence>
          {errors.description && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-rose-500 font-medium mt-1"
            >
              {errors.description.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Priority Rating */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Priority Level
        </label>
        <div className="flex items-center gap-3 py-1">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Rating
                count={3}
                value={priorityToRating(field.value)}
                onValueChange={(val) => field.onChange(ratingToPriority(val))}
                icon={Flame}
                colors={{
                  fill: 'text-amber-500 fill-amber-500',
                  empty: 'text-slate-300 dark:text-slate-700',
                }}
                tooltips={['Low Priority', 'Medium Priority', 'High Priority']}
              />
            )}
          />
          <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {selectedPriority}
          </span>
        </div>
      </div>

      {/* Dynamic Category Selection using SlidingCapsule UI Component */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <SlidingCapsule<Category>
              options={categoryOptions}
              value={field.value ?? 'other'}
              onChange={field.onChange}
              layoutId="form-category-capsule"
            />
          )}
        />
      </div>

      {/* Submit Action using SatisUI MicroExpander Component */}
      <div className="flex justify-end pt-2">
        <MicroExpander
          type="submit"
          text="Add Task"
          icon={<PlusCircle className="h-5 w-5" />}
          isLoading={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 font-semibold shadow-lg shadow-indigo-500/25"
        />
      </div>
    </motion.form>
  );
};

export default TodoForm;
