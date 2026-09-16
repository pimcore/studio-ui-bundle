---
title: Pagination
description: Configure the page size options, the default page size and the upper bound for custom page sizes of paginated listings.
---

# Pagination

Paginated listings in Pimcore Studio (element listings, dependency and reference tabs, search
results, notes & events, and similar grids) offer a page-size changer with a set of preset options
and start with a default page size. Users can also enter a custom page size in the page-size
changer. All three aspects are configurable:

```yaml
pimcore_studio_ui:
    pagination:
        page_size_options: [10, 20, 50, 100]
        default_page_size: 20
        max_page_size: 1000
```

- `page_size_options` are the page sizes offered in the page-size changer. A list or a comma separated
  string (e.g. `'10,20,50,100'`) is accepted; every entry must be a positive integer and the list must
  not be empty.
- `default_page_size` is the page size a listing starts with before the user picks another option.
  It must be one of `page_size_options`.
- `max_page_size` is the largest page size a user may enter as a custom option. No entry in
  `page_size_options` may exceed it. Individual listings may enforce a lower limit where the
  corresponding API endpoint caps the page size (for example the user references tab, capped at 100).

Invalid combinations are rejected when the container is built, so a misconfiguration surfaces as a
`cache:clear` error rather than a broken listing.

> **Note:** Elasticsearch and OpenSearch limit each request's result window (`from + size`) to
> `index.max_result_window` (10,000 by default). `max_page_size` bounds the page size only; keep every
> requested page offset plus page size within that limit, since a large `max_page_size` combined with
> deep pages can still exceed the result window.

These settings apply to most paginated listings in the UI. Reports and classification store listings
start with their own default page size but still offer the configured `page_size_options`.
