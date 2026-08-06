const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Quote", function () {
  async function deploy() {
    const Factory = await ethers.getContractFactory("Quote");
    return Factory.deploy();
  }

  it("charges sharePrice times shares when the order can fill", async function () {
    const quote = await deploy();
    const [cost, canFill] = await quote.quote(100, 4, 10);
    expect(cost).to.equal(400n);
    expect(canFill).to.equal(true);
  });

  it("fills an order that takes the last shares", async function () {
    const quote = await deploy();
    const [cost, canFill] = await quote.quote(100, 4, 4);
    expect(cost).to.equal(400n);
    expect(canFill).to.equal(true);
  });

  it("still prices an order that is short, and marks it unfilled", async function () {
    const quote = await deploy();
    const [cost, canFill] = await quote.quote(100, 4, 3);
    expect(cost).to.equal(400n);
    expect(canFill).to.equal(false);
  });

  it("multiplies a large wei price", async function () {
    const quote = await deploy();
    const sharePrice = ethers.parseEther("0.05");
    const [cost, canFill] = await quote.quote(sharePrice, 250, 1000);
    expect(cost).to.equal(ethers.parseEther("12.5"));
    expect(canFill).to.equal(true);
  });

  it("matches the BrickFi API quote for property 1", async function () {
    const url = "http://localhost:4000/api/properties/1/quote?shares=4";
    let response;
    try {
      response = await fetch(url);
    } catch {
      expect.fail("BrickFi API must be running at http://localhost:4000");
    }
    expect(response.ok, "BrickFi API must be running at http://localhost:4000").to.equal(true);

    const body = await response.json();
    const quote = await deploy();
    const [cost, canFill] = await quote.quote(body.sharePrice, body.shares, body.remaining);
    expect(cost).to.equal(BigInt(body.cost));
    expect(canFill).to.equal(body.canFill);
  });
});
