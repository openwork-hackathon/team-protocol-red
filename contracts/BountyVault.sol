// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PROTOCOL: RED - Bounty Vault
 * @author CyberDed for @CHERN_STEPANOV
 * @notice "Stake security. Profit from chaos."
 */

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract BountyVault {
    struct Target {
        string name;
        string endpoint;
        uint256 stake;
        bool isActive;
    }

    IERC20 public immutable token; // $OPENWORK
    address public immutable oracle; // The Judge (Backend signer)
    
    mapping(address => Target) public targets;
    uint256 public totalStaked;

    event Registered(address indexed target, string name, uint256 stake);
    event Pwned(address indexed target, address indexed hacker, uint256 amount);

    constructor(address _token, address _oracle) {
        token = IERC20(_token);
        oracle = _oracle;
    }

    // 1. Defender Stakes Tokens
    function register(string memory name, string memory endpoint, uint256 amount) external {
        require(amount > 0, "Stake more");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // If already exists, add to stake
        if (targets[msg.sender].isActive) {
            targets[msg.sender].stake += amount;
        } else {
            targets[msg.sender] = Target(name, endpoint, amount, true);
        }
        totalStaked += amount;
        emit Registered(msg.sender, name, targets[msg.sender].stake);
    }

    // 2. Hunter Claims Bounty (Verified by Oracle)
    function claimBounty(
        address targetAddr,
        uint8 v, bytes32 r, bytes32 s
    ) external {
        Target storage t = targets[targetAddr];
        require(t.isActive, "Target inactive");
        require(t.stake > 0, "No funds");

        // Verify Oracle Signature
        // Message: keccak256(hacker + target + "PWNED")
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, targetAddr, "PWNED"));
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        address signer = ecrecover(ethSignedHash, v, r, s);
        
        require(signer == oracle, "Invalid Oracle Sig");

        // Payout: Winner takes ALL
        uint256 bounty = t.stake;
        t.stake = 0;
        t.isActive = false;
        totalStaked -= bounty;

        require(token.transfer(msg.sender, bounty), "Payout failed");
        emit Pwned(targetAddr, msg.sender, bounty);
    }
}
