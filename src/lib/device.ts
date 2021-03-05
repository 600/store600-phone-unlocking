import { generateBalenaSdk } from './balena/balenaSdkInstance'
import { decodeDigitToId } from "./cipher"
import axios from 'axios'
import jwt from "jsonwebtoken"
import Eckles from "eckles"

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
  const privatePem = Eckles.exportSync({
    jwk: JSON.parse(process.env.JWT_SIGNING_PRIVATE_KEY)
  })
  console.log("UID", userId)
  // const privateJwk = await parseJwk(JSON.parse(process.env.JWT_SIGNING_PRIVATE_KEY))
  const token = jwt.sign({
    uid: userId
  }, privatePem, {
    algorithm: "ES256",
    expiresIn: "5m",
    issuer: "store600-phone-unlocking"
  })
  return token
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