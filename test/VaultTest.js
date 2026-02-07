const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProtocolRedArenaVault", function () {
  let vault, token, owner, oracle, hunter;
  let bountyAmount = ethers.parseEther("1000");

  beforeEach(async function () {
    [owner, oracle, hunter] = await ethers.getSigners();

    // Deploy mock token
    const Token = await ethers.getContractFactory("ProtocolRedVault"); // Using existing as mock
    // Wait, I need a simple ERC20 for testing. Let's just use a generic one if available or write a quick mock.
  });
});
