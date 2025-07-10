import { registerUser, loginUser } from "../controllers/authController";

export const authRoutes = [
  {
    method: "POST",
    path: "/auth/register",
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: loginUser,
  },
];
