/*
It is the 'bridge' between:
1. authRoutes.ts -> which receives the incoming HTTP request (like POST/auth/register), and
2. authService.ts -> which contains the core logic (like checking if the user exists, saving to DB, hashing passwords, etc.)

Basically, it maps routes to logic.
What does that mean?
It means:
1. The route (e.g. POST/register) is defined in authRoutes.ts.
2. That route is connected to a controller function (e.g. registerUser()).
3. The controller maps that route to the actual business logic in the authService.ts
*/

import { register, login } from "../services/authService";

// So here basically we are pulling out the username and password from the user's request which comes in as json and mapping those values to 'register' function present in 'authService.ts' to actually register the user.
// Thus, you can say all this function does is extract the values from user's request, send them to core business logic of registering the user and return response to the user.
export async function registerUser(req: Request): Promise<Response> {
  // console.log("Register request received");
  const { username, password } = (await req.json()) as {
    username: string;
    password: string;
  };
  const result = await register(username, password);
  return Response.json(result);
  // return Response.json({ message: "test working" });
}

export async function loginUser(req: Request): Promise<Response> {
  const { username, password } = (await req.json()) as {
    username: string;
    password: string;
  };
  const result = await login(username, password);
  return Response.json(result);
}
