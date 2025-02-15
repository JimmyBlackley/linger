import { NextApiRequest, NextApiResponse } from "next";
import { put } from "@vercel/blob";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const blob = await put("/", file, { access: 'public' });
      res.status(200).json({ url: blob.url });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Error uploading file" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}