import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient


async function getTaskList() {
    return await prisma.task.findMany()
}


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

            const taskList = await getTaskList()

            return res.status(200).json(taskList);

        } catch (error) {
            console.error("Error creating task", error)

            return res.status(500).json({error: `Method ${req.method} not allowed`})
        }
    } else if (req.method === 'GET') {

        try {
            
            const taskList = await getTaskList()
            if(taskList.length !== 0) {
            
                return res.status(200).json(taskList);
            } else {
                return res.status(200).json({message: "DB is empty"});
            }

        } catch (error) {
            
            console.error("Error accessing db", error)

            return res.status(500).json({error: `${error}`})
        }
    } else if (req.method === 'DELETE') {

        try {

            await prisma.task.deleteMany({})

            return res.status(200).json({message: "DB has been reset successfully"})

        } catch (error) {

            console.error("Cannot delete db", error)

            return res.status(500).json({error: `${error}`})
        }
    }

}