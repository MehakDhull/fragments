#!/usr/bin/env bash
set -e

echo "1. Git status:"; git status
echo "2. Lint:"; npm run lint
echo "3. Tests:"; npm test
echo "4. Coverage:"; npm run coverage -- --statements=80
echo "5. CI workflow file exists:"; ls .github/workflows
echo "6. Health check live:"; curl -i http://localhost:8080/v1/ | head -5
echo "All manual checks passed!"
