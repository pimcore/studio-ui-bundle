# Installation of the xTemplate Bundlex

:::info

 This bundle is only supported on Pimcore Core Framework 11.

:::

 ## Bundle Installation

To install the xTemplate Bundlex, follow the three steps below:

1) Install the required dependencies:

```bash
composer require pimcore/x-template-name-bundle-x
```

2) Make sure the bundle is enabled in the `config/bundles.php` file. The following lines should be added:
```php
use Pimcore\Bundle\xTemplateBundlex\PimcorexTemplateBundlex;
// ...
return [
    // ...
    xTemplateBundlex::class => ['all' => true],
    // ...
];  
```

3) Install the bundle:

```bash
bin/console pimcore:bundle:install PimcorexTemplateBundlex
```