"use client"
import { useState } from "react"
import { Button, Input, Label, Textarea } from "../../../bucket/src/ui"

function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Network response was not ok")
      }

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
      setErrorMessage("")
    } catch (error: any) {
      setSuccess(false)
      setErrorMessage(error.message ? error.message : "There was an error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {success ? (
        <div className="mt-12 text-xl text-green-500">Your message has been sent successfully!</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 text-left py-8">
            <div className="sm:col-span-2">
              <Label className="text-base opacity-60" htmlFor="name">
                What’s your name?
              </Label>
              <div>
                <Input required type="text" name="name" id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-base opacity-60" htmlFor="email">
                Email (please)
              </Label>
              <div>
                <Input required type="email" name="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-base opacity-60" htmlFor="message">
                What’s up?
              </Label>
              <div className="border">
                <Textarea required name="message" id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
            </div>
          </div>
          {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
          <div className="w-full flex justify-center">
            {loading ? (
              <Button className="h-auto text-xl py-3 px-8" type="button" disabled>
                Sending...
              </Button>
            ) : (
              <Button className="h-auto text-xl py-3 px-8" type="submit">
                Send to Bucket
              </Button>
            )}
          </div>
        </>
      )}
    </form>
  )
}

export default ContactForm
