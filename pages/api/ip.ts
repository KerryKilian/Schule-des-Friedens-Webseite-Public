import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ipifyResponse = await fetch("https://api6.ipify.org?format=json");
    const ipifyData = await ipifyResponse.json();
    const userIPv6 = ipifyData.ip;
    res.status(200).json({ ip: userIPv6 });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
}
