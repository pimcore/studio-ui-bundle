---
title: Pagination
description: The page sizes Pimcore Studio offers in paginated listings, and the size a listing starts with.
---

# Pagination

Paginated listings in Pimcore Studio — element listings, dependency and reference tabs, search results, notes
and events, and similar grids — offer a page-size changer holding 10, 20, 50 and 100, start at 20, and let a
user enter a size of their own. To change that, add this configuration:

```yaml
pimcore_studio_ui:
    pagination:
        page_size_options: [10, 20, 50, 100]
        default_page_size: 20
        max_page_size: 1000
```

| Setting | Default | What it sets |
|---|---|---|
| `page_size_options` | `[10, 20, 50, 100]` | The sizes offered in the page-size changer |
| `default_page_size` | `20` | The size a listing starts with, before the user picks another one |
| `max_page_size` | `1000` | The largest size a user may enter as a custom option |

`page_size_options` also accepts a comma separated string such as `'10,20,50,100'`, which is convenient for an
environment variable. Surrounding whitespace, empty entries and duplicates are dropped either way.

Every entry must be a positive integer, the list must not be empty, `default_page_size` must be one of the
options, and no option may exceed `max_page_size`. These rules are checked while the container is built, so a
misconfiguration surfaces as a `cache:clear` error rather than as a broken listing.

## Listings with a lower limit

Some listings are served by an endpoint that caps the page size itself — the user references tab, for
instance, rejects anything above 100. Such a listing hides the configured options above its own cap and starts
within it, so raising `default_page_size` or `max_page_size` beyond an endpoint's limit never produces a
rejected request.

Reports and the classification store listings start at a size of their own instead of `default_page_size`, but
still offer the configured `page_size_options`.

## Large page sizes

> **Note — mind the search result window**
>
> Elasticsearch and OpenSearch limit each request's result window (`from + size`) to
> `index.max_result_window`, 10,000 by default. `max_page_size` bounds the page size alone, so a generous value
> combined with a deep page can still exceed that window. Keep page offset plus page size within it.
