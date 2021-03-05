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

  twiml.say({ voice: "man", language: "ja-JP" }, "受付けました。一分程度で解錠します")
  twiml.hangup()

  await unlockDevice(digits)
  responseTwiml(res, twiml)
}
