import axios from "axios";
import { API_ROUTES } from "@/api/constant";
import { Todo } from "@/types/todoType";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

export const getTodos = async (): Promise<Todo[]> => {
  const res = await apiClient.get<Todo[]>(API_ROUTES.TODO);
  return res.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const res = await apiClient.post(API_ROUTES.TODO, { title });
  return res.data as Todo;
};

export const updateTodo = async (
  id: string,
  updates: Partial<Todo>
): Promise<Todo> => {
  const res = await apiClient.put(`${API_ROUTES.TODO}/${id}`, updates);
  return res.data as Todo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await apiClient.delete(`${API_ROUTES.TODO}/${id}`);
};
