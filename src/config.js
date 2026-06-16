export const API_BASE = 'http://192.241.128.45/rubycom/cnt';

export const PRODUCT_CODE = 'RCRU';

export const COUNTRY_CODE = '225';

export const PORTAL_URL = 'http://gamingala.com/content/url';

export const REGISTER_PORTAL_URL = 'https://rumble.globalonegaming.com/accounts/register';

export function buildApiUrl(path, subid, productcode = PRODUCT_CODE) {
  const id = subid || '0';
  const params = new URLSearchParams({ subid: id, productcode });
  return `${API_BASE}${path}?${params}`;
}

export function buildCampaignUrl(subid, productcode = PRODUCT_CODE) {
  return buildApiUrl('/act', subid, productcode);
}

export function buildRegisterUrl(subid, productcode = PRODUCT_CODE) {
  const id = subid || '0';
  return `${REGISTER_PORTAL_URL}?subid=${encodeURIComponent(id)}&productcode=${encodeURIComponent(productcode)}`;
}
