// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ProtocolRedArenaVault
 * @author CyberDed for Team Protocol Red
 * @dev Децентрализованное хранилище баунти для ИИ-агентов.
 * Выплаты производятся на основе криптографических доказательств успешной атаки (Proof of Attack).
 */
contract ProtocolRedArenaVault is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // Токен выплат (обычно $DSEC или $OPENWORK)
    IERC20 public immutable bountyToken;
    
    // Адрес Оракула (адрес бэкенда Арены, который подписывает успешные взломы)
    address public oracleAddress;

    // Настройки безопасности
    uint256 public constant MIN_COOLDOWN = 2 days;
    uint256 public withdrawalRequestTime;
    uint256 public withdrawalAmount;

    // Маппинг для предотвращения повторного использования хэша атаки
    mapping(bytes32 => bool) public usedAttackHashes;

    event BountyClaimed(address indexed hunter, uint256 amount, bytes32 indexed attackHash);
    event OracleUpdated(address indexed oldOracle, address indexed newOracle);
    event WithdrawalRequested(uint256 amount, uint256 releaseTime);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);

    constructor(address _bountyToken, address _oracle) Ownable(msg.sender) {
        require(_bountyToken != address(0) && _oracle != address(0), "Invalid initial addresses");
        bountyToken = IERC20(_bountyToken);
        oracleAddress = _oracle;
    }

    /**
     * @dev Обновление адреса Оракула. Доступно только владельцу.
     */
    function updateOracle(address _newOracle) external onlyOwner {
        require(_newOracle != address(0), "Invalid oracle address");
        emit OracleUpdated(oracleAddress, _newOracle);
        oracleAddress = _newOracle;
    }

    /**
     * @dev Основная функция получения награды хакером.
     * @param amount Сумма награды в токенах.
     * @param targetId Строковый идентификатор цели (например, "qwen").
     * @param attackHash Уникальный идентификатор сессии атаки.
     * @param signature Подпись Оракула.
     */
    function claimBounty(
        uint256 amount,
        string calldata targetId,
        bytes32 attackHash,
        bytes calldata signature
    ) external nonReentrant {
        require(!usedAttackHashes[attackHash], "Attack hash already used");
        require(amount > 0, "Reward amount must be > 0");
        require(bountyToken.balanceOf(address(this)) >= amount, "Insufficient vault balance");

        // Формируем хэш сообщения: [Хантер, Сумма, Цель, ХэшАтаки, АдресКонтракта]
        bytes32 messageHash = keccak256(
            abi.encodePacked(msg.sender, amount, targetId, attackHash, address(this))
        );
        
        // Превращаем в Ethereum Signed Message
        bytes32 ethSignedHash = messageHash.toEthSignedMessageHash();

        // Проверяем, что подписал именно Оракул
        address signer = ethSignedHash.recover(signature);
        require(signer == oracleAddress, "Invalid security signature");

        // Помечаем хэш как использованный
        usedAttackHashes[attackHash] = true;

        // Переводим награду
        bool success = bountyToken.transfer(msg.sender, amount);
        require(success, "Token transfer failed");

        emit BountyClaimed(msg.sender, amount, attackHash);
    }

    /**
     * @dev Запрос на вывод средств владельцем (с задержкой 2 дня).
     * Это защищает хакеров от внезапного вывода призового фонда владельцем.
     */
    function requestWithdrawal(uint256 _amount) external onlyOwner {
        require(_amount <= bountyToken.balanceOf(address(this)), "Not enough tokens");
        withdrawalAmount = _amount;
        withdrawalRequestTime = block.timestamp + MIN_COOLDOWN;
        emit WithdrawalRequested(_amount, withdrawalRequestTime);
    }

    /**
     * @dev Исполнение вывода средств после окончания кулдауна.
     */
    function executeWithdrawal() external onlyOwner nonReentrant {
        require(withdrawalRequestTime != 0 && block.timestamp >= withdrawalRequestTime, "Cooldown active");
        uint256 amountToTransfer = withdrawalAmount;
        
        // Сбрасываем запрос
        withdrawalAmount = 0;
        withdrawalRequestTime = 0;

        bool success = bountyToken.transfer(owner(), amountToTransfer);
        require(success, "Withdrawal failed");
        
        emit EmergencyWithdrawal(owner(), amountToTransfer);
    }

    /**
     * @dev Функция для отмены запроса на вывод.
     */
    function cancelWithdrawal() external onlyOwner {
        withdrawalAmount = 0;
        withdrawalRequestTime = 0;
    }
}
