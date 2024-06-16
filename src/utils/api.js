const baseUrl = "http://localhost:3001";
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
      return items.sort((a, b) => b._id - a._id);
    });
}

function addItem(data) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  }).then(processServerResponse);
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: headers,
  }).then(processServerResponse);
}

export { getItems, addItem, deleteItem };
