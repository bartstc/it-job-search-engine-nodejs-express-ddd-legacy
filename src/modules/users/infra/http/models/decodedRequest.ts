import express from "express";
import { JWTClaims } from "../../../domain";

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims;
}
