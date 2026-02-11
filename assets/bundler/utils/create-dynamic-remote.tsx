export const createDynamicRemote = (bundleName: string) => {
  const urlExpression = bundleName === 'pimcore_studio_ui_bundle'
    ? `window.StudioUIBundleRemoteUrl` 
    : `window.pluginRemotes['${bundleName}']`;
    
  return `promise new Promise(resolve => {
    const remoteUrl = ${urlExpression}
    
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
    document.head.appendChild(script);
  })
  `
}
