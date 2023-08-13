import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

async function ip(req: NextApiRequest, res: NextApiResponse) {
    // const ip = req.headers["x-real-ip"] || req.connection.remoteAddress; 127.0.0.1
    // const ip = requestIp.getClientIp(req); ::1
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).send(ip);
}
export default ip;