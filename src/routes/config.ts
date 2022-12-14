const routes: Record<string, string> = {
  LOGIN: "/login",
  LOGOUT: "/logout/:username",
  REGISTER: "/register",
  TOKEN: "/token",
  USER_DETAILS: "/users/:id",
  USERS: "/users",
  LOSTS: "/losts",
  LOST_DETAILS: "lost/:id",
  FOUND: "/found",
  FOUND_DETAILS: "found/:id",
};

export default routes;
