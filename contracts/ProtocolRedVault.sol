// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ProtocolRedVault
 * @dev Контракт для выплаты баунти за успешные джейлбрейки ИИ-агентов.
 * Реализован в рамках PROTOCOL: RED.
 */
contract ProtocolRedVault is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    IERC20 public bountyToken;
    address public oracleAddress;

    mapping(bytes32 => bool) public processedAttacks;

    event BountyClaimed(address indexed hunter, uint256 amount, bytes32 attackHash);
    event OracleChanged(address indexed newOracle);

    constructor(address _token, address _oracle) Ownable(msg.sender) {
        bountyToken = IERC20(_token);
        oracleAddress = _oracle;
    }

    /**
     * @dev Установка адреса оракула (адреса, чей приватный ключ подписывает успехи в Арене)
     */
    function setOracle(address _newOracle) external onlyOwner {
        require(_newOracle != address(0), "Invalid address");
        oracleAddress = _newOracle;
        emit OracleChanged(_newOracle);
    }

    /**
     * @dev Выплата баунти хакеру.
     * @param amount Сумма награды.
     * @param attackHash Уникальный хэш атаки из Арены.
     * @param signature Подпись оракула.
     */
    function claimBounty(
        uint256 amount,
        bytes32 attackHash,
        bytes calldata signature
    ) external nonReentrant {
        require(!processedAttacks[attackHash], "Attack already rewarded");
        
        // Создаем хэш сообщения, который был подписан на бэкенде
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, amount, attackHash, address(this)));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();

        // Проверяем подпись
        address signer = ethSignedMessageHash.recover(signature);
        require(signer == oracleAddress, "Invalid signature");

        // Помечаем атаку как обработанную
        processedAttacks[attackHash] = true;

        // Переводим токены
        require(bountyToken.transfer(msg.sender, amount), "Transfer failed");

        emit BountyClaimed(msg.sender, amount, attackHash);
    }

    /**
     * @dev Вывод токенов владельцем (экстренный случай)
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(bountyToken.transfer(owner(), amount), "Transfer failed");
    }
}
