export const TOKEN_KEY = "token";
export const USER_KEY = "user";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => {
 const user = localStorage.getItem(USER_KEY)
 console.dir(user)
  return localStorage.getItem(USER_KEY);
}
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};