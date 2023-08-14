import { db } from "@/firebase";
import { NewsResource } from "@/src/Resources";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { body, validationResult } from "express-validator";
import isURL from "is-url";
import { requiresAuthentication } from "@/src/backend/services/LoginService";
import { banIp, checkBruteForce, checkIp } from "@/src/backend/services/Ip";
import { logAction } from "@/src/backend/services/Logging";

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const action = "add-news";
    await logAction(req, action);
    const ip = await requiresAuthentication(req, res);
    if (ip == null && ip == "") {
      return;
    }
    // check if ip is banned
    const banned = await checkIp(req, res);
    if (banned) {
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

    const bruteForce = await checkBruteForce(req, res, action);
    if (bruteForce) {
      return res.status(401).send({
        errors: [
          {
            location: "request",
            msg: "You are not allowed to request the api that much.",
            path: "",
            type: "field",
            value: "",
          },
        ],
      });
    }

    // validation
    await Promise.all([
      body("title")
        .exists()
        .withMessage("Title is required.")
        .isLength({ max: 100, min: 5 })
        .withMessage("Title must have min 5 and max 100 characters.")
        .custom((value) => {
          if (value.includes("<") || value.includes(">")) {
            banIp(req);
            return false;
          }
          return true;
        })
        .withMessage(
          "It seems you tried to insert harmful code. You are now banned from requesting this api."
        )
        .run(req),

      body("subtitle")
        .exists()
        .withMessage("Subtitle is required.")
        .isLength({ max: 100, min: 5 })
        .withMessage("Subtitle must have min 5 and max 100 characters.")
        .custom((value) => {
          if (value.includes("<") || value.includes(">")) {
            banIp(req);
            return false;
          }
          return true;
        })
        .withMessage(
          "It seems you tried to insert harmful code. You are now banned from requesting this api."
        )
        .run(req),

      body("authorName")
        .exists()
        .withMessage("AuthorName is required.")
        .isLength({ max: 100, min: 5 })
        .withMessage("AuthorName must have min 5 and max 100 characters.")
        .custom((value) => {
          if (value.includes("<") || value.includes(">")) {
            banIp(req);
            return false;
          }
          return true;
        })
        .withMessage(
          "It seems you tried to insert harmful code. You are now banned from requesting this api."
        )
        .run(req),

      body("text")
        .exists()
        .withMessage("Text is required.")
        .isLength({ max: 15000, min: 5 })
        .withMessage("Text must have at most 15000 characters.")
        .custom((value) => {
          if (value.includes("<") || value.includes(">")) {
            banIp(req);
            return false;
          }
          return true;
        })
        .withMessage(
          "It seems you tried to insert harmful code. You are now banned from requesting this api."
        )
        .run(req),
      body("images")
        .exists()
        .isArray()
        .withMessage("Images array is required, even tho it can be empty.")
        .custom((images) => {
          // Validate each item in the array
          for (const image of images) {
            if (!isURL(image)) {
              return false;
            }
          }
          return true;
        })
        .withMessage("Each image must be a valid URL.")
        .run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // insert data
    let news: NewsResource | null = null;
    let result;
    try {
      news = req.body as NewsResource;
    } catch (error: any) {
      return res.status(400).send({
        errors: [
          {
            location: "body",
            msg: "Wrong or missing information for resource 'news'",
            path: "",
            type: "field",
            value: "",
          },
        ],
      });
    }

    try {
      // result = await addDoc(collection(db, "news"), news);

      // instead of just inserting data, I will insert the document id as a field (for searching)
      const newsRef = doc(collection(db, "news"));
      await setDoc(newsRef, {
        ...news,
        id: newsRef.id,
        createdAt: new Date(),
        authorIp:
          req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      });
    } catch (errer: any) {
      return res.status(500).send({
        errors: [
          {
            location: "connection",
            msg: "Error occured while trying to insert data to database.",
            path: "",
            type: "",
            value: "",
          },
        ],
      });
    }

    res.status(200).json({ result: result });
  } else if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send(fetchedItems);
    } catch (error) {
      return res.status(405).send({
        errors: [
          {
            location: "connection",
            msg: "An error occured while trying to fetch data from database",
            path: "",
            type: "",
            value: "",
          },
        ],
      });
    }
  } else {
    return res.status(405).send({
      errors: [
        {
          location: "connection",
          msg: "This method is not allowed",
          path: "",
          type: "",
          value: "",
        },
      ],
    });
  }
}
