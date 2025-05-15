"use client";

import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/hooks/TodoHook";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TodosPage() {
  const { data: todos = [], isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (newTodo.trim()) {
      createTodo.mutate(newTodo);
      setNewTodo("");
    }
  };

  const handleToggle = (todo: any) => {
    updateTodo.mutate({
      id: todo._id,
      updates: { completed: !todo.completed },
    });
  };

  const startEditing = (todo: any) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      updateTodo.mutate({
        id,
        updates: { title: editText.trim() },
      });
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New todo"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="flex items-center gap-2 w-full">
                  <Checkbox
                    id={`todo-${todo._id}`}
                    checked={todo.completed}
                    onCheckedChange={() => handleToggle(todo)}
                  />
                  {editingId === todo._id ? (
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(todo._id)}
                      className="w-full"
                      autoFocus
                    />
                  ) : (
                    <label
                      htmlFor={`todo-${todo._id}`}
                      className={`cursor-pointer ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.title}
                    </label>
                  )}
                </div>

                <div className="flex gap-2 ml-2">
                  {editingId === todo._id ? (
                    <Button size="sm" onClick={() => saveEdit(todo._id)}>
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(todo)}
                    >
                      Edit
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(todo._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
