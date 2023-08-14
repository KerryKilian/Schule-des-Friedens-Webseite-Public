import { db } from "@/firebase";
import { NextFunction } from "express";
import {
  Timestamp,
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

/**
 *
 * @param req
 * @param res
 * @param action
 * @returns true, if more than 5 request in the last 10 minutes, false if not
 */
export async function checkBruteForce(
  req: NextApiRequest,
  res: NextApiResponse,
  action: string
): Promise<boolean> {
  const ip = (req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress) as string;
  const currentTime = Timestamp.now();
  const tenMinutesAgo = new Timestamp(
    currentTime.seconds - 600,
    currentTime.nanoseconds
  );
  const q = query(
    collection(db, "log"),
    where("ip", "==", ip),
    where("timestamp", ">", tenMinutesAgo)
  );

  const querySnapshot = await getDocs(q);
  const requestCount = querySnapshot.size;

  // More than 5 requests from the same IP in the last 10 minutes
  if (requestCount > 5) {
    return true;
  } else {
    return false;
  }
}
