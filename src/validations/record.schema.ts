import { z } from "zod";

export const CATEGORIES = ["Food", "Utilities", "Transport", "Other"] as const;

export const recordSchema = z.object({
  text: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(100, "Description is too long"),

  price: z
    .number({ message: "Please enter a valid number" })
    .positive("Amount must be greater than 0")
    .max(1000000, "Amount exceeds limit"),

  category: z.string().min(1, "Please select a category"),

  date: z.string().min(1, "Please select a date"),
});

export type RecordFormValues = z.infer<typeof recordSchema>;
