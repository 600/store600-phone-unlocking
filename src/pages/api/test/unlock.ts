import { NextApiHandler } from "next"
import { unlockDevice } from "../../../lib/device"

const handler: NextApiHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).end()
  }
  const digit = req.query.digit as string
  await unlockDevice(parseInt(digit))
  res.end()
}

export default handler