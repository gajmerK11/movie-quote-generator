import { authRoutes } from "./routes/authRoutes";

// Starts a new server using Bun, listening on port 3000.
const server = Bun.serve({
  port: 3000,

  // For every incoming HTTP request, this function runs. It parses the request URL.
  fetch: async (req: Request) => {
    const url = new URL(req.url);

    // Looks for a matching route in your authRoutes array, checking if both the HTTP method (GET, POST, etc.) and the path (like /register) match the request.
    const route = authRoutes.find(
      (r) => r.method === req.method && r.path === url.pathname
    );

    // If no matching route is found, returns a 404 Not Found response.
    if (!route) {
      return new Response("Not Found", { status: 404 });
    }

    // If a matching route is found, calls its handler function (which will process the request, like registering or logging in a user).
    return await route.handler(req);
  },
});

// Prints a message to the console showing the server is running and on which port.
console.log(`🚀 Server is running on http://localhost:${server.port}`);

/*
Summary of Flow
1. Server starts on port 3000.
2. Any incoming request goes to the fetch() function.
3. It checks if the route exists in authRoutes.
4. If not found → returns 404.
5. If found → calls the route's handler and returns its result.
*/
