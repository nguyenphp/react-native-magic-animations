#!/usr/bin/env bash
#
# Publish react-native-magic-animations to npm.
#
# Usage:
#   NPM_TOKEN=<your-npm-token> ./scripts/publish.sh [--otp <code>]
#
# Required: NPM_TOKEN env var (granular access token with publish permission,
#           or classic automation token — get one at
#           https://www.npmjs.com/settings/<user>/tokens).
#
# Optional: --otp <code> if your npm account has 2FA on publish enabled.
#           Otherwise switch 2FA to "Authorization only" on npmjs.com.
#
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${NPM_TOKEN:-}" ]; then
  echo "❌  NPM_TOKEN env var not set."
  echo "    Usage: NPM_TOKEN=<token> $0 [--otp <code>]"
  exit 1
fi

# Write a project-local .npmrc that's gitignored
NPMRC=".npmrc"
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "$NPMRC"

# Always remove the .npmrc, even on failure, so the token doesn't linger.
cleanup() {
  rm -f "$NPMRC"
}
trap cleanup EXIT

OTP_ARG=""
if [ "${1:-}" = "--otp" ] && [ -n "${2:-}" ]; then
  OTP_ARG="--otp=$2"
fi

echo "📦  Publishing $(node -p "require('./package.json').name")@$(node -p "require('./package.json').version") to npm…"

npm publish --access public $OTP_ARG

echo "✅  Published. Tag it:"
echo "    git tag -a v$(node -p "require('./package.json').version") -m 'Release v$(node -p "require('./package.json').version")'"
echo "    git push origin v$(node -p "require('./package.json').version")"
