import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import z from "zod";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(8).max(20),
    }),
  ),
  async (context) => {
    const { name, email, password } = context.req.valid("json");
    const hashedPassword = await bcrypt.hash(password, 12);

    // checking if the email already exist in the database
    const query = await db.select().from(users).where(eq(users.email, email));
    if (query[0]) {
      return context.json({ error: "Email already in use!" }, 400);
    }

    // adding new user in the database with the hashed password
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return context.json(null, 200);
  },
);

export default app;
