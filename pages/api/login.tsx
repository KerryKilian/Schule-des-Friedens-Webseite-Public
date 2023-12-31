import { LoginResource } from "@/src/Resources";
import { logAction } from "@/src/backend/services/Logging";
import { verifyPasswordAndCreateJWT } from "@/src/backend/services/LoginService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
   
  const request = JSON.parse(req.body);
  const password = request.password;
  let ip;
  try {
    await logAction(req, "login");
    // In development it will show the right adress
    ip = (req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress) as string;
  } catch (error) {
    return res.status(500).send({
      errors: [
        {
          location: "connection",
          msg: "Error occured while trying to get ip address.",
          path: "",
          type: "",
          value: "",
        },
      ],
    });
  }

  try {
    const jwtTokenString = await verifyPasswordAndCreateJWT(ip, password);
    res.status(200).send({ jwtTokenString });
    if (jwtTokenString) {
      const loginResource: LoginResource = {
        access_token: jwtTokenString,
        token_type: "Bearer",
      };
      // return res.status(200).send(loginResource);
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(400).send({ error });
  }
  res.status(400).end();
   
}
}


