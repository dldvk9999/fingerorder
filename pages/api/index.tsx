import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.status(404).send("Access denied");
    } else if (req.method === "POST") {
        res.status(200).send(req.body);
    }
}
