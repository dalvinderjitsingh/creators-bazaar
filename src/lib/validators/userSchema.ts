import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name can't be blank")
    .max(50, "Name can't be longer than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .refine(name => name.trim().length > 0, { message: "Name can't be blank" })
});
