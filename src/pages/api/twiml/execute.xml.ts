import twilio from "twilio"
import { unlockDevice } from "../../../lib/device"
import { DEFAULT_SAY_ATTRIBUTE, responseTwiml } from "../../../lib/twiml"

export default async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse
  const digits = req.body?.Digits ?? req.query.digits
  try {
    await unlockDevice(digits)
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "終了します")
    twiml.hangup()
    responseTwiml(res, twiml)
  } catch {
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "存在しないデータです")
    twiml.hangup()
    responseTwiml(res, twiml)
  }
}