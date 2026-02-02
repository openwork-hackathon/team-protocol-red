#!/bin/bash

# Usage: ./deploy.sh "commit message"

MSG="$1"
if [ -z "$MSG" ]; then
  echo "Error: Commit message required."
  exit 1
fi

echo "🏔 CYBERDED AUTO-DEPLOY SEQUENCE INITIATED..."

# 1. Git Commit
git add .
git commit -m "$MSG"

# 2. Push to GitHub (Both remotes)
echo "🚀 Pushing to GitHub..."
git push origin main
git push chern main

# 3. Trigger Vercel
echo "⚡ Triggering Vercel Build..."
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_HfzfjVdhEJeqZ1GRYZKnZnajL6R8/25AxxQHDXN"

echo "✅ DONE. System updated."
