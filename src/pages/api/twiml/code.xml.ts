import { NextApiHandler } from "next"
import twilio from "twilio"
import { DEFAULT_SAY_ATTRIBUTE, GATHER_DIGIT_LENGTH, responseTwiml, twiMLEndpoint } from "../../../lib/twiml"
import { luhn } from "cdigit"
import { unlockDevice } from "../../../lib/device"

export default async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse
  const digits = req.body?.Digits ?? req.query.digits

  if (digits.length !== GATHER_DIGIT_LENGTH) {
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "受付けに失敗しました。")
    twiml.hangup()
    responseTwiml(res, twiml)
    return
  }
  // 可能な限りエラーをはやく落としたいので、チェックディジットする
  if (!luhn.validate(digits)) {
    twiml.say(DEFAULT_SAY_ATTRIBUTE, "コードが正しくありません")
    twiml.hangup()
    responseTwiml(res, twiml)
    return
  }
  twiml.say(DEFAULT_SAY_ATTRIBUTE, "受付けました。")
  twiml.redirect(twiMLEndpoint("execute"))
  responseTwiml(res, twiml)
}
