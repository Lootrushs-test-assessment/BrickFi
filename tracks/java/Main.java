import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {
    static class Property {
        int id;
        String slug;
        String name;
        String location;
        String city;
        String country;
        String type;
        String status;
        boolean featured;
        String tokenSymbol;
        int occupancyPercent;
        String description;
        String image;
        int sqft;
        int beds;
        int baths;
        int yearBuilt;
        double yieldPercent;
        List<String> amenities;
        String modeledIncomeNote;
    }

    static List<Property> selectListings(List<Property> catalog) {
        return catalog;
    }

    public static void main(String[] args) throws IOException {
        String json = Files.readString(findCatalog(), StandardCharsets.UTF_8);
        Type listType = new TypeToken<List<Property>>() {}.getType();
        List<Property> catalog = new Gson().fromJson(json, listType);
        Gson out = new GsonBuilder().setPrettyPrinting().create();
        System.out.println(out.toJson(selectListings(catalog)));
    }

    static Path findCatalog() {
        Path[] paths = new Path[] {
            Path.of("..", "catalog.json"),
            Path.of("catalog.json"),
            Path.of("tracks", "catalog.json")
        };
        for (Path path : paths) {
            if (Files.exists(path)) {
                return path;
            }
        }
        throw new IllegalStateException("catalog.json not found");
    }
}
