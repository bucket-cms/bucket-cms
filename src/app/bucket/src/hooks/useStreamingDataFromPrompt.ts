export type Message = {
  role: "system" | "user" | "assistant"
  content: string
}

export const useStreamingDataFromPrompt = async ({
  prompt,
  messages,
  onData,
  onError,
  onDone,
  model,
}: {
  onData: (data: string) => void
  prompt?: string
  messages?: Message[]
  onError?: () => void
  onDone?: (data: string) => void
  model?: string
}) => {
  if (!prompt && !messages) {
    throw new Error("Must provide a prompt or messages")
  }

  let payload = {
    messages: messages || [{ role: "user", content: prompt, model }],
    model: model || "gpt-4",
  }

  const response = await fetch("/api/bucket/ai/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const stream = response.body
  if (!stream) {
    console.log("No stream detected")
    if (onError) {
      onError()
    }
    return
  }

  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let done = false
  let responseString = ""

  setTimeout(() => {
    if (responseString === "") {
      console.log("stream response timeout")
      if (onError) {
        onError()
      }
      done = true
      return
    }
  }, 4000)

  while (!done) {
    try {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      responseString += decoder.decode(value)
      onData(responseString)
    } catch (error) {
      console.error("Error reading from stream:", error)
    }
  }

  if (done && onDone) {
    onDone(responseString)
  }
  return
}
