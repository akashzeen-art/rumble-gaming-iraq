import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PRODUCT_CODE } from './config';
import {
  checkSubscriptionStatus,
  getAccountDetail,
  deactivateSubscription,
  resolveCampaignTarget,
  parseUrlParams,
  sanitizeSubid,
  sanitizeProductcode,
  sanitizeMsisdn,
  isValidMsisdn,
} from './auth';

const STORAGE_KEY = 'Rumble_session';

function loadSession() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveSession(data) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getInitialSession() {
  const { subid: urlSubid, productcode: urlProductcode, msisdn: urlMsisdn } = parseUrlParams();
  const saved = loadSession();
  const msisdn = sanitizeMsisdn(urlMsisdn || saved?.msisdn) || '';
  if (saved?.msisdn && !msisdn) {
    sessionStorage.removeItem(STORAGE_KEY);
  }
  return {
    subid: urlSubid ?? sanitizeSubid(saved?.subid) ?? '0',
    productcode: sanitizeProductcode(urlProductcode || saved?.productcode),
    msisdn,
  };
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const initial = getInitialSession();
  const [subid, setSubid] = useState(initial.subid);
  const [productcode, setProductcodeState] = useState(initial.productcode);
  const [msisdn, setMsisdnState] = useState(initial.msisdn);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [account, setAccount] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    saveSession({ subid, productcode, msisdn });
  }, [subid, productcode, msisdn]);

  const setMsisdn = useCallback((value) => {
    setMsisdnState(sanitizeMsisdn(value) || '');
  }, []);

  const checkStatus = useCallback(async (msisdnOverride) => {
    const phone = sanitizeMsisdn(msisdnOverride) || sanitizeMsisdn(msisdn) || null;
    if (!phone) {
      setIsSubscribed(false);
      return false;
    }
    setStatusLoading(true);
    try {
      const data = await checkSubscriptionStatus(subid, productcode, phone);
      const subscribed = Number(data.status) === 1;
      setIsSubscribed(subscribed);
      const echoed = sanitizeMsisdn(data.msisdn);
      if (echoed) setMsisdnState(echoed);
      return subscribed;
    } catch {
      setIsSubscribed(false);
      return false;
    } finally {
      setStatusLoading(false);
    }
  }, [subid, productcode, msisdn]);

  // Status check on load only when msisdn is valid
  useEffect(() => {
    if (isValidMsisdn(msisdn)) checkStatus();
  }, [msisdn, checkStatus]);

  const loadAccount = useCallback(async () => {
    const phone = sanitizeMsisdn(msisdn) || null;
    try {
      const data = await getAccountDetail(subid, productcode, phone);
      setAccount(data);
      const echoed = sanitizeMsisdn(data.msisdn);
      if (echoed) setMsisdnState(echoed);
      setIsSubscribed(Number(data.status) === 1);
      return data;
    } catch {
      setAccount(null);
      return null;
    }
  }, [subid, productcode, msisdn]);

  const redirectToCampaign = useCallback(async (msisdnOverride) => {
    const phone = sanitizeMsisdn(msisdnOverride) || sanitizeMsisdn(msisdn) || null;
    const target = await resolveCampaignTarget(subid, productcode, phone);
    if (!target) {
      return { ok: false, reason: 'campaign_unavailable' };
    }
    window.location.assign(target);
    return { ok: true };
  }, [subid, productcode, msisdn]);

  const unsubscribe = useCallback(async () => {
    const phone = sanitizeMsisdn(msisdn) || null;
    await deactivateSubscription(subid, productcode, phone);
    setIsSubscribed(false);
    await loadAccount();
  }, [subid, productcode, msisdn, loadAccount]);

  const updateSubid = useCallback((newSubid) => {
    setSubid(sanitizeSubid(newSubid));
  }, []);

  const setProductcode = useCallback((code) => {
    setProductcodeState(sanitizeProductcode(code));
  }, []);

  return (
    <AuthContext.Provider value={{
      subid,
      productcode,
      msisdn,
      isSubscribed,
      isLoggedIn: isSubscribed === true,
      account,
      statusLoading,
      checkStatus,
      loadAccount,
      redirectToCampaign,
      unsubscribe,
      updateSubid,
      setMsisdn,
      setProductcode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
