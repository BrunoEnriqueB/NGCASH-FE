import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

import UserBalance from '../@types/UserBalance';
import Transactions from '../@types/Transactions';
import TransfersFilters from '../@types/TransfersFilters';

interface ApiProvider {
  children: ReactNode;
}

interface SignInResponse {
  token: string;
}

interface ApiContextData {
  token: string;
  signUp: (username: string, password: string) => Promise<AxiosResponse>;
  signIn: (
    username: string,
    password: string
  ) => Promise<AxiosResponse<SignInResponse>>;
  getUserBalance: () => Promise<AxiosResponse<UserBalance>>;
  getTransactions: (
    filters: TransfersFilters
  ) => Promise<AxiosResponse<Transactions>>;
  signOut: () => void;
}

export const ApiContext = createContext({} as ApiContextData);

export function ApiProvider(props: ApiProvider) {
  const [token, setToken] = useState('');

  async function signUp(
    username: string,
    password: string
  ): Promise<AxiosResponse> {
    return await api.post('/user/create', { username, password });
  }

  async function signIn(
    username: string,
    password: string
  ): Promise<AxiosResponse<SignInResponse>> {
    const response: AxiosResponse<SignInResponse> = await api.post(
      'user/login',
      { username, password }
    );

    if (response.data.token) {
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);
    }

    return response;
  }

  async function getUserBalance(): Promise<AxiosResponse<UserBalance, any>> {
    const res: AxiosResponse<UserBalance> = await api.get('/user/userdata');

    return res;
  }

  async function getTransactions(
    filters: TransfersFilters
  ): Promise<AxiosResponse<Transactions>> {
    const url = new URLSearchParams();
    if (filters.filterDate.length) url.append('filterDate', filters.filterDate);
    if (filters.filterType)
      url.append('filterType', filters.filterType.toString());
    if (filters.filterOrder) url.append('filterOrder', filters.filterOrder);

    const res: AxiosResponse<Transactions> = await api.get(
      `/transactions/transfers?` + url.toString()
    );
    return res;
  }

  function signOut() {
    setToken('');
    localStorage.removeItem('token');
    api.defaults.headers.common.authorization = ``;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token')!);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  });

  return (
    <ApiContext.Provider
      value={{
        token,
        signUp,
        signIn,
        getUserBalance,
        getTransactions,
        signOut,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}
