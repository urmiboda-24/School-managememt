import Cookie from "js-cookie";

export const getAuthToken = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  return token;
};

export const Logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  Cookie.remove("authToken");
  Cookie.remove("role");
};

export const getUserRole = () => {
  const role =
    localStorage.getItem("role") || sessionStorage.getItem("role") || "";
  return role;
};

export const getUserLogo = () => {
  const profileImage = localStorage.getItem("profileImage") || "";
  return profileImage;
};

export const setUserLogo = (imgUrl: string) => {
  return localStorage.setItem("profileImage", imgUrl);
};

export const setUserName = (name: string) => {
  localStorage.setItem("name", name);
};

export const getUserName = () => {
  const name = localStorage.getItem("name");
  return name;
};
