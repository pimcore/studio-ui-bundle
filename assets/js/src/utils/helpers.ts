export function onKeyEnterExecuteClick (e: any): void {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.click()
  }
}
