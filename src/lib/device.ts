import { generateBalenaSdk } from './balena/balenaSdkInstance'
import { decodeDigitToId } from "./cipher"
import parseJwk from 'jose/jwk/parse'
import SignJWT from 'jose/jwt/sign'
import axios from 'axios'

export const generateBackendEndpoint = (pathname: string) => {
  const backendApi = process.env.BACKEND_API
  if (!backendApi) {
    throw new Error("Need process.env.BACKEND_API")
  }
  const endpoint = Object.assign(new URL(backendApi), {
    pathname
  }).toString()
  return endpoint
}


const generateAuthToken = async (userId: string) => {
  const sign = await parseJwk(JSON.parse(process.env.JWT_SIGNING_PRIVATE_KEY))
  const jwt = await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    .setIssuer("store600-phone-unlocking")
    .setExpirationTime("5m")
    .sign(sign)
  return jwt
}
export const unlockDevice = async (digit: number) => {
  const id = decodeDigitToId(digit)
  const balenaSdk = await generateBalenaSdk()
  const device = await balenaSdk.models.device.get(id)
  const deviceUuid = device.uuid
  const token = await generateAuthToken("anonymous")

  const option = {
    headers: {
      Authorization: `Bearer: ${token}`
    }
  }
  const endpoint = generateBackendEndpoint(`/api/externals/edge-device/devices/${deviceUuid}/unlockings`)

  // console.log(endpoint, params, option)
  return await axios.post(endpoint, {}, option)
}