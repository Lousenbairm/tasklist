//resource level task

import { prisma } from "@/app/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.task.delete({
        where: {
          id: id as string,
        },
      });

      return res
        .status(200)
        .json({ message: "DB has been reset successfully" });
    } catch (error) {
      console.error("Cannot delete db", error);

      return res.status(500).json({ error: `${error}` });
    }
  }
}
