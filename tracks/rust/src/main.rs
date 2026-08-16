use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::process;

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct Property {
    id: i64,
    slug: String,
    name: String,
    location: String,
    city: String,
    country: String,
    #[serde(rename = "type")]
    property_type: String,
    status: String,
    featured: bool,
    token_symbol: String,
    occupancy_percent: i64,
    description: String,
    image: String,
    sqft: i64,
    beds: i64,
    baths: i64,
    year_built: i64,
    yield_percent: f64,
    amenities: Vec<String>,
    #[serde(default, skip_serializing_if = "String::is_empty")]
    modeled_income_note: String,
}

fn select_listings(catalog: Vec<Property>) -> Vec<Property> {
    catalog
}

fn main() {
    let raw = fs::read_to_string(find_catalog()).unwrap_or_else(|error| {
        eprintln!("{error}");
        process::exit(1);
    });
    let catalog: Vec<Property> = serde_json::from_str(&raw).unwrap_or_else(|error| {
        eprintln!("{error}");
        process::exit(1);
    });
    let out = serde_json::to_string_pretty(&select_listings(catalog)).unwrap_or_else(|error| {
        eprintln!("{error}");
        process::exit(1);
    });
    println!("{out}");
}

fn find_catalog() -> PathBuf {
    let paths = [
        PathBuf::from("../catalog.json"),
        PathBuf::from("catalog.json"),
        PathBuf::from("tracks/catalog.json"),
    ];
    for path in &paths {
        if path.exists() {
            return path.clone();
        }
    }
    PathBuf::from("../catalog.json")
}
