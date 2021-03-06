import { getSdk } from 'balena-sdk'
import { encodeIdToDigit } from '../src/lib/cipher'


const showPins = async () => {

  const balenaSdk = getSdk()

  const devices = await balenaSdk.models.device.getAllByApplication("store600-production-rpi4")
  // encodeIdToDigit

  devices.map(device => {
    const { device_name, id } = device
    const pin = encodeIdToDigit(id)
    // @ts-ignore
    const formatted = new Intl.NumberFormat('ja', { minimumIntegerDigits: 9 }).format(pin)
      .replaceAll(",", "-")
    console.log([device_name, formatted].join("\t"))
  })
}

showPins()