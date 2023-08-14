import { db } from "@/firebase";
import { NextFunction } from "express";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Insert ip adress if the input was detected harmful.
 * @param req NextApiRequest
 */
export const banIp = async (req: NextApiRequest) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  await addDoc(collection(db, "bannedIp"), {
    ip: ip,
    timestamp: new Date(),
    reason:
      "This ip tried to insert harmful code. Checked value for '<' and '>'.",
  });
};

/**
 *
 * @param req
 * @param res
 * @returns true if banned, false if not banned
 */
export const checkIp = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const ip = (req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress) as string;
  const q = query(collection(db, "bannedIp"), where("ip", "==", ip));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // ip is saved in database
    return true;
  }
  // ip is not saved in database
  return false;
};
