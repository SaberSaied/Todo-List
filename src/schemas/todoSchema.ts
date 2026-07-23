import { z } from 'zod';

/**
 * Todo Priority levels
 */
export const PriorityEnum = z.enum(['low', 'medium', 'high']);


/**
 * Todo Category choices
 */
export const CategoryEnum = z.enum(['work', 'personal', 'shopping', 'health', 'other']);

/**
 * Zod schema for validating a Todo item.
 * Guarantees runtime data validation for input/updates.
 */
export const todoSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID format for id' }),
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(120, { message: 'Title cannot exceed 120 characters' }),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  priority: PriorityEnum.default('medium'),
  category: CategoryEnum.default('other'),
  dueDate: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * Zod schema for creating a new Todo (omits server/system generated fields).
 */
export const createTodoSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial({
  completed: true,
  priority: true,
  category: true,
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
