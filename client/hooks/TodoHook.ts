import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodos as getTodosApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "@/services/todoService";
import { Todo } from "@/types/todoType";

export const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodosApi,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => createTodoApi(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
      updateTodoApi(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
