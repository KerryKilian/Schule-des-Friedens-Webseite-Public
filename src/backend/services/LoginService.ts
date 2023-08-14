import * as dotenv from "dotenv";
import { NextFunction } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
dotenv.config();

export async function verifyPasswordAndCreateJWT(
  ip: string,
  password: string
): Promise<string | undefined> {
  console.log(password);

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
  ip: string;
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
  ip: string
): Promise<{ success: boolean; ip?: string }> {
  if (!password) {
    return {
      success: false,
    };
  }

  // Password: schule@frieden-2023!

  if (password === `${process.env.PASSWORD}`) {
    return {
      success: true,
      ip: ip,
    };
  }

  return {
    success: false,
  };
}

export async function requiresAuthentication(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | null> {
  const auth = req.headers["authorization"];
  if (auth && (auth as string).startsWith("Bearer ")) {
    try {
      const jwtString = (auth as string).substring("Bearer ".length);
      if (!jwtString) {
        res.status(401).end;
        // next("Verification failed");
      }
      const info = verifyJWT(jwtString);
      return info.ip;
      // next();
    } catch (err) {
      res.status(401).end();
      // next(err)
    }
  } else {
    // not logged in
    res.status(401).end();
    // next("Verification failed");
  }
  return null;
}
