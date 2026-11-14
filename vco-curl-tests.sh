#!/usr/bin/env bash
# Usage: set -a; source .env.local; set +a; bash vco-curl-tests.sh
BASE="${VCO_API_BASE:-https://portal.virtualclinicos.com}"

echo "== 1. Store key (Bearer) =="
curl -s -w "\nHTTP %{http_code}\n" -H "Accept: application/json" \
  -H "Authorization: Bearer $VCO_STOREFRONT_KEY" "$BASE/api/commerce/v1/products"

echo "== 2. Public (brand id, no key) =="
curl -s -w "\nHTTP %{http_code}\n" -H "Accept: application/json" \
  -H "X-Brand-Id: $VCO_BRAND_ID" "$BASE/api/commerce/v1/products?brandId=$VCO_BRAND_ID"

echo "== 3. Categories =="
curl -s -w "\nHTTP %{http_code}\n" -H "Authorization: Bearer $VCO_STOREFRONT_KEY" \
  "$BASE/api/commerce/v1/categories"

echo "== 4. Webhook (signed, matches app/api/vco-webhook) =="
TS=$(date +%s)
BODY='{"event":"product.updated"}'
SIG=$(printf '%s' "$TS.$BODY" | openssl dgst -sha256 -hmac "$VCO_WEBHOOK_SECRET" | sed 's/^.* //')
curl -s -w "\nHTTP %{http_code}\n" -X POST https://www.paxlongevity.com/api/vco-webhook \
  -H "Content-Type: application/json" \
  -H "x-webhook-timestamp: $TS" \
  -H "x-webhook-signature-v1: $SIG" \
  -d "$BODY"
