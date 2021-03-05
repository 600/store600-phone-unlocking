import { BalenaSDK, getSdk } from 'balena-sdk'

let balenaSdkInstance: undefined | BalenaSDK
export const generateBalenaSdk = async () => {
  if (!process.env.BALENA_API_KEY) {
    throw new Error("Need BALENA_API_KEY")
  }
  const apiKey = process.env.BALENA_API_KEY
  if (balenaSdkInstance) {
    return balenaSdkInstance
  }
  const balenaSdk = getSdk({
    dataDirectory: process.env.BALENA_DATA_DIR || "./.balena_tmp",
    debug: true
  })
  await balenaSdk.auth.loginWithToken(apiKey)
  balenaSdkInstance = balenaSdk
  return balenaSdkInstance
}
