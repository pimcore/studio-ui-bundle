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

> **Note:** Elasticsearch and OpenSearch limit how many results can be fetched in a single request
> (by default 10,000, controlled by the `index.max_result_window` index setting). Make sure the
> largest value in `page_size_options` does not exceed that limit, or listings using it will fail.

Both settings apply globally to all paginated listings in the UI.
