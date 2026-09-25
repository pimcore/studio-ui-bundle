---
title: Content Security Policy
---

# Content Security Policy

## Overview

Pimcore Studio provides a Content Security Policy (CSP) handler that adds an additional security layer
to protect from attacks like Cross-Site Scripting (XSS) by adding a `Content-Security-Policy` HTTP header
with [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) to every Studio request.
CSP is **enabled by default**.

Read more about [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## Configuration

### Adding External URLs

To allow external URLs for CSP directives:

```yaml
# config/config.yaml
pimcore_studio_ui:
    csp_header:
        additional_urls:
            script-src:
                - 'https://cdn.example.com/scripts/analytics.js'
            style-src:
                - 'https://fonts.googleapis.com'
            connect-src:
                - 'https://api.example.com'
```

Available directives: `default-src`, `script-src`, `style-src`, `connect-src`, `font-src`, `img-src`, `media-src`, `frame-src`, `worker-src`

### Disabling CSP

```yaml
# config/config.yaml
pimcore_studio_ui:
    csp_header:
        enabled: false
```

### Excluding Paths

```yaml
# config/config.yaml
pimcore_studio_ui:
    csp_header:
        exclude_paths:
            - '/pimcore-studio/custom-endpoint'
            - '~/pimcore-studio/api/.*~'  # Regex pattern
```

### OAuth Consent Screen Exception

Neither `enabled: false` nor `exclude_paths` removes the framing protection from the OAuth consent screen at
`/pimcore-studio/oauth/consent`. That path always carries `Content-Security-Policy: frame-ancestors 'none'`
and `X-Frame-Options: DENY`, in addition to whatever the CSP handler emits.

This is deliberate. Approving an authorization request rests on the request being same-origin rather than on
a CSRF token, so a framed consent screen with an overlay above the Allow button would produce a genuine
approval. The protection therefore cannot depend on how CSP is configured. Every other Pimcore Studio path
honours both settings as documented above.

See [OAuth Consent Screen](./07_OAuth_Consent_Screen.md) for the screen itself.

## Using Nonce in Templates

Add the nonce attribute to inline scripts to prevent CSP violations:

```twig
<script {{ pimcore_studio_csp.getNonceHtmlAttribute()|raw }}>
    console.log('This script will execute safely');
</script>
```

## Extending CSP in Your Application

If your bundle or application serves resources from external origins (Rsbuild dev servers, CDNs, module federation), register these origins using the `CspEvent`.
The event is dispatched for HTML responses only; other Studio responses, such as API calls, get the policy without these origins.

### Example Subscriber

```php
<?php
namespace MyBundle\EventSubscriber;

use Pimcore\Bundle\StudioUiBundle\Event\Csp\CspEvent;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\CspOriginFileParserInterface;
use Pimcore\Bundle\StudioUiBundle\Security\Csp\ContentSecurityPolicyHandlerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final readonly class MyBundleCspSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private CspOriginFileParserInterface $cspOriginFileParser
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CspEvent::class => ['onCspEvent', 0], // Priority 0 runs after core subscribers
        ];
    }

    public function onCspEvent(CspEvent $event): void
    {
        // Option 1: Add origins extracted from files
        $remoteEntryFiles = glob(__DIR__ . '/../../public/build/*/exposeRemote.js') ?: [];
        if (!empty($remoteEntryFiles)) {
            $origins = $this->cspOriginFileParser->extractOriginsFromFiles($remoteEntryFiles);
            $event->addBuildOrigins($origins);
        }
        
        // Option 2: Manually add specific origins (added to script-src, style-src, connect-src)
        $event->addBuildOrigins([
            'http://localhost:3040',
            'https://cdn.mybundle.com',
        ]);
        
        // Option 3: Add origins to specific directives
        $cspHandler = $event->getCspHandler();
        $cspHandler->addAllowedUrls(
            ContentSecurityPolicyHandlerInterface::FONT_OPT,
            ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']
        );
    }
}
```

### Register the Subscriber

```yaml
# config/services.yaml
services:
    MyBundle\EventSubscriber\MyBundleCspSubscriber:
        tags: ['kernel.event_subscriber']
```

Alternatively, inject the `ContentSecurityPolicyHandlerInterface` directly into your services for configuration-time setup.

## Troubleshooting

- **CSP violations**: Ensure inline scripts have nonce attributes and external origins are registered
- **Dev servers**: Development server origins (e.g., `http://localhost:3030`, `http://localhost:3031`)
  are automatically detected from entry point JSON files. Add additional bundle-specific dev servers
  through a `CspEvent` subscriber (e.g., by scanning additional files or manually specifying origins)
- **Production**: Configure additional resources in `additional_urls` (e.g., CDN origins)

