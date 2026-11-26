---
title: Language Flags
description: Which country flag Pimcore Studio shows for a language.
---

# Language Flags

Pimcore Studio shows a flag next to each language, for example in the language switcher of localized fields, in
the translations table and in the document translation actions. A language without a region, such as `en`, gets
the flag of a built-in mapping (`en` shows the flag of `gb`); a locale with a region, such as `en_CA`, gets the flag
of its region. To change the flag of a language, add this configuration:

```yaml
pimcore_studio_ui:
    language_flag_mapping:
        en: us
```

The keys are language codes as in `pimcore.general.valid_languages`; `en_GB`, `en-GB` and `en-gb` all mean the same
language. The values are country codes such as `us` or `gb-sct`. Each entry replaces the built-in one for that
language; languages that are not listed keep their flag.

An entry for a language also applies to its locales whose region has no flag of its own.
