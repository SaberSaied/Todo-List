import "./App.css";
import { TodoForm } from "./components/TodoForm";
import Todos from "./components/Todos";
import { CheckSquare } from "lucide-react";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* App Header */}
        <header className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20">
            <CheckSquare className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Todo App</h1>
            <p className="text-xs text-slate-500">Organize your work & tasks seamlessly</p>
          </div>
        </header>

        {/* Add Todo Form */}
        <TodoForm />

        {/* Todo List & Category Filter */}
        <Todos />
      </div>
    </main>
  );
}

export default App;
