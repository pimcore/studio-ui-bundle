---
title: Auto Save
description: How Pimcore Studio automatically saves drafts for documents and data objects.
---

# Auto Save

Pimcore Studio automatically saves drafts for Documents and Data Objects. Auto-save triggers on every value change
with an 800ms debounce, creating a version with the `autoSave` task type.

## How it works

1. When an editor modifies a document or data object, an auto-save fires after 800ms of inactivity.
2. Each auto-save creates a version marked as `isAutoSave = true`. These versions are not published
   and changes remain visible only in the editor until explicitly published.
3. Auto-save respects element permissions - it only runs if the user has the `save` permission on the element.
4. If a manual save or publish is triggered while an auto-save is running, the manual operation is queued
   and executes after the auto-save completes.

## Draft restoration

When opening an element, if a newer auto-save version exists, the detail response includes draft data.
The editor can choose to restore or discard the draft.

## Publishing and auto-save cleanup

Publishing an element automatically deletes all auto-save versions for the current user.
This ensures that stale drafts do not accumulate over time.
