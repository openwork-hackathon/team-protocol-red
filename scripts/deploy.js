const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  
  // Адреса для конструктора (заменить на реальные)
  const bountyTokenAddress = "0x0000000000000000000000000000000000000000"; // TODO: Deploy mock token or use existing
  const oracleAddress = deployer.address; // Используем адрес деплоера как временный оракул

  console.log("Deploying MockERC20 (for Bounty)...");
  const MockToken = await ethers.getContractFactory("MockERC20");
  const bountyToken = await MockToken.deploy("Protocol Red Token", "DSEC");
  await bountyToken.waitForDeployment();
  console.log("MockERC20 deployed to:", await bountyToken.getAddress());
  
  console.log("\nDeploying ProtocolRedArenaVault...");
  const Vault = await ethers.getContractFactory("ProtocolRedArenaVault");
  const vault = await Vault.deploy(await bountyToken.getAddress(), oracleAddress);
  await vault.waitForDeployment();

  console.log("ProtocolRedArenaVault deployed to:", await vault.getAddress());

  // Минтим тестовые токены и пополняем контракт
  const initialBounty = ethers.parseEther("1000000");
  console.log(`\nMinting ${ethers.formatEther(initialBounty)} DSEC for the vault...`);
  await bountyToken.mint(await vault.getAddress(), initialBounty);
  console.log("Vault funded successfully.");
  console.log("Vault balance:", ethers.formatEther(await bountyToken.balanceOf(await vault.getAddress())));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
