import sendRequest from "../sendRequest";

export async function loginRequest(username: string, password: string) {
  return sendRequest("login", "POST", { username, password });
}