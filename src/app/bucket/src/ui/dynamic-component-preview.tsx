import React, { useRef, useEffect } from "react"
import * as Babel from "@babel/standalone"

export function DynamicComponentPreview({ componentName, componentCode, componentData }: { componentName: string; componentCode: string; componentData: any }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const iframeDoc = iframeRef.current.contentDocument

      // Clear iframe content
      iframeDoc.open()
      iframeDoc.write('<div id="root"></div>')
      iframeDoc.close()

      // Append Tailwind CSS to the iframe
      const tailwindLink = iframeDoc.createElement("link")
      tailwindLink.rel = "stylesheet"
      tailwindLink.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" // Adjust version as needed
      iframeDoc.head.appendChild(tailwindLink)
      iframeDoc.body.className = "flex items-center justify-center w-full h-full"

      try {
        // Sanitize the component code
        const sanitizedCode = componentCode
          .replace(/import .*;?/g, "")
          .replace(/^export default.*;?$/m, "")
          .replace(/```/g, "")
          .replace(/data.Date.value.toLocaleDateString\(\)/g, "new Date(data.Date.value).toLocaleDateString()")

        const transpiledCode = Babel.transform(sanitizedCode, {
          filename: "virtualFile.tsx",
          presets: ["react", "typescript"],
        }).code

        // Append React and ReactDOM scripts to the iframe for use within it
        const reactScript = iframeDoc.createElement("script")
        reactScript.src = "https://unpkg.com/react@17/umd/react.development.js"
        iframeDoc.body.appendChild(reactScript)

        const reactDOMScript = iframeDoc.createElement("script")
        reactDOMScript.src = "https://unpkg.com/react-dom@17/umd/react-dom.development.js"
        reactDOMScript.onload = () => {
          const script = iframeDoc.createElement("script")
          script.type = "text/javascript"
          const innerHTML = `
            try {
              const renderProps = { data: ${JSON.stringify(componentData)} };
              ${transpiledCode}
              ReactDOM.render(React.createElement(${componentName}, renderProps), document.getElementById('root'));
            } catch (error) {
              // Send error message to parent frame
              window.parent.postMessage({ type: 'iframe-error', message: error.message }, '*');
            }
          `
          script.innerHTML = innerHTML
          iframeDoc.body.appendChild(script)
        }
        iframeDoc.body.appendChild(reactDOMScript)

        // Delay sending the success message to allow for potential errors
        setTimeout(() => {
          window.parent.postMessage({ type: "iframe-success" }, "*")
        }, 200)
      } catch (error: any) {
        console.error("Transpilation error:", error.message)
        // Handle error, e.g., prevent updating componentCode
      }
    }
  }, [componentCode])

  return <iframe className="w-full h-[504px] border" ref={iframeRef} key={componentCode}></iframe>
}
