---
title: Pagination
description: The page sizes Pimcore Studio offers in paginated listings, and the size a listing starts with.
---

# Pagination

Paginated listings offer a page-size changer holding 10, 20, 50 and 100, start at 20, and let a user enter a
size of their own. To change that, add this configuration:

```yaml
pimcore_studio_ui:
    pagination:
        page_size_options: [10, 20, 50, 100]
        default_page_size: 20
        max_page_size: 1000
```

`max_page_size` caps what a user may enter; it is not offered as an option. `page_size_options` also accepts a
comma separated string such as `'10,20,50,100'`.

`default_page_size` must be one of `page_size_options`, and no option may exceed `max_page_size`. Both are
checked while the container is built, so a misconfiguration fails `cache:clear` instead of breaking a listing.

Listings whose endpoint caps the page size lower — the user references tab at 100, for instance — hide the
options above their own cap. Reports and the classification store listings start at a size of their own.

> **Note — mind the search result window**
>
> Elasticsearch and OpenSearch limit each request's result window (`from + size`) to
> `index.max_result_window`, 10,000 by default. A large `max_page_size` on a deep page can exceed it.
