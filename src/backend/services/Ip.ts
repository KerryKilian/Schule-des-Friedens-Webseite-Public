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

export const checkIp = async (req: NextApiRequest, res: NextApiResponse) => {
  const ip = (req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress) as string;
  const q = query(collection(db, "bannedIp"), where("ip", "==", ip));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return res.status(401).send({
      errors: [
        {
          location: "request",
          msg: "You are banned from this api.",
          path: "",
          type: "field",
          value: "",
        },
      ],
    });
  }
};
