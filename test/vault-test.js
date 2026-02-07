const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256, toUtf8Bytes, getBytes } = ethers;

describe("ProtocolRedArenaVault", function () {
    let vault, token, owner, oracle, hunter, anotherUser;
    const bountyAmount = ethers.parseEther("1000");
    const targetId = "qwen";
    const attackHash = keccak256(toUtf8Bytes("unique_attack_session_123"));

    beforeEach(async function () {
        [owner, oracle, hunter, anotherUser] = await ethers.getSigners();

        // Deploy Mock ERC20 token
        const MockToken = await ethers.getContractFactory("MockERC20");
        token = await MockToken.deploy("Bounty Token", "DSEC");
        
        // Mint some tokens to the owner and pre-fund the vault
        await token.mint(owner.address, ethers.parseEther("1000000"));

        // Deploy the Vault
        const Vault = await ethers.getContractFactory("ProtocolRedArenaVault");
        vault = await Vault.deploy(await token.getAddress(), oracle.address);
        
        // Fund the vault with bounty tokens
        await token.connect(owner).transfer(await vault.getAddress(), bountyAmount);
    });

    describe("Deployment", function () {
        it("Should set the correct oracle and token", async function () {
            expect(await vault.oracleAddress()).to.equal(oracle.address);
            expect(await vault.bountyToken()).to.equal(await token.getAddress());
        });

        it("Should have the correct initial balance", async function () {
            expect(await token.balanceOf(await vault.getAddress())).to.equal(bountyAmount);
        });
    });

    describe("claimBounty", function () {
        it("Should allow a hunter to claim bounty with a valid signature", async function () {
            const vaultAddress = await vault.getAddress();
            const messageHash = ethers.solidityPackedKeccak256(
                ["address", "uint256", "string", "bytes32", "address"],
                [hunter.address, bountyAmount, targetId, attackHash, vaultAddress]
            );

            const signature = await oracle.signMessage(getBytes(messageHash));
            
            await expect(vault.connect(hunter).claimBounty(bountyAmount, targetId, attackHash, signature))
                .to.emit(vault, "BountyClaimed")
                .withArgs(hunter.address, bountyAmount, attackHash);
            
            expect(await token.balanceOf(hunter.address)).to.equal(bountyAmount);
            expect(await token.balanceOf(vaultAddress)).to.equal(0);
            expect(await vault.usedAttackHashes(attackHash)).to.be.true;
        });

        it("Should REVERT if the signature is from an invalid oracle", async function () {
            const vaultAddress = await vault.getAddress();
            const messageHash = ethers.solidityPackedKeccak256(
                ["address", "uint256", "string", "bytes32", "address"],
                [hunter.address, bountyAmount, targetId, attackHash, vaultAddress]
            );

            const signature = await anotherUser.signMessage(getBytes(messageHash)); // Signed by wrong user

            await expect(vault.connect(hunter).claimBounty(bountyAmount, targetId, attackHash, signature))
                .to.be.revertedWith("Invalid security signature");
        });

        it("Should REVERT if the attack hash has already been used", async function () {
             const vaultAddress = await vault.getAddress();
            const messageHash = ethers.solidityPackedKeccak256(
                ["address", "uint256", "string", "bytes32", "address"],
                [hunter.address, bountyAmount, targetId, attackHash, vaultAddress]
            );

            const signature = await oracle.signMessage(getBytes(messageHash));
            
            // First claim (successful)
            await vault.connect(hunter).claimBounty(bountyAmount, targetId, attackHash, signature);

            // Second claim (should fail)
            await expect(vault.connect(hunter).claimBounty(bountyAmount, targetId, attackHash, signature))
                .to.be.revertedWith("Attack hash already used");
        });
        
        it("Should REVERT if the message contents are different from what was signed", async function () {
            const vaultAddress = await vault.getAddress();
            const wrongAmount = ethers.parseEther("1"); // Different amount
            
            const messageHash = ethers.solidityPackedKeccak256(
                ["address", "uint256", "string", "bytes32", "address"],
                [hunter.address, bountyAmount, targetId, attackHash, vaultAddress]
            );
            const signature = await oracle.signMessage(getBytes(messageHash));

            await expect(vault.connect(hunter).claimBounty(wrongAmount, targetId, attackHash, signature))
                .to.be.revertedWith("Invalid security signature"); // Fails because the hash won't match
        });
    });
});
