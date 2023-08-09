import { LoginResource } from "@/src/Resources";
import { verifyPasswordAndCreateJWT } from "@/src/backend/services/LoginService";
import { NextApiRequest, NextApiResponse } from "next";

async function login(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email;
    const password = req.body.password;
  
      try {
          const jwtTokenString = await verifyPasswordAndCreateJWT(email, password);
          if (jwtTokenString) {
              const loginResource: LoginResource = {
                  access_token: jwtTokenString,
                  token_type: "Bearer"
              }
              res.status(200)
                  .send(loginResource);
              return;
          }
      } catch {
          res.status(400)
      }
      res.status(400)
}

export default login;
