export const API_BASE = 'http://192.241.128.45/rubycom/cnt';

export const PRODUCT_CODE = 'RCRU';

export const COUNTRY_CODE = '225';

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

export function sanitizeMsisdn(msisdn) {
  return normalizeMsisdn(msisdn);
}

/** Build full msisdn: country 225 + local 0575203579 → 2250575203579 */
export function normalizeMsisdn(input) {
  let digits = String(input || '').replace(/\D/g, '');
  if (!digits) return null;

  if (digits.startsWith(COUNTRY_CODE) && digits.length > COUNTRY_CODE.length) {
    return digits;
  }

  // CI local numbers are 10 digits starting with 0
  if (digits.length === 9 && !digits.startsWith('0')) {
    digits = `0${digits}`;
  }

  return `${COUNTRY_CODE}${digits}`;
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
