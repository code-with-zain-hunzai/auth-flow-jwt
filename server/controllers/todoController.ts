import { Request, Response } from "express";
import Todo from "../model/TodoModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    console.log("Incoming request body:", req.body);
    console.log("Authenticated user:", req.user); 

    const { title } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const todo = await Todo.create({ title, user: userId });
    res.status(201).json(todo);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updated = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
