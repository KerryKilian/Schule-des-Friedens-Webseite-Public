import { checkIp } from "@/src/backend/services/Ip";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

async function ip(req: NextApiRequest, res: NextApiResponse) {
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // res.status(200).send(ip);

  await checkIp(req, res);
}
export default ip;
