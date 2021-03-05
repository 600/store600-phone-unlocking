/** 
 * ヴィジュネル暗号をベースにしたID <=> digit変換。
 * balenaのIDが現状7桁なので、少し見越して8桁をベースにしている。
 * また、連番ではないが近い番号が多いので、逆順にしている
 */

const convertTable = [6, 2, 9, 7, 5, 9, 6, 4]

export const encodeIdToDigit = (id: string | number) => {
  const ids = id.toString().padStart(8, "0").split("")
  ids.reverse()
  const digits = ids.map((d, i) => {
    return (parseInt(d) + convertTable[i]) % 10
  })
  return digits.join("")
}

export const decodeDigitToId = (digit: string | number) => {
  const digs = digit.toString().split("")

  const ids = digs.map((d, i) => {
    // 負数をmodしてしまうと、javascriptの場合不都合な値が返ってくるので、10-table値を加算する
    return (parseInt(d) + (10 - convertTable[i])) % 10
  })
  ids.reverse()
  return parseInt(ids.join(""))
}
