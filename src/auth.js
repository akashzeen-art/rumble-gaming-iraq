import {
  API_BASE,
  PRODUCT_CODE,
  buildApiUrl,
  buildCampaignUrl,
  sanitizeSubid,
  sanitizeProductcode,
  sanitizeMsisdn,
  normalizeMsisdn,
  isValidMsisdn,
} from './config';

async function fetchJson(url) {
  let data;

  try {
    const proxyPath = url.replace(API_BASE, '/api/rubycom/cnt');
    const res = await fetch(proxyPath);
    if (!res.ok) throw new Error('proxy_failed');
    const text = await res.text();
    data = JSON.parse(text);
  } catch {
    const encoded = encodeURIComponent(url);
    const res = await fetch(`https://api.allorigins.win/get?url=${encoded}`);
    if (!res.ok) throw new Error('Network error. Please try again.');
    const wrapper = await res.json();
    data = JSON.parse(wrapper.contents);
  }

  return data;
}

export async function checkSubscriptionStatus(subid, productcode = PRODUCT_CODE, msisdn = null) {
  const url = buildApiUrl('/sub/status', subid, productcode, msisdn);
  return fetchJson(url);
}

export async function getAccountDetail(subid, productcode = PRODUCT_CODE, msisdn = null) {
  const url = buildApiUrl('/sub/detail', subid, productcode, msisdn);
  return fetchJson(url);
}

export async function deactivateSubscription(subid, productcode = PRODUCT_CODE, msisdn = null) {
  const url = buildApiUrl('/dct', subid, productcode, msisdn);
  return fetchJson(url);
}

/** Probe /act → /cmp; return redirect target or null if campaign is disabled. */
export async function resolveCampaignTarget(subid, productcode = PRODUCT_CODE, msisdn = null) {
  const actProxy = buildCampaignUrl(subid, productcode, msisdn).replace(API_BASE, '/api/rubycom/cnt');

  try {
    const actRes = await fetch(actProxy, { redirect: 'manual' });
    const cmpLocation = actRes.headers.get('Location') || '';
    if (!cmpLocation || cmpLocation.includes('error=')) {
      return null;
    }
    if (actRes.status < 300 || actRes.status >= 400) {
      return null;
    }

    const cmpUrl = cmpLocation.startsWith('http')
      ? cmpLocation
      : `${API_BASE}${cmpLocation.startsWith('/') ? '' : '/'}${cmpLocation}`;
    const cmpProxy = cmpUrl.replace(API_BASE, '/api/rubycom/cnt');
    const cmpRes = await fetch(cmpProxy, { redirect: 'manual' });
    const finalLocation = cmpRes.headers.get('Location') || '';
    if (finalLocation.includes('error=Campaign') || finalLocation.startsWith('&error')) {
      return null;
    }

    return cmpProxy;
  } catch {
    return null;
  }
}

export function getCampaignUrl(subid, productcode = PRODUCT_CODE, msisdn = null) {
  return buildCampaignUrl(subid, productcode, msisdn);
}

/** Same as getCampaignUrl but routed through our nginx/vite proxy. */
export function getCampaignProxyUrl(subid, productcode = PRODUCT_CODE, msisdn = null) {
  return buildCampaignUrl(subid, productcode, msisdn).replace(API_BASE, '/api/rubycom/cnt');
}

export function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const subid = params.get('subid');
  const productcode = params.get('productcode');
  const msisdn = params.get('msisdn');
  return {
    subid: subid !== null ? sanitizeSubid(subid) : null,
    productcode: productcode ? sanitizeProductcode(productcode) : null,
    msisdn: msisdn ? sanitizeMsisdn(msisdn) : null,
  };
}

export { sanitizeSubid, sanitizeProductcode, sanitizeMsisdn, normalizeMsisdn, isValidMsisdn };
