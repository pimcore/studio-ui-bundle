export function downloadFile(filename: string, content: any): void {
  const url = URL.createObjectURL(content)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function downloadJsonFile(filename: string, content: Blob): void {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
  downloadFile(filename, blob)
}