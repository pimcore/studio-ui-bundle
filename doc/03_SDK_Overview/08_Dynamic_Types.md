# Dynamic Types

## Introduction

Dynamic types are a key concept of studio, designed to provide a flexible and structured approach to define how various parts of an application should behave. At the core of a dynamic type is an abstract base class, which acts as a blueprint for all subtypes. This base class outlines the necessary structure and implementation details required to address specific use cases.

## Common Use Cases

### Object data-/layout-types
In terms of objects, dynamic types outline the different data and layout types, as well as their handling in various scenarios. They are perfect boilerplate for creating/extend types by leading through all the different implementation details. Reaching from the edit-view to versions as well as the listings.

### Meta-Data
Dynamic types play a crucial role in managing asset meta-data. They describe how meta-data should be handled in various scenarios. For example how they should be displayed in a grid or how the data should be displayed in the version view.

### Grid-Cells
For grid cells, dynamic types describe how each cell should behave based on its specific type. It defines how a value of an cell should be rendered and also whether it should be editable or not.
Grid-Cell types reach from simple text to images or even more complex types. It's up to you.

### Assets
Defines which types (image, audio, folder, etc.) are available in studio

### Batch-Edit
In the context of batch editing, dynamic types specify how form fields should behave.

### Field-Filters
Dynamic types also govern the behavior of filters within grids. By defining these filters, developers can ensure that a suitable ui-component is used for data- or asset-metadata-type.

## Overriding Dynamic Types

One of the key features of dynamic types is their ability to be overridden by plugins, since there are still just services available in the DI-Container. This allows developers to define new behaviors and customize the application to meet specific requirements. By leveraging plugins, the application can adapt to a wide range of scenarios and evolve over time.
