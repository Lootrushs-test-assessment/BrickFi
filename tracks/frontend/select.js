function selectListings(catalog) {
  return catalog;
}

function render(listings) {
  document.querySelector("#listings").innerHTML = listings
    .map(
      (property) => `
        <article>
          <h2>${property.name}</h2>
          <p>${property.location}</p>
          <p class="note">${property.modeledIncomeNote || ""}</p>
        </article>
      `
    )
    .join("");
}

fetch("/catalog.json")
  .then((response) => response.json())
  .then((catalog) => render(selectListings(catalog)))
  .catch((error) => {
    document.querySelector("#listings").textContent = error.message;
  });
