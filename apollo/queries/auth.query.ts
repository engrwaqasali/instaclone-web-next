import { gql, useQuery } from "@apollo/client";

export const AUTH_INFO_QUERY = gql`
  query Auth {
    isLoggedIn @client
    token @client
  }
`

export const useAuthInfo = () => {
  const {data} = useQuery<IAuthInfo>(AUTH_INFO_QUERY)

  return {
    isLoggedIn: !!data?.isLoggedIn,
    token: data?.token || ""
  }
}

export interface IAuthInfo {
  isLoggedIn: boolean;
  token: string;
}