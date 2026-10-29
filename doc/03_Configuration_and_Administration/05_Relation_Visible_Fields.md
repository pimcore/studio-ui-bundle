---
title: Relation Visible Fields
---

# Relation Visible Fields

The **Visible Fields** setting of the Many-to-Many Object Relation and the Advanced
Many-to-Many Object Relation chooses which fields of the related objects are shown as columns in the
relation. This page describes how Pimcore Studio loads these values and what calculated
values cost.

## How the values are loaded

1. The rows of the relation appear right away, together with the data of the object.
2. The values of the visible fields follow in separate requests, in chunks of about 200
   related objects. The chunks are requested in the order of the relation, so the rows at
   the top of the relation get their values first. The first chunk is smaller (50 related
   objects), so the rows on screen get their values quickly. A few chunks load at the same time.
3. While values are loading, a hint below the field shows the progress, for example
   *Loading visible fields… (250 of 650)*. If a request fails, the hint says that the
   visible fields could not be loaded.

The values are read with the regular Data Object grid endpoint
(`POST /pimcore-studio/api/data-objects/grid/{classId}`), filtered by the IDs of the
related objects.

> Search and column filters on visible field values only see the values that are already
> loaded. They update by themselves as more values arrive, so the results are complete
> once the hint has disappeared.

## Performance

The values of a calculated field are not stored. They are computed each time they are read.
A calculated visible field therefore runs its calculator once for every related object
shown, and once more for every row of a Data Object grid that shows the field.

A calculator that loads other objects multiplies this cost. As an example, two such
fields added about 1.7 seconds to a relation with 624 rows.

To keep large relations fast:

- Use a stored field instead of a calculated one where the value does not need to be
  computed.
- If the value has to be calculated, have the calculator read only the value it needs
  instead of loading other objects.
