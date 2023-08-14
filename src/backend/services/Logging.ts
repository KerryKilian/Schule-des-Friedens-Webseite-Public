import { db } from "@/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { NextApiRequest } from "next";

export async function logAction(req: NextApiRequest, action: string) {
  const ip = (req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress) as string;
  await addDoc(collection(db, "log"), {
    ip: ip,
    action: action,
    timestamp: new Date(),
  });
}
