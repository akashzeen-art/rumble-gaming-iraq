import { API_BASE, PRODUCT_CODE, buildApiUrl, buildCampaignUrl } from './config';

async function fetchJson(url) {
  let data;

  try {
    const proxyPath = url.replace(API_BASE, '/api/rubycom/cnt');
    const res = await fetch(proxyPath);
    if (!res.ok) throw new Error('proxy_failed');
    data = await res.json();
  } catch {
    const encoded = encodeURIComponent(url);
    const res = await fetch(`https://api.allorigins.win/get?url=${encoded}`);
    if (!res.ok) throw new Error('Network error. Please try again.');
    const wrapper = await res.json();
    data = JSON.parse(wrapper.contents);
  }

  return data;
}

export async function checkSubscriptionStatus(subid, productcode = PRODUCT_CODE) {
  const url = buildApiUrl('/sub/status', subid, productcode);
  return fetchJson(url);
}

export async function getAccountDetail(subid, productcode = PRODUCT_CODE) {
  const url = buildApiUrl('/sub/detail', subid, productcode);
  return fetchJson(url);
}

export async function deactivateSubscription(subid, productcode = PRODUCT_CODE) {
  const url = buildApiUrl('/dct', subid, productcode);
  return fetchJson(url);
}

export function getCampaignUrl(subid, productcode = PRODUCT_CODE) {
  return buildCampaignUrl(subid, productcode);
}

export function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    subid: params.get('subid') || null,
    productcode: params.get('productcode') || null,
  };
}
