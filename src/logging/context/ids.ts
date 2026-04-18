// src/logging/context/ids.ts
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

const randomId = (length: number): string => {
  const cryptoObject = globalThis.crypto

  if (cryptoObject?.getRandomValues) {
    const buffer = new Uint32Array(length)
    cryptoObject.getRandomValues(buffer)

    let result = ''
    for (let index = 0; index < buffer.length; index += 1) {
      result += alphabet[buffer[index] % alphabet.length]
    }
    return result
  }

  let fallback = ''
  for (let index = 0; index < length; index += 1) {
    fallback += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return fallback
}

export const newSessionId = (): string => `s_${randomId(16)}`
export const newRenderId = (): string => `r_${randomId(12)}`

export const getOrCreateBrowserSessionId = (
  key = 'portfolio_session_id'
): string => {
  try {
    if (typeof window === 'undefined') return newSessionId()

    const existing = window.sessionStorage.getItem(key)
    if (existing) return existing

    const created = newSessionId()
    window.sessionStorage.setItem(key, created)
    return created
  } catch {
    return newSessionId()
  }
}
