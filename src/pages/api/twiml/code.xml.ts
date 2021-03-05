import { NextApiHandler } from "next"
import twilio from "twilio"
import { DEFAULT_SAY_ATTRIBUTE, GATHER_DIGIT_LENGTH, responseTwiml } from "../../../lib/twiml"
import { luhn } from "cdigit"
import { unlockDevice } from "../../../lib/device"

export default async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse
  const digits = req.body?.Digits ?? req.query.digits

  if (digits.length !== GATHER_DIGIT_LENGTH) {
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "受付けに失敗しました。")
    twiml.leave()
    responseTwiml(res, twiml)
    return
  }
  if (!luhn.validate(digits)) {
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "コードが正しくありません")
    twiml.leave()
    responseTwiml(res, twiml)
  }

  twiml.say(DEFAULT_SAY_ATTRIBUTE, "受付けました。")
  await unlockDevice(digits)
  twiml.say(DEFAULT_SAY_ATTRIBUTE, "終了します")
  twiml.hangup()

  responseTwiml(res, twiml)
}
