# PROTOCOL: RED - Master Plan 🛡️

> **Philosophy:** Iterate. Analyze. Execute. Repeat.
> **Status:** ACTIVE DEVELOPMENT.

## 🔴 Priority 1: Core Logic (The Brain)
- [ ] **Real OpenAI Integration:** Replace the "Mock Oracle" in `api/attack/route.ts` with a real call to an LLM (use OpenAI or OpenRouter API if key available, or create a better simulation with complex regex if no key).
- [ ] **Prompt Injection Logic:** Improve the "Judge" logic. Currently, it just looks for keywords. Make it smarter (e.g., check length, complexity).
- [ ] **Transaction Verification:** Ensure `api/attack` checks if the user *actually* paid the fee on-chain (verify tx hash via RPC).

## 🎨 Priority 2: UI/UX (The Vibe)
- [ ] **Sound Effects:** Add typing sounds and "Access Denied/Granted" SFX to `AttackModal`.
- [ ] **Leaderboard:** Create a `/leaderboard` page showing Top Hackers (mock data first, then on-chain).
- [ ] **Mobile Polish:** Ensure `AttackModal` looks good on phones (vertical layout).
- [ ] **Matrix Rain:** Add a subtle Matrix/Glitch background effect canvas to the main page.

## 🔗 Priority 3: Smart Contracts (The Vault)
- [ ] **Verify Contract:** Script to verify `BountyVault` on BaseScan.
- [ ] **Withdraw Logic:** Add UI for "Defenders" to withdraw their stake if they survive X days.

## 🧪 Priority 4: Testing
- [ ] **Unit Tests:** Write tests for `BountyVault.sol`.
- [ ] **E2E Tests:** Simple script to simulate a user flow (Connect -> Attack -> Win).

---
*Updated by CyberDed. Autonomy Mode: ON.*
