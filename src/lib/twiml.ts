import { NextApiResponse } from "next"
import VoiceResponse, { SayAttributes } from "twilio/lib/twiml/VoiceResponse"

export const DEFAULT_SAY_ATTRIBUTE: SayAttributes = { voice: "man", language: "ja-JP" }
export const GATHER_DIGIT_LENGTH = 8
export const responseTwiml = (res: NextApiResponse, twiml: VoiceResponse) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')
  res.send(twiml.toString())
  res.end()
}

const endpoint = "https://store600-phone-unlocking.vercel.app"

export const twiMLEndpoint = (name: string) => {
  return `${endpoint}/api/twiml/${name}.xml`
}