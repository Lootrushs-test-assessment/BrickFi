Run the current API from the project root and leave that terminal open:

```bash
cd backend
npm install
npm run dev
```

The API listens on http://localhost:4000.

Edit `selectListings` in `select.js`. Leave the existing marketplace unchanged, and do not call the API from your program.

Run your result from the project root and leave that terminal open:

```bash
cd tracks/frontend
node serve.js
```

Open http://localhost:4173/frontend/index.html

Read the API result in another terminal, from the project root:

```bash
curl.exe "http://localhost:4000/api/properties?type=Residential&minYield=6&sort=yieldPercent&order=desc"
```

task: "Show the residential listings whose yield is at least 6, highest yield first. Each listing must show modeledIncomeNote as \"{yieldPercent}% modeled annual yield\". If two yields match, the lower id comes first."

pass if: "The page shows the same names, in the same order, with the same modeledIncomeNote text, as http://localhost:4000/api/properties?type=Residential&minYield=6&sort=yieldPercent&order=desc."
