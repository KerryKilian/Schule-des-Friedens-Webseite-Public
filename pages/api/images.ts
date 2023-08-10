import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { NewsResource } from "../../src/Resources";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let news: NewsResource | null = null;
    let result;
    try {
      news = req.body as NewsResource;
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Wrong or missing information for resource 'news'" });
    }

    try {
      result = await addDoc(collection(db, "news"), news);
    } catch (errer: any) {
      res.status(500).send({
        error: "Error occured while trying to insert data to database.",
      });
    }

    res.status(200).json({ result: result });
  } else {
    res.status(405).send({ error: "This method is not allowed" });
  }
}
