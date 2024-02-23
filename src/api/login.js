import request from "@/config/axios";

export function login(payload) {
  return request({
    url: "auth/sign-in",
    method: "post",
    data: payload
  });
}
export function decreptBranch(payload) {
  const formData = new FormData();
  formData.append("Encryption", payload)
  return request({
    url: "branch/decrypt-branch",
    method: "put",
    data: formData
  });
}
export function logout() {
  return request({
    url: "logout",
    method: "post"
  });
}
export function userInfo() {
  return request({
    url: "current-user",
    method: "get"
  });
}
