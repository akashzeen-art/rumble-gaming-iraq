import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PRODUCT_CODE } from './config';
import {
  checkSubscriptionStatus,
  getAccountDetail,
  deactivateSubscription,
  getCampaignUrl,
  parseUrlParams,
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
    subid: urlSubid || saved?.subid || '0',
    productcode: urlProductcode || saved?.productcode || PRODUCT_CODE,
    msisdn: saved?.msisdn || '',
  };
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const initial = getInitialSession();
  const [subid, setSubid] = useState(initial.subid);
  const [productcode, setProductcode] = useState(initial.productcode);
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

  // Status check on app load (content page entry)
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
  }, [subid, productcode, setMsisdn]);

  const redirectToCampaign = useCallback(() => {
    window.location.href = getCampaignUrl(subid, productcode);
  }, [subid, productcode]);

  const unsubscribe = useCallback(async () => {
    await deactivateSubscription(subid, productcode);
    setIsSubscribed(false);
    await loadAccount();
  }, [subid, productcode, loadAccount]);

  const updateSubid = useCallback((newSubid) => {
    const id = newSubid || '0';
    setSubid(id);
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
      setProductcode: setProductcode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
