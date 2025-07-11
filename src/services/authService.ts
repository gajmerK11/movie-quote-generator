import { db } from "../db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Here ! is used because ! tells TypeScript "this value is definitely not null or undefined". Without it, TypeScript will complain because it thinks JWT_SECRET might be undefined and cause runtime errors.
const JWT_SECRET = process.env.JWT_SECRET!;

// Register function
export async function register(username: string, password: string) {
  console.log("Checking if user exists...");

  // Defines an async function to register a new user
  const exists = await db
    .selectFrom("users")
    .select("id")
    .where("username", "=", username)
    .executeTakeFirst();

  console.log("Query completed");

  // Checks if a user with the given username already exists in the database. If the user exists, returns an error.
  if (exists) return { error: "User already exists" };

  // Hashes the password securely using bcrypt. Here number 10 is the "salt rounds" or "cost factor" which tells the bcrypt how many times to process the password. So, 10 means bcrypt will hash the password with 10 rounds of processing to make it harder to crack.
  const hashed = await bcrypt.hash(password, 10);

  // Inserts the new user with the hashed password into the database.
  await db.insertInto("users").values({ username, password: hashed }).execute();

  // Returns a success message if registration is complete.
  return { success: true };
}

// Login function
export async function login(username: string, password: string) {
  // Defines an async function to log in a user.
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirst();

  // Looks up the user by username in the database. If the user does not exist, returns an error.
  if (!user) return { error: "User not found" };

  // Compares the provided password with the hashed password in the database.
  const match = await bcrypt.compare(password, user.password);

  // If the password does not match, returns an error.
  if (!match) return { error: "Invalid password" };

  // Creates a JWT token containing the user’s id and username, valid for 1 hour.
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // Returns the token if login is successful.
  return { token };
}
