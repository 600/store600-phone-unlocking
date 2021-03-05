import { decodeDigitToId, encodeIdToDigit } from "../cipher"

test("固定値テスト", () => {
  const id = "4061133"
  const dig = encodeIdToDigit(id)
  expect(dig).toBe("950819045")
  const revertId = decodeDigitToId(dig)
  expect(revertId.toString()).toBe(id)
})

test("乱数テスト", () => {
  for (let i = 0;i < 10;i++) {
    const id = Math.ceil(Math.random() * 10000000)
    const dig = encodeIdToDigit(id)
    const revertId = decodeDigitToId(dig)
    expect(revertId).toBe(id)
  }
})
