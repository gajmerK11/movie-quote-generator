import { register, login } from "../services/authService";

export async function registerUser(req: Request): Promise<Response> {
  const { username, password } = (await req.json()) as {
    username: string;
    password: string;
  };
  const result = await register(username, password);
  return Response.json(result);
}

export async function loginUser(req: Request): Promise<Response> {
  const { username, password } = (await req.json()) as {
    username: string;
    password: string;
  };
  const result = await login(username, password);
  return Response.json(result);
}
