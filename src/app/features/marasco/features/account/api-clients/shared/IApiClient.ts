export interface IApiClient {
  _id?: string,
  name: string;
  clientId: string;
  clientSecret?: string;
  isTrusted: boolean;
  applicationType: string;
  allowedOrigins: any;
  tokenLifeTime: number;
  refreshTokenLifeTime: number;
  dateCreated?: Date;
  tokenProtocol: string;
  redirectUrl: string;
  hash? : any;
}
