export const API_BASE = 'http://192.241.128.45/rubycom/cnt';

export const PRODUCT_CODE = 'RCRU';

export const COUNTRY_CODE = '225';

/** CI format: 225 + 0XXXXXXXXX (13 digits total) */
export const MSISDN_LENGTH = 13;

export const PORTAL_URL = 'http://gamingala.com/content/url';

export const REGISTER_PORTAL_URL = 'https://rumble.globalonegaming.com/accounts/register';

/** subid=0 when missing (per API spec). */
export function sanitizeSubid(subid) {
  if (subid === null || subid === undefined || subid === '' ||
      subid === 'YOUR_SUBID' || subid === 'undefined' || subid === 'null') {
    return '0';
  }
  return String(subid).trim();
}

export function sanitizeProductcode(productcode) {
  return (productcode || PRODUCT_CODE).trim();
}

/**
 * Normalize to API format: 2250575203579
 * Local input: 0575203579 (10 digits, starts with 0)
 */
export function normalizeMsisdn(input) {
  let digits = String(input || '').replace(/\D/g, '');
  if (!digits) return null;

  // Strip country code if user pasted full number
  while (digits.startsWith(COUNTRY_CODE)) {
    digits = digits.slice(COUNTRY_CODE.length);
  }

  // 9-digit local without leading 0 → add 0
  if (digits.length === 9 && !digits.startsWith('0')) {
    digits = `0${digits}`;
  }

  // Must be exactly 10-digit local starting with 0
  if (digits.length !== 10 || !digits.startsWith('0')) {
    return null;
  }

  const full = `${COUNTRY_CODE}${digits}`;
  return /^2250\d{9}$/.test(full) ? full : null;
}

export function sanitizeMsisdn(msisdn) {
  return normalizeMsisdn(msisdn);
}

export function isValidMsisdn(msisdn) {
  return normalizeMsisdn(msisdn) !== null;
}

/**
 * Build API URL exactly as curl:
 * ?subid=0&productcode=RCRU&msisdn=2250575203579
 */
export function buildApiUrl(path, subid, productcode = PRODUCT_CODE, msisdn = null) {
  const id = sanitizeSubid(subid);
  const code = sanitizeProductcode(productcode);
  const params = new URLSearchParams();
  params.set('subid', id);
  params.set('productcode', code);
  const cleanedMsisdn = sanitizeMsisdn(msisdn);
  if (cleanedMsisdn) {
    params.set('msisdn', cleanedMsisdn);
  }
  return `${API_BASE}${path}?${params.toString()}`;
}

export function buildCampaignUrl(subid, productcode = PRODUCT_CODE, msisdn = null) {
  return buildApiUrl('/act', subid, productcode, msisdn);
}

export function buildGamingalaPortalUrl(subid, productcode = PRODUCT_CODE) {
  const id = sanitizeSubid(subid);
  const code = sanitizeProductcode(productcode);
  return `${PORTAL_URL}?subid=${encodeURIComponent(id)}&productcode=${encodeURIComponent(code)}`;
}

export function buildRegisterUrl(subid, productcode = PRODUCT_CODE) {
  const id = sanitizeSubid(subid);
  const code = sanitizeProductcode(productcode);
  return `${REGISTER_PORTAL_URL}?subid=${encodeURIComponent(id)}&productcode=${encodeURIComponent(code)}`;
}
