#include "json.hpp"

#include <fstream>
#include <iostream>
#include <string>
#include <vector>

using json = nlohmann::json;

struct Property {
    int id = 0;
    std::string slug;
    std::string name;
    std::string location;
    std::string city;
    std::string country;
    std::string type;
    std::string status;
    bool featured = false;
    std::string tokenSymbol;
    int occupancyPercent = 0;
    std::string description;
    std::string image;
    int sqft = 0;
    int beds = 0;
    int baths = 0;
    int yearBuilt = 0;
    double yieldPercent = 0;
    std::vector<std::string> amenities;
    std::string modeledIncomeNote;
};

void from_json(const json& j, Property& property) {
    j.at("id").get_to(property.id);
    j.at("slug").get_to(property.slug);
    j.at("name").get_to(property.name);
    j.at("location").get_to(property.location);
    j.at("city").get_to(property.city);
    j.at("country").get_to(property.country);
    j.at("type").get_to(property.type);
    j.at("status").get_to(property.status);
    j.at("featured").get_to(property.featured);
    j.at("tokenSymbol").get_to(property.tokenSymbol);
    j.at("occupancyPercent").get_to(property.occupancyPercent);
    j.at("description").get_to(property.description);
    j.at("image").get_to(property.image);
    j.at("sqft").get_to(property.sqft);
    j.at("beds").get_to(property.beds);
    j.at("baths").get_to(property.baths);
    j.at("yearBuilt").get_to(property.yearBuilt);
    j.at("yieldPercent").get_to(property.yieldPercent);
    j.at("amenities").get_to(property.amenities);
    if (j.contains("modeledIncomeNote")) {
        j.at("modeledIncomeNote").get_to(property.modeledIncomeNote);
    }
}

void to_json(json& j, const Property& property) {
    j = json{
        {"id", property.id},
        {"slug", property.slug},
        {"name", property.name},
        {"location", property.location},
        {"city", property.city},
        {"country", property.country},
        {"type", property.type},
        {"status", property.status},
        {"featured", property.featured},
        {"tokenSymbol", property.tokenSymbol},
        {"occupancyPercent", property.occupancyPercent},
        {"description", property.description},
        {"image", property.image},
        {"sqft", property.sqft},
        {"beds", property.beds},
        {"baths", property.baths},
        {"yearBuilt", property.yearBuilt},
        {"yieldPercent", property.yieldPercent},
        {"amenities", property.amenities},
    };
    if (!property.modeledIncomeNote.empty()) {
        j["modeledIncomeNote"] = property.modeledIncomeNote;
    }
}

std::vector<Property> selectListings(std::vector<Property> catalog) {
    return catalog;
}

std::string findCatalog() {
    const char* paths[] = {"../catalog.json", "catalog.json", "tracks/catalog.json"};
    for (const char* path : paths) {
        std::ifstream input(path);
        if (input.good()) {
            return path;
        }
    }
    return "../catalog.json";
}

int main() {
    std::ifstream input(findCatalog());
    if (!input) {
        std::cerr << "catalog.json not found\n";
        return 1;
    }

    json data;
    input >> data;
    std::vector<Property> catalog = data.get<std::vector<Property>>();
    std::cout << json(selectListings(std::move(catalog))).dump(2) << "\n";
    return 0;
}
