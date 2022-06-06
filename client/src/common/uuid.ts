export default function uuid() {
  // ランダムなIDを生成
  const randomID = Math.random().toString(36).slice(2)
  return randomID
}
