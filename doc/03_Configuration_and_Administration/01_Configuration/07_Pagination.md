---
title: Pagination
description: Configure the page size options and default page size for paginated listings.
---

# Pagination

Paginated listings in Pimcore Studio (element listings, dependency and reference tabs, reports,
search results, and similar grids) offer a page-size changer with a fixed set of options and start
with a default page size. Both are configurable:

```yaml
pimcore_studio_ui:
    pagination:
        page_size_options: '10,20,50,100'
        default_page_size: 20
```

- `page_size_options` is a comma separated list of page sizes offered in the page-size changer. 
- `default_page_size` is the page size a listing starts with before the user picks another option. The default value should be included in the `page_size_options`.

> **Note:** Elasticsearch and OpenSearch limit each request's result window (`from + size`) to
> `index.max_result_window` (10,000 by default). Keep every requested page offset plus page size
> within that limit; limiting only the largest page-size option does not prevent deep-page failures.

Both settings apply globally to the most paginated listings in the UI. 
There are exceptions for reports, previews, and classification store listings which have an individual configuration.
