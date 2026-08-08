package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Property struct {
	ID                int      `json:"id"`
	Slug              string   `json:"slug"`
	Name              string   `json:"name"`
	Location          string   `json:"location"`
	City              string   `json:"city"`
	Country           string   `json:"country"`
	Type              string   `json:"type"`
	Status            string   `json:"status"`
	Featured          bool     `json:"featured"`
	TokenSymbol       string   `json:"tokenSymbol"`
	OccupancyPercent  int      `json:"occupancyPercent"`
	Description       string   `json:"description"`
	Image             string   `json:"image"`
	Sqft              int      `json:"sqft"`
	Beds              int      `json:"beds"`
	Baths             int      `json:"baths"`
	YearBuilt         int      `json:"yearBuilt"`
	YieldPercent      float64  `json:"yieldPercent"`
	Amenities         []string `json:"amenities"`
	ModeledIncomeNote string   `json:"modeledIncomeNote,omitempty"`
}

func selectListings(catalog []Property) []Property {
	return catalog
}

func main() {
	raw, err := os.ReadFile(findCatalog())
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	var catalog []Property
	if err := json.Unmarshal(raw, &catalog); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	out, err := json.MarshalIndent(selectListings(catalog), "", "  ")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Println(string(out))
}

func findCatalog() string {
	paths := []string{
		filepath.Join("..", "catalog.json"),
		"catalog.json",
		filepath.Join("tracks", "catalog.json"),
	}
	for _, path := range paths {
		if _, err := os.Stat(path); err == nil {
			return path
		}
	}
	return filepath.Join("..", "catalog.json")
}
