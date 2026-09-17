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

A listing served by an endpoint with a smaller limit, such as the user references tab, only offers the sizes
that endpoint accepts. Reports and the classification store picker start at a page size of their own rather
than at `default_page_size`.
