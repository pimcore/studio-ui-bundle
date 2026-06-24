---
title: Twig Operator (Grid Advanced Columns)
---

# Twig Operator (Grid Advanced Columns)

The **Twig Operator** is a grid transformer for Data Object **Advanced Columns**.
It lets you compose one or more field values into a single, freely formatted cell
by rendering a [Twig](https://twig.symfony.com/) template. Use it to build summary
columns, concatenate fields, format dates and numbers, render small pieces of HTML,
or apply conditional logic.

## Where to find it in the UI

1. Open a Data Object grid and edit the **column configuration**.
2. Add an **Advanced Column** (`dataobject.advanced`).
3. Add one or more data sources (`simpleField`, `relationField`, or `staticText`). **Every field you want to use in the template must be
   declared here.**
4. Add a **Transformer** and pick **Twig Operator** (listed under the *Other* group).
5. Write your template in the **Twig Template** code field. The default is `{{ value }}`.

## How the `value` variable is structured

The template is rendered with exactly **one** variable, `value`. It is **always a
keyed map** of field name → field value, with one entry per data source – even when
the column has only a single data source. `value` is therefore never the bare value
of a field; you always reach a field through its key.

This matters: printing the bare variable

```twig
{{ value }}
```

does **not** print a field value – it tries to stringify the whole map, which is
almost never what you want. Always address a specific key, e.g. `{{ value.name }}`.

### Direct fields (`simpleField`, `staticText`)

A data source that is read directly from the object is exposed under its field name:

```twig
{{ value.name }}          {# from a simpleField with "field": "name" #}
{{ value.productionYear }}
```

### Relation fields (`relationField`) – relation-aware nesting

When a value is resolved **through a relation**, it is nested one level deeper, under
the **relation name**. This lets you distinguish a field on the object itself from a
same-named field on a related object:

| Data source                                   | Access in the template            |
|------------------------------------------------|-----------------------------------|
| `simpleField` `field: name`                    | `{{ value.name }}`                |
| `relationField` `relation: manufacturer`, `field: name` | `{{ value.manufacturer.name }}` |

So `{{ value.name }}` is the car's own name, while `{{ value.manufacturer.name }}`
is the related manufacturer's name.

### What each field contains

The value of a key is the **resolved field value as plain data** – the operator
deliberately passes plain strings/arrays rather than wrapped objects. Depending on
the field type a key may hold:

- a **scalar** (string / number / bool) – most input, numeric, select, date fields;
- an **array** – multiselect fields, or relation fields that resolve multiple values;
- a **nested array** – relation sub-fields, keyed by relation name (see above).

## Available tags, functions & filters

Templates are rendered inside a [Twig sandbox](https://twig.symfony.com/doc/3.x/api.html#sandbox-extension).
**Only** the tags, filters and functions listed below are allowed. Anything else –
arbitrary method calls, property access, `include`/`source`, etc. – is rejected and
the template fails to render. This prevents arbitrary code execution and information
disclosure through user-provided templates.

The lists below are the **defaults** shipped by the Studio Backend bundle.

### Tags

```
if    for    set
```

### Functions

```
date    max    min    random    range
```

### Filters

**Core (always available):**

```
abs           capitalize    date          date_modify   default
escape        filter        find          first         format
join          json_encode   keys          last          length
lower         map           merge         nl2br         number_format
raw           reduce        replace       reverse       round
shuffle       slice         sort          split         striptags
title         trim          upper         url_encode
```

**Localization** (require [`twig/intl-extra`](https://packagist.org/packages/twig/intl-extra)
and the PHP `intl` extension):

```
country_name      currency_name     currency_symbol   format_currency
format_date       format_datetime   format_number     format_time
language_name     locale_name
```

**String** (require [`twig/string-extra`](https://packagist.org/packages/twig/string-extra)):

```
plural    singular
```

> The localization and string filters depend on the corresponding Twig *extra*
> packages being installed and registered (they are auto-registered by
> `twig/extra-bundle`).

### Customising the allow-list

The allow-list is **server-side configuration** of the Studio Backend bundle and can
be tightened or extended per project:

```yaml
# config/packages/pimcore_studio_backend.yaml
pimcore_studio_backend:
    twig:
        sandbox_security_policy:
            tags:      [ 'if', 'for', 'set' ]
            filters:   [ 'upper', 'lower', 'format_date' ]
            functions: [ 'date', 'max', 'min' ]
```

> **Security.** Be careful when extending the allow-list:
> - `raw` disables output escaping → potential **XSS** if the value is rendered as HTML.
> - `range` combined with `for` can build very large outputs (resource abuse).
> - Never add `constant`, `attribute`, `include` or `source` – they can expose
>   internal data or read files.

## Examples

### Concatenate fields

Data sources: `simpleField: name`, `relationField relation: manufacturer, field: name`.

```twig
{{ value.manufacturer.name }} {{ value.name }}
```

### Format a number and a date

```twig
{{ value.price|number_format(2, '.', ',') }} €
– built {{ value.productionDate|date('d.m.Y') }}
```

### Provide a fallback for empty values

```twig
{{ value.nickname|default('–') }}
```

### Join a multiselect / multi-relation field

```twig
{{ value.colors|join(', ') }}
```

### Conditional rendering and loops

```twig
{% if value.color is iterable %}
  <ul>
    {% for color in value.color %}<li>{{ color }}</li>{% endfor %}
  </ul>
{% else %}
  <em>No colors available.</em>
{% endif %}
```

## Tips & tricks

- **Guard against missing values** with `default` and `is defined`:
  ```twig
  {{ value.subtitle|default('') }}
  {% if value.manufacturer is defined %}{{ value.manufacturer.name }}{% endif %}
  ```
- **Check type before iterating.** Single- vs multi-value fields differ; use
  `is iterable` before a `for` loop (see the example above).
- **Inspect unknown columns** with `{{ value|json_encode }}` while building the
  template, then remove it.
- **Output is escaped by default.** Twig auto-escapes for safety. Use `raw` only for
  values you fully trust, and only if `raw` is in your allow-list – it re-opens the
  door to XSS.
- **Format, don't compute.** The sandbox blocks method/property calls on objects;
  keep templates to formatting and presentation. For logic that needs services or
  complex computation, use a **PHP Code** transformer instead.
- **Export-friendly.** The rendered result is a string, so Twig Operator columns work
  in grid exports – but remember HTML markup will appear verbatim in CSV/XLSX output.
- **A failed template fails the column.** Invalid Twig (or use of a disallowed
  tag/filter/function) raises an error instead of rendering – test incrementally.

## Related documentation

- **Grid architecture & all transformers** (backend reference, incl. the full sandbox
  policy and other transformers such as *Combine*, *Blur*, *Translate*, *PHP Code*):
  [Grid](https://github.com/pimcore/studio-backend-bundle/blob/2026.x/doc/01_Architecture_Overview/01_Grid.md)
  in the Studio Backend bundle.
- **Adding your own grid column types:**
  [How to Add a Custom Grid Column](../../04_Extending/02_Plugin_Development_Examples/18_Custom_Grid_Column.md).
