import { baseUrl } from "./constants";

const headers = {
  "Content-Type": "application/json",
};

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(processServerResponse)
    .then((items) => {
      return items;
    });
}

function addItem(data, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  }).then(processServerResponse);
}

function deleteItem(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(processServerResponse);
}

function editUser(data, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  }).then(processServerResponse);
}

function addCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(processServerResponse);
}

function removeCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(processServerResponse);
}

export {
  getItems,
  addItem,
  deleteItem,
  editUser,
  addCardLike,
  removeCardLike,
  processServerResponse,
};
