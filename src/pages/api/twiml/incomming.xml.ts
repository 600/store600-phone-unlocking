import { NextApiHandler } from "next"
import twilio from "twilio"
import { DEFAULT_SAY_ATTRIBUTE, GATHER_DIGIT_LENGTH, responseTwiml, twiMLEndpoint } from "../../../lib/twiml"

const handler: NextApiHandler = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse
  twiml.gather({
    action: twiMLEndpoint("code"),
    numDigits: GATHER_DIGIT_LENGTH,
    timeout: 3,
    debug: true,
    input: ["dtmf"],
    finishOnKey: "#",
  }).say(DEFAULT_SAY_ATTRIBUTE, "コードを入力してください")
  twiml.redirect(twiMLEndpoint("empty"))

  return responseTwiml(res, twiml)
}

export default handler