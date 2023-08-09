import { db } from "@/firebase";
import { NewsResource } from "@/src/Resources";
import { addDoc, collection } from "firebase/firestore";
import { MongoClient } from "mongodb";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";


async function add(req: any, res: any) {
  if (req.method === "POST") {
    try {
        const news: NewsResource = req.body;
        const result = addDoc(collection(db, "news"), news);

        res.status(201).json({ message: "OK", result: result });
      
    } catch (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === "GET") {

    res
      .status(200)
  } 
}

export default add;
