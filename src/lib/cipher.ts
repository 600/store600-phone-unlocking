import { luhn } from "cdigit"

/**
 * ヴィジュネル暗号をベースにしたID <=> digit変換。
 * balenaのIDが現状7桁なので、少し見越して8桁をベースにしている。
 * また、連番ではないが近い番号が多いので、逆順にしている
 */

const convertTable = [6, 2, 9, 7, 5, 9, 6, 4]

const encrypt = (sources: (string)[]) => {
  const digits = sources.map((d, i) => {
    return (parseInt(d) + convertTable[i]) % 10
  })
  return digits
}

const decrypt = (codes: (string)[]) => {
  const digits = codes.map((d, i) => {
    return (parseInt(d) + 10 - convertTable[i]) % 10
  })
  return digits
}


export const encodeIdToDigit = (id: string | number) => {
  const ids = id.toString().padStart(8, "0").split("")
  // 予測不能さ・誤操作率低下のため、逆順にする
  ids.reverse()
  const digs = encrypt(ids)

  // チェックディジットを付与
  return luhn.generate(digs.join(""))
}

export const decodeDigitToId = (digit: string | number) => {
  const digs = digit.toString().split("")
  digs.pop() // チェックディジットを削除
  console.log(digs)
  const ids = decrypt(digs)
  console.log(ids)
  ids.reverse()
  return parseInt(ids.join(""))
}
