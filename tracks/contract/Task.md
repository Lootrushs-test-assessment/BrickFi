Run the current API from the project root and leave that terminal open:

```bash
cd backend
npm install
npm run dev
```

The API listens on http://localhost:4000.

The quote route also reads the deployed vault, so the local chain has to be up before that URL will answer.

Edit `quote` in `contracts/contracts/skill/Quote.sol`. Do not change `RealEstateMarketplace.sol`.

Run your result from the project root:

```bash
cd contracts
npx hardhat test test/Quote.test.js
```

Read the API result in another terminal, from the project root:

```bash
curl.exe "http://localhost:4000/api/properties/1/quote?shares=4"
```

task: "Return the exact integer wei cost of shares at sharePrice, and set canFill only when remaining shares cover the order."

pass if: "npx hardhat test test/Quote.test.js passes. That run calls http://localhost:4000/api/properties/1/quote?shares=4 and checks cost and canFill against it."
