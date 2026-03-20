export const createDynamicRemote = (bundleName: string, optional: boolean = false) => {
  const urlExpression = bundleName === 'pimcore_studio_ui_bundle'
    ? `window.StudioUIBundleRemoteUrl`
    : `window.pluginRemotes['${bundleName}']`;

  const handleUnavailable = optional
    ? `resolve(emptyContainer);`
    : `throw new Error('Required remote "${bundleName}" is not available');`;

  const handleLoadError = optional
    ? `resolve(emptyContainer);`
    : `throw new Error('Failed to load required remote "${bundleName}" from ' + remoteUrl);`;

  return `promise new Promise((resolve) => {
    const emptyContainer = {
      get: () => Promise.resolve(() => ({})),
      init: () => {}
    }

    const remoteUrl = ${urlExpression}

    if (!remoteUrl) {
      ${handleUnavailable}
      return
    }

    // Check if the container is already available
    if (window['${bundleName}']) {
      resolve({
        get: (request) => window['${bundleName}'].get(request),
        init: (...arg) => {
          try {
            return window['${bundleName}'].init(...arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      })
      return
    }

    const script = document.createElement('script')
    script.src = remoteUrl
    script.onload = () => {
      const proxy = {
        get: (request) => window['${bundleName}'].get(request),
        init: (...arg) => {
          try {
            return window['${bundleName}'].init(...arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    script.onerror = () => {
      ${handleLoadError}
    }
    document.head.appendChild(script);
  })
  `
}
