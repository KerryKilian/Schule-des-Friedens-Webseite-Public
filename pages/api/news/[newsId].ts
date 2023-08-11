import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    try {
      const { newsId } = req.query;
      const q = query(collection(db, "news"), where("id", "==", newsId));
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0].data();
      res.status(200).json(doc);
      //   if (!querySnapshot.empty) {
      //     const doc = querySnapshot.docs[0];
      //     res.status(200).json(doc);
      //   }
    } catch (error) {
      res.status(404).end();
    }
  }
}
