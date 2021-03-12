import twilio from "twilio"
import { unlockDevice } from "../../../../lib/device"
import { DEFAULT_SAY_ATTRIBUTE, responseTwiml } from "../../../../lib/twiml"

export default async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse
  const digits = req.body?.Digits ?? req.query.digits ?? req.params.digits
  const callId = req.body?.CallSid
  if (!callId) { // CallSidが無い場合はtwilio外からのものとみなす
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "不正なリクエストです")
    twiml.hangup()
    responseTwiml(res, twiml)
    return
  }
  try {
    await unlockDevice(digits, callId)
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "終了します")
    twiml.hangup()
    responseTwiml(res, twiml)
  } catch {
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "存在しないデータです")
    twiml.hangup()
    responseTwiml(res, twiml)
  }
}