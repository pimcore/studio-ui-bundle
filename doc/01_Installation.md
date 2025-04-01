# Installation of the Studio Ui Bundle

## Bundle Installation

To install the Studio Ui Bundle, follow the three steps below:

1) Make sure prerequisites are met:

- [GenericExecutionEngineBundle](https://docs.pimcore.com/platform/Pimcore/Development_Tools_and_Details/Generic_Execution_Engine/) installed and activated
- [GenericDataIndexBundle](https://docs.pimcore.com/platform/Generic_Data_Index/Installation/) installed and activated
- StudioBackendBundle installed and activated

2) Install the required dependencies:

```bash
composer require pimcore/studio-ui-bundle
```

3) Make sure the bundle is enabled in the `config/bundles.php` file. The following lines should be added:
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
