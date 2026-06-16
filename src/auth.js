import {
  API_BASE,
  PRODUCT_CODE,
  buildApiUrl,
  buildCampaignUrl,
  sanitizeSubid,
  sanitizeProductcode,
  sanitizeMsisdn,
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

export function getCampaignUrl(subid, productcode = PRODUCT_CODE, msisdn = null) {
  return buildCampaignUrl(subid, productcode, msisdn);
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

export { sanitizeSubid, sanitizeProductcode, sanitizeMsisdn };
