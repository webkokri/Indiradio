import { useEffect } from 'react'

/**
 * Injects a raw HTML/JS snippet (from a Sanity "custom code" field) into the
 * live DOM. Plain innerHTML doesn't execute <script> tags, so each one is
 * recreated via createElement to actually run — this is how ad/analytics
 * snippets (which are just <script> tags) get executed.
 */
export default function CustomCode({ code, target = 'body' }) {
  useEffect(() => {
    if (!code) return undefined

    const container = document.createElement('div')
    container.innerHTML = code
    const mountPoint = target === 'head' ? document.head : document.body
    const inserted = []

    Array.from(container.childNodes).forEach((node) => {
      if (node.tagName === 'SCRIPT') {
        const script = document.createElement('script')
        Array.from(node.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value))
        script.text = node.textContent
        mountPoint.appendChild(script)
        inserted.push(script)
      } else {
        mountPoint.appendChild(node)
        inserted.push(node)
      }
    })

    return () => {
      inserted.forEach((node) => {
        if (mountPoint.contains(node)) mountPoint.removeChild(node)
      })
    }
  }, [code, target])

  return null
}
