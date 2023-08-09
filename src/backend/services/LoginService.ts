import * as dotenv from "dotenv";
import { JwtPayload, sign, verify } from "jsonwebtoken";
dotenv.config();

export async function verifyPasswordAndCreateJWT(
  ip: string,
  password: string
): Promise<string | undefined> {
  if (!ip || !password) {
    throw new Error("ip and password must be set");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("secret not set");
  }
  const ttl = process.env.JWT_TTL;
  if (!ttl) {
    throw new Error("ttl not set");
  }

  const response = await login(password, ip);
  if (response.success == false) {
    return undefined;
  }

  const payload: JwtPayload = {
    sub: response.ip,
  };

  const jwtString = sign(payload, secret, {
    expiresIn: 6000,
    algorithm: "HS256",
  });

  return jwtString;
}

export function verifyJWT(jwtString: string | undefined): {
  ip: string
} {
  if (!jwtString) {
    throw new Error("jwtString not set");
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("secret not set");
  }

  let payload;
  try {
    payload = verify(jwtString, secret) as JwtPayload;
  } catch (error) {
    throw new Error("Verifizierung fehlgeschlagen");
  }
  const ip = payload.sub as string;
  return {
    ip: ip,
  };
}



export async function login(
    password: string,
    ip: string,
  ): Promise<{ success: boolean; ip?: string }> {
    if (!password) {
      return {
        success: false,
      };
    }

  // Password: schule@frieden-2023!

    if (password === `${process.env.PASSWORD_ENCODED}`) {
      return {
        success: true,
        ip: ip,
      };
    }

    return {
      success: false,
    };
    
  }
  