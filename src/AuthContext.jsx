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

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [subid, setSubid] = useState(() => loadSession()?.subid || '0');
  const [productcode, setProductcode] = useState(() => loadSession()?.productcode || PRODUCT_CODE);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [account, setAccount] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const { subid: urlSubid, productcode: urlProductcode } = parseUrlParams();
    if (urlSubid) {
      setSubid(urlSubid);
      saveSession({ subid: urlSubid, productcode: urlProductcode || productcode });
    }
    if (urlProductcode) {
      setProductcode(urlProductcode);
    }
  }, []);

  useEffect(() => {
    saveSession({ subid, productcode });
  }, [subid, productcode]);

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

  const loadAccount = useCallback(async () => {
    try {
      const data = await getAccountDetail(subid, productcode);
      setAccount(data);
      setIsSubscribed(Number(data.status) === 1);
      return data;
    } catch {
      setAccount(null);
      return null;
    }
  }, [subid, productcode]);

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
    saveSession({ subid: id, productcode });
  }, [productcode]);

  return (
    <AuthContext.Provider value={{
      subid,
      productcode,
      isSubscribed,
      isLoggedIn: isSubscribed === true,
      account,
      statusLoading,
      checkStatus,
      loadAccount,
      redirectToCampaign,
      unsubscribe,
      updateSubid,
      setProductcode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
