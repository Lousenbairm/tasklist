import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'POST') {
        const {task, desc, status} = req.body;

        if(!task || !desc || !status) {
            return res.status(400).json({error : "All fields are required"})
        }

        try {

            const newTask = await prisma.task.create({
                data : {
                    task,
                    desc,
                    status,
                },
            });

            return res.status(200).json(newTask);

        } catch (error) {
            console.error("Error creating task", error)

            return res.status(500).json({error: `Method ${req.method} not allowed`})
        }
    }

}