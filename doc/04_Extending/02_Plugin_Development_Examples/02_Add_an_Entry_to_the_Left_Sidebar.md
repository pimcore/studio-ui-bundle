---
title: How to Add an Entry to the Left Sidebar
---

# How to Add an Entry to the Left Sidebar

## Overview
Add a heart icon to the left sidebar of Pimcore Studio.

## Screenshot
![Heart Icon Example](../../img/examples/left-sidebar.png)

## Details
Add new entries to the left sidebar via the `ComponentRegistry` service from the DI container and the `leftSidebar.slot` [slot](../../01_Architecture_Overview/01_SDK_Overview/04_Component_Registry.md#slots). In this example, a heart icon is added, and clicking on it triggers a modal message.

## Code Example on GitHub
> [Left sidebar icon example on GitHub](https://github.com/pimcore/studio-example-bundle/tree/main/assets/js/src/examples/left-sidebar).
