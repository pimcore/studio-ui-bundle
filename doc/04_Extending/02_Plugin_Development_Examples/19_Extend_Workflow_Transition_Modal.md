---
title: How to Extend the Workflow Transition Modal
---

# How to Extend the Workflow Transition Modal

## Overview

This example adds a custom multi-select reviewers field to the
workflow transition modal and persists the selected reviewers as
part of the workflow note via a Symfony Workflow event subscriber.

Before reaching for a UI extension, check whether your use case is
already covered by the
[`additionalFields` option in the workflow configuration](https://docs.pimcore.com/platform/Pimcore/Workflow_Management/Workflow_Tutorial/).
Static select boxes, single-user pickers, checkboxes, date pickers
and similar inputs can be declared directly in the workflow YAML
config — no plugin code required. Use the slot mechanism described
below when you need behavior the YAML config cannot express:
filtered option lists, options that depend on the current element,
asynchronously fetched data, or multi-select widgets.

## Extension points

The workflow transition modal exposes three slot positions and one
overridable modal component:

| Name | Type | Purpose |
|---|---|---|
| `element.editor.workflow.modal.slots.top` | Slot | Content above the form (banners, summaries). Rendered outside the form. |
| `element.editor.workflow.modal.slots.center` | Slot | Form fields rendered between the YAML-declared additional fields and the notes textarea. Use this for custom `<Form.Item>` inputs. |
| `element.editor.workflow.modal.slots.bottom` | Slot | Content below the form (footnotes, links). Rendered outside the form. |
| `element.editor.workflow.modal` | Single | The complete modal component. Override only if you need full control over modal chrome and submission. |

Slot components rendered into `…slots.center` sit inside the same
antd `<Form>` as the rest of the modal. Any `<Form.Item name="…">`
inside the slot component automatically participates in the form
context, and its value flows into the workflow submission payload
under `additional.<name>` without any additional wiring.

## Files Overview

| Layer | File | Purpose |
|---|---|---|
| Backend | [workflow.yaml] | Example workflow definition |
| Backend | [WorkflowReviewersSubscriber.php] | Reads `additional.reviewers` from the transition context and appends it to the workflow note |
| Backend | [services.yaml] | Service registration |
| UI | [reviewers-field.tsx] | React `<Form.Item>` rendered into the modal's center slot |
| UI | [workflow-modal-extension-module.tsx] | Registers the slot component |
| UI | [index.ts] | Plugin entry point |
| UI | [plugins.ts] | Plugin export |

[workflow.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/pimcore/workflow.yaml
[WorkflowReviewersSubscriber.php]: https://github.com/pimcore/studio-example-bundle/blob/main/src/EventSubscriber/WorkflowReviewersSubscriber.php
[services.yaml]: https://github.com/pimcore/studio-example-bundle/blob/main/config/services.yaml
[reviewers-field.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/workflow-modal-extension/components/reviewers-field.tsx
[workflow-modal-extension-module.tsx]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/workflow-modal-extension/modules/workflow-modal-extension-module.tsx
[index.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/examples/workflow-modal-extension/index.ts
[plugins.ts]: https://github.com/pimcore/studio-example-bundle/blob/main/assets/js/src/plugins.ts

## Details

### Registering a slot component

A plugin registers a React component into one of the workflow modal
slots via the `ComponentRegistry`:

```typescript
componentRegistry.registerToSlot(
  componentConfig.element.editor.workflow.modal.slots.center.name,
  {
    name: 'reviewers',
    priority: 100,
    component: ReviewersField
  }
)
```

### Filtering by workflow and element context

A slot component renders for every workflow modal open by default.
Use the existing context hooks to filter for the workflow and
element you care about, and return `null` otherwise:

```tsx
import { useWorkflow } from '@Pimcore/modules/element/editor/shared-components/workflow/hooks/use-workflow'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const ReviewersField = (): React.JSX.Element | null => {
  const { triggeredWorkflowAction } = useWorkflow()
  const { elementType } = useElementContext()

  if (triggeredWorkflowAction?.workflowName !== 'simple_approval') return null
  if (triggeredWorkflowAction?.transitionName !== 'request_review') return null
  if (elementType !== 'data-object') return null

  return (
    <Form.Item
      label="Reviewers"
      name="reviewers"
      rules={ [{ required: true, message: 'Please select at least one reviewer.' }] }
    >
      <Select
        mode="multiple"
        options={ reviewerOptions }
      />
    </Form.Item>
  )
}
```

Filter *before* fetching data so plugins do not burn API requests
on transitions they do not handle.

### How submitted values reach the backend

The modal collects every form value and posts them as part of the
workflow action submission:

```json
{
  "workflowOptions": {
    "notes": "Please review the latest changes.",
    "additional": {
      "reviewers": [1, 7, 12]
    }
  }
}
```

The `workflowOptions` array is passed verbatim to
`Pimcore\Workflow\Manager::applyWithAdditionalData()`, which in turn
calls `Workflow::apply($subject, $transition, $additionalData)`.
That third argument becomes the Symfony Workflow transition context
and is available on every workflow event:

```php
public function onTransition(TransitionEvent $event): void
{
    $context = $event->getContext();
    $reviewers = $context['additional']['reviewers'] ?? null;
    // …persist, notify, log, etc.
}
```

Note the nesting: slot-injected values live at
`$context['additional']['<name>']`, not `$context['<name>']`.

### Full modal override

When the slot mechanism is not enough — for example, if you need to
replace the modal chrome, change the submission flow, or render a
wizard — override the modal component itself:

```typescript
componentRegistry.override({
  name: componentConfig.element.editor.workflow.modal.component.name,
  component: CustomWorkflowModal
})
```

The custom modal can reuse the existing
`useWorkflow`, `useSubmitWorkflow`, `useWorkflowFieldRenderer` and
`useDateConverter` hooks so the standard fields and submission
logic do not need to be re-implemented.
