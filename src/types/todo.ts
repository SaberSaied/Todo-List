import { z } from 'zod';
import { todoSchema, createTodoSchema, PriorityEnum, CategoryEnum } from '../schemas/todoSchema';

/**
 * TypeScript type inferred directly from Zod schema for single source of truth runtime & compile-time safety.
 */
export type Todo = z.infer<typeof todoSchema>;

/**
 * Type representing input needed when creating a new Todo item.
 */
export type CreateTodoInput = z.infer<typeof createTodoSchema>;

/**
 * Re-export Priority and Category types for convenient access.
 */
export type Priority = z.infer<typeof PriorityEnum>;
export type Category = z.infer<typeof CategoryEnum>;
