const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts to", hre.network.name);

  // 1. Deploy Mock Token (OPENWORK) - only for Testnet!
  let tokenAddress;
  if (hre.network.name === "baseSepolia" || hre.network.name === "localhost") {
    console.log("Deploying Mock Token...");
    const Token = await hre.ethers.getContractFactory("MockToken");
    const mockToken = await Token.deploy();
    await mockToken.waitForDeployment();
    tokenAddress = mockToken.target;
    console.log("MockToken deployed to:", tokenAddress);
  } else {
    tokenAddress = "0x299c30DD5974BF4D5bFE42C340CA40462816AB07"; // Mainnet
  }

  // 2. Deploy BountyVault
  const [deployer] = await hre.ethers.getSigners();
  const oracleAddress = deployer.address; // Currently deployer is oracle
  
  console.log("Deploying Vault...");
  const Vault = await hre.ethers.getContractFactory("BountyVault");
  const vault = await Vault.deploy(tokenAddress, oracleAddress);
  await vault.waitForDeployment();

  console.log("BountyVault deployed to:", vault.target);
  console.log("Token:", token);
  console.log("Oracle:", oracleAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
