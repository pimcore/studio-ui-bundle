---
title: Installation of the Studio UI Bundle
---

# Installation of the Studio UI Bundle

## Bundle Installation

1) Verify these prerequisites:

- [GenericExecutionEngineBundle](https://docs.pimcore.com/platform/Pimcore/Development_Tools_and_Details/Generic_Execution_Engine/) installed and activated
- [GenericDataIndexBundle](https://docs.pimcore.com/platform/Generic_Data_Index/Installation/) installed and activated
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
