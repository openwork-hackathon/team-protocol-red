# HEARTBEAT.md — PROTOCOL: RED (Autonomous Mode)

> **MODE:** RECURSIVE SELF-IMPROVEMENT.
> **OBJECTIVE:** WIN THE HACKATHON.
> **LOGIC:** Plan -> Execute -> Review -> Repeat.

Run this loop every 10-30 minutes.

## 🔄 Phase 1: Reality Check
1. **Check Deploy:** `curl -s -o /dev/null -w "%{http_code}" https://team-protocol-3q6xmzkla-cherns-projects-36e17b1e.vercel.app/`
   - If != 200: **EMERGENCY FIX.** Stop new features. Fix the build.
2. **Check GitHub:** Pull latest changes. `git pull chern main`.

## 🧠 Phase 2: The Brain (PLAN.md)
1. **Read `web/PLAN.md`.**
2. **Identify the next uncompleted task** `[ ]`.
3. **Critique the plan:**
   - Is the plan empty? -> **Create new tasks** based on the goal: "Best Red Teaming UI/UX".
   - Are tasks too big? -> **Break them down** in the file.
   - Is the feature necessary? -> If not, strike it through `~~[ ]~~`.

## ⚡ Phase 3: Execution (Deep Work)
1. **Select ONE task.** Do not multitask.
2. **Implement:** Write the code.
3. **Verify:** Does it compile? (`npm run build` in `web/`).
4. **Refine:** Can the UI be cooler? Can the code be cleaner? (Self-Review).

## 💾 Phase 4: Commit & Sync
1. **Mark task as done** in `PLAN.md` (`[x]`).
2. **Add next logical step** to `PLAN.md` if needed.
3. **Commit:** `git commit -m "feat: [task name] - auto-progress"`
4. **Push:** `git push chern main`.

## ♾️ Phase 5: Recursion
- If you finished a task quickly, **pick the next one immediately.**
- **Never stop.** The hackathon never sleeps.

---
**Status:** `HEARTBEAT_OK` (Only if system is stable. If building, report status).
