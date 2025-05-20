// src/controllers/formController.ts
import { Request, Response } from "express";
import FormData from "../model/FormModel";

export const submitForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields manually    
    if (!firstName || !lastName || !email) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields: {
          firstName: !!firstName,
          lastName: !!lastName,
          email: !!email,
        },
      });
      return;
    }

    const formData = await FormData.create({
      firstName,
      lastName,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      data: formData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error submitting form",
      error: error.message,
    });
  }
};