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
  const { subid: urlSubid, productcode: urlProductcode } = parseUrlParams();
  const saved = loadSession();
  return {
    subid: urlSubid || sanitizeSubid(saved?.subid) || '0',
    productcode: sanitizeProductcode(urlProductcode || saved?.productcode),
    msisdn: saved?.msisdn || '',
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
    setMsisdnState(value);
  }, []);

  const checkStatus = useCallback(async () => {
    setStatusLoading(true);
    try {
      const data = await checkSubscriptionStatus(subid, productcode);
      const subscribed = Number(data.status) === 1;
      setIsSubscribed(subscribed);
      return subscribed;
    } catch {
      setIsSubscribed(false);
      return false;
    } finally {
      setStatusLoading(false);
    }
  }, [subid, productcode]);

  // Status check on content page load
  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const loadAccount = useCallback(async () => {
    try {
      const data = await getAccountDetail(subid, productcode);
      setAccount(data);
      if (data.msisdn) setMsisdnState(data.msisdn);
      setIsSubscribed(Number(data.status) === 1);
      return data;
    } catch {
      setAccount(null);
      return null;
    }
  }, [subid, productcode]);

  const redirectToCampaign = useCallback(() => {
    const url = getCampaignUrl(subid, productcode);
    window.location.assign(url);
  }, [subid, productcode]);

  const unsubscribe = useCallback(async () => {
    await deactivateSubscription(subid, productcode);
    setIsSubscribed(false);
    await loadAccount();
  }, [subid, productcode, loadAccount]);

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
