import { processServerResponse } from "./api";
import { baseUrl } from "./constants";

const headers = {
  "Content-Type": "application/json",
};

export const signup = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerResponse);
};

export const signin = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
};

export const checkTokenValidity = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(processServerResponse);
};
