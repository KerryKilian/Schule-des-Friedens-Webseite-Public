import { LoginResource } from "@/src/Resources";
import { verifyPasswordAndCreateJWT } from "@/src/backend/services/LoginService";
import { NextApiRequest, NextApiResponse } from "next";

async function login(req: NextApiRequest, res: NextApiResponse) {
  const request = JSON.parse(req.body);
  const password = request.password;
  let ip;
  try {
    // I dont want to use third party library. Also propably it will take the servers ip and not the users ip.
    // const ipifyResponse = await fetch("https://api6.ipify.org?format=json");
    // const ipifyData = await ipifyResponse.json();
    // ip = ipifyData.ip; // IPv6

    // In development it will show the right adress
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
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
      return res.status(200).send(loginResource);
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(400).send({ error });
  }
  res.status(400);
}

export default login;
