export type UseFetchProps = {
  method: string,
  url: string,
  requireAuth?: boolean,
}

export type AxiosInstanceProps = {
  [key: string]: any
}

export type FetchDataProps = object | null