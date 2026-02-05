import { z } from "zod";

export const signupSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),

        email: z.string().email("Invalid email address"),

        pass: z.string().min(8, "Password must be at least 8 characters"),

        cpass: z.string(),

        phone: z
            .string()
            .regex(/^01[0-9]{9}$/, "Invalid phone number"),

        DOB: z.string().nonempty("Date of birth is required"),

        gender: z.enum(["male", "female"], {
            message: "Gender is required",
        }),

        address: z.string().min(5, "Address must be at least 5 characters"),
    })
    .refine((data) => data.pass === data.cpass, {
        message: "Passwords do not match",
        path: ["cpass"],
    });

