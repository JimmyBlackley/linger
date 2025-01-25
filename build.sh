#!/bin/bash

# Always build on main branch
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ - Build can proceed on main branch"
  exit 1;

# Skip builds if commit message contains [SKIP]
elif [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[SKIP]"* ]]; then
  echo "🛑 - Build cancelled due to [SKIP] in commit message"
  exit 0;

else
  # Proceed with the build for other branches if [SKIP] is not in the commit message
  echo "✅ - Build can proceed"
  exit 1;
fi
