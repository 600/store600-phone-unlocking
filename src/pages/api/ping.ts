import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, res) => {
  res.statusCode = 200
  res.json({ ping: "ok" })
}

export default handler