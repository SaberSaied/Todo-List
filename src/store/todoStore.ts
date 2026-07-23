import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Todo, CreateTodoInput } from '../types/todo';

interface TodoState {
    // State
    todos: Todo[];

    // Actions
    addTodo: (input: CreateTodoInput) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

// Initial demo items to populate store on first-ever launch
const initialTodos: Todo[] = [
    {
        id: '11111111-1111-4111-8111-111111111111',
        title: 'Explore Zustand Store Architecture',
        description: 'Understand state management and immutable functional updates.',
        completed: true,
        priority: 'high',
        category: 'work',
        dueDate: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '22222222-2222-4222-8222-222222222222',
        title: 'Design initial Todo components',
        description: 'Build UI components based on single source of truth Zustand store.',
        completed: false,
        priority: 'medium',
        category: 'personal',
        dueDate: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            // Initial state
            todos: initialTodos,

            // Add Todo (Immutable addition)
            addTodo: (input: CreateTodoInput) => {
                const now = new Date().toISOString();
                const newTodo: Todo = {
                    id: crypto.randomUUID(),
                    title: input.title,
                    description: input.description,
                    completed: input.completed ?? false,
                    priority: input.priority ?? 'medium',
                    category: input.category ?? 'other',
                    dueDate: input.dueDate ?? null,
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    todos: [newTodo, ...state.todos],
                }));
            },

            // Delete Todo (Immutable filtering)
            deleteTodo: (id: string) => {
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                }));
            },

            // Toggle Todo (Immutable mapping)
            toggleTodo: (id: string) => {
                const now = new Date().toISOString();
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, completed: !todo.completed, updatedAt: now }
                            : todo
                    ),
                }));
            },
        }),
        {
            name: 'todo-app-storage', // Key in localStorage
            storage: createJSONStorage(() => localStorage), // Explicitly using localStorage
            partialize: (state) => ({ todos: state.todos }), // Persist only the todos state, excluding functions
        }
    )
);
