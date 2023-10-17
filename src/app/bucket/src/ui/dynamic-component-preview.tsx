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

      // Remove the 'export default' statement from the code
      const sanitizedCode = componentCode
        .replace(/import .*;/g, "")
        .replace(/^export default.*;$/m, "")
        .replace(/```/g, "")
        .replace(/data.Date.value.toLocaleDateString\(\)/g, "new Date(data.Date.value).toLocaleDateString()")

      console.log("sanitizedCode")
      console.log(sanitizedCode)

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
          const componentData = { data: ${JSON.stringify(componentData)} };
          ${transpiledCode}
          ReactDOM.render(React.createElement(${componentName}, componentData), document.getElementById('root'));
        `
        console.log({ innerHTML })
        script.innerHTML = innerHTML
        iframeDoc.body.appendChild(script)
      }
      iframeDoc.body.appendChild(reactDOMScript)
    }
  }, [componentCode])

  return <iframe ref={iframeRef}></iframe>
}
