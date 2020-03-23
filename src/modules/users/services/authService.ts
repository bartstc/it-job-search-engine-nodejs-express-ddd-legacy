import { JWTToken, JWTClaims, RefreshToken, User } from "../domain";

export interface IAuthService {
  signJWT(props: JWTClaims): JWTToken;
  decodeJWT(token: string): Promise<JWTClaims>;
  createRefreshToken(): RefreshToken;
  getTokens(username: string): Promise<string[]>;
  saveAuthenticatedUser(user: User): Promise<void>;
  deAuthenticateUser(username: string): Promise<void>;
  refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>;
  getUserNameFromRefreshToken(refreshToken: RefreshToken): Promise<string>;
}
