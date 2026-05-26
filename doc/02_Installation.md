---
title: Installation of the Studio UI Bundle
---

# Installation of the Studio UI Bundle

## Bundle Installation

1) Verify these prerequisites:

- [GenericExecutionEngineBundle](https://github.com/pimcore/pimcore/blob/2026.x/doc/09_Development_Tools/01_Generic_Execution_Engine/README.md) installed and activated
- [GenericDataIndexBundle](https://github.com/pimcore/generic-data-index-bundle/blob/2026.x/doc/01_Installation/README.md) installed and activated
- StudioBackendBundle installed and activated

2) Install the required dependencies:

```bash
composer require pimcore/studio-ui-bundle
```

3) Add the bundle to `config/bundles.php`:
```php
use Pimcore\Bundle\StudioUiBundle\PimcoreStudioUiBundle;
// ...
return [
    // ...
    PimcoreStudioUiBundle::class => ['all' => true],
    // ...
];  
```

4) Install the bundle:

```bash
bin/console pimcore:bundle:install PimcoreStudioUiBundle
```
