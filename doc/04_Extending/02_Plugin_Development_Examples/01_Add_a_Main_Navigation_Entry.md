---
title: How to Add a Main Navigation Entry
---

# How to Add a Main Navigation Entry

## Overview
Add a new main navigation entry to Pimcore Studio.

## Screenshot
![Main Nav Entry Example](../../img/examples/additional-main-nav-entry.png)

## Details
Register new entries to the main navigation via the `MainNavRegistry` service from the DI container. The levels of the navigation are automatically created based on the path (e.g., 'Example Plugin/Example Tool'), but it is a good idea to define additional properties such as the icon or an alternative name/label.

## Code Example on GitHub
> [Additional main navigation example on GitHub](https://github.com/pimcore/studio-example-bundle/tree/main/assets/js/src/examples/main-nav-entry).



