import { NextApiHandler } from "next"
import twilio from "twilio"
import { DEFAULT_SAY_ATTRIBUTE } from "../../../lib/twiml"

export default (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse
  twiml.say(DEFAULT_SAY_ATTRIBUTE, "入力が確認出来ません")
  twiml.hangup()
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')
  res.send(twiml.toString())
}
