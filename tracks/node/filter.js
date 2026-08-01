const fs = require("fs");
const path = require("path");

function selectListings(catalog) {
  return catalog;
}

function findCatalog() {
  const paths = [
    path.join(__dirname, "..", "catalog.json"),
    path.join(process.cwd(), "catalog.json"),
    path.join(process.cwd(), "tracks", "catalog.json"),
  ];
  return paths.find((file) => fs.existsSync(file)) || paths[0];
}

const catalog = JSON.parse(fs.readFileSync(findCatalog(), "utf8"));
console.log(JSON.stringify(selectListings(catalog), null, 2));
