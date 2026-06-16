import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PRODUCT_CODE } from './config';
import {
  checkSubscriptionStatus,
  getAccountDetail,
  deactivateSubscription,
  getCampaignUrl,
  parseUrlParams,
  sanitizeSubid,
  sanitizeProductcode,
  sanitizeMsisdn,
} from './auth';

const STORAGE_KEY = 'gamifya_session';

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
  return {
    subid: urlSubid ?? sanitizeSubid(saved?.subid) ?? '0',
    productcode: sanitizeProductcode(urlProductcode || saved?.productcode),
    msisdn: sanitizeMsisdn(urlMsisdn || saved?.msisdn) || '',
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
    setStatusLoading(true);
    try {
      const data = await checkSubscriptionStatus(subid, productcode, phone);
      const subscribed = Number(data.status) === 1;
      setIsSubscribed(subscribed);
      if (data.msisdn) setMsisdnState(sanitizeMsisdn(data.msisdn));
      return subscribed;
    } catch {
      setIsSubscribed(false);
      return false;
    } finally {
      setStatusLoading(false);
    }
  }, [subid, productcode, msisdn]);

  // Status check on load only when msisdn is already known
  useEffect(() => {
    if (msisdn) checkStatus();
  }, [msisdn, checkStatus]);

  const loadAccount = useCallback(async () => {
    const phone = sanitizeMsisdn(msisdn) || null;
    try {
      const data = await getAccountDetail(subid, productcode, phone);
      setAccount(data);
      if (data.msisdn) setMsisdnState(sanitizeMsisdn(data.msisdn));
      setIsSubscribed(Number(data.status) === 1);
      return data;
    } catch {
      setAccount(null);
      return null;
    }
  }, [subid, productcode, msisdn]);

  const redirectToCampaign = useCallback(() => {
    const phone = sanitizeMsisdn(msisdn) || null;
    const url = getCampaignUrl(subid, productcode, phone);
    window.location.assign(url);
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
