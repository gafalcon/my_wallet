import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Auth Handler");
  const { email, name, secret } = req.body;
  // 1
  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed" });
  }
  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3
  if (email) {
    // 4
    const user = await prisma.user.create({
      data: { email, name: name || "", total_savings: 0 },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
      userId: user.id,
    });
  }
};

export default handler;
