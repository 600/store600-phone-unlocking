import { NextApiHandler } from "next"
import { generateBalenaSdk } from "../../../lib/balena/balenaSdkInstance"
import { encodeIdToDigit } from "../../../lib/cipher"
import { unlockDevice } from "../../../lib/device"

const handler: NextApiHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).end()
  }
  const uuid = req.query.uuid as string
  const sdk = await generateBalenaSdk()
  const device = await sdk.models.device.get(uuid)
  const deviceId = device?.id
  if (!deviceId) {
    return res.status(400).end()
  }
  const digit = encodeIdToDigit(deviceId)
  res.json(digit)
}
export default handler