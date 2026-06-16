export const API_BASE = 'http://192.241.128.45/rubycom/cnt';

export const PRODUCT_CODE = 'RCRU';

export const COUNTRY_CODE = '225';

export const PORTAL_URL = 'http://gamingala.com/content/url';

export const REGISTER_PORTAL_URL = 'https://rumble.globalonegaming.com/accounts/register';

/** Normalize subid – use 0 if missing or invalid placeholder. */
export function sanitizeSubid(subid) {
  if (!subid || subid === '0' || subid === 'YOUR_SUBID' || subid === 'undefined' || subid === 'null') {
    return '0';
  }
  return String(subid).trim();
}

export function sanitizeProductcode(productcode) {
  return productcode || PRODUCT_CODE;
}

export function buildApiUrl(path, subid, productcode = PRODUCT_CODE) {
  const id = sanitizeSubid(subid);
  const code = sanitizeProductcode(productcode);
  return `${API_BASE}${path}?subid=${encodeURIComponent(id)}&productcode=${encodeURIComponent(code)}`;
}

/** Campaign URL – redirect here when user is not subscribed. */
export function buildCampaignUrl(subid, productcode = PRODUCT_CODE) {
  return buildApiUrl('/act', subid, productcode);
}

/** Gamers Gala Portal URL – entry after subscription. */
export function buildPortalUrl(subid, productcode = PRODUCT_CODE) {
  const id = sanitizeSubid(subid);
  const code = sanitizeProductcode(productcode);
  return `${PORTAL_URL}?subid=${encodeURIComponent(id)}&productcode=${encodeURIComponent(code)}`;
}

export function buildRegisterUrl(subid, productcode = PRODUCT_CODE) {
  const id = sanitizeSubid(subid);
  const code = sanitizeProductcode(productcode);
  return `${REGISTER_PORTAL_URL}?subid=${encodeURIComponent(id)}&productcode=${encodeURIComponent(code)}`;
}
