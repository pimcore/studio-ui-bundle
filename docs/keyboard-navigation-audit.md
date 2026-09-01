# Keyboard Navigation Audit — Pimcore Studio UI

**Date:** 2026-08-31
**Branch:** `keyboard-navigation` (studio-ui-bundle 2026.x)
**Standard:** WCAG 2.1 Level AA + Project-specific interaction rules

## Project Keyboard Rules

| Interaction | Keystroke | Info |
|-------------|-----------|------|
| Press a button, link, decision making | Enter / Return | |
| Activate element for drag & drop | Spacebar | |
| Navigate within an element | Arrow keys | |
| Expand / Collapse (folder in tree, dropdown level) | Arrow Left / Right | |
| Shift focus from one element to another | Tab (Shift+Tab backwards) | |
| Open a context menu | Shift+F10 | When element is focused. Native in Chrome, Firefox, Edge. Not available as integrated shortcut on macOS. |

---

## CRITICAL (P0) — Blocks WCAG 2.1 Level A compliance

### 1. Shift+F10 context menu not implemented anywhere
- **Where:** `context-menu-wrapper.tsx`, all tree `with-context-menu.tsx` wrappers, tab context menus
- **Impact:** Context menus are mouse-only. Keyboard users cannot access tree actions, tab close options, or element actions.
- **Effort:** Medium — Add global/component-level keydown listener for Shift+F10, dispatch programmatic Ant Dropdown open, focus first menu item. ~20 touch points but can be centralized in `ContextMenuWrapper`.

### 2. Tree nodes not in tab order (tabIndex={-1})
- **Where:** `tree-node.tsx:226`, `tree-expander.tsx:61`
- **Impact:** Users cannot Tab into the tree at all. Arrow keys work once focused, but there is no keyboard entry point.
- **Effort:** Small — Change first visible node to `tabIndex={0}`, keep rest at `-1` (roving tabindex pattern).

### 3. No ARIA roles on custom tree
- **Where:** `element-tree.tsx`, `tree-node.tsx`
- **Impact:** Screen readers cannot identify the tree structure. Nodes use `role="button"` instead of `role="treeitem"`, container has no `role="tree"`.
- **Effort:** Medium — Add `role="tree"` on container, `role="treeitem"` on nodes, plus `aria-expanded`, `aria-selected`, `aria-level`.

### 4. Search results not keyboard navigable
- **Where:** `search-result.tsx`, `search-result-item.tsx`
- **Impact:** Results respond only to mouse click. No arrow key navigation, no Enter to open.
- **Effort:** Medium — Add `tabIndex`, `onKeyDown` for arrow up/down + Enter, visual focus indicator.

### 5. Drag & drop has no keyboard support (core component)
- **Where:** `draggable.tsx`
- **Impact:** The generic `<Draggable>` wrapper uses native HTML5 drag (mouse-only). Spacebar does not activate drag. Tree reordering, relation reordering, modal uploads are all mouse-only.
- **Effort:** Large — Replace native drag with @dnd-kit `KeyboardSensor` across the core `Draggable` component, or add a keyboard-accessible alternative (move up/down buttons).

---

## HIGH (P1) — Significant usability gap

### 6. Sidebar onKeyDown fires on ALL keys
- **Where:** `sidebar.tsx:130-132`
- **Impact:** Any keypress triggers tab selection, breaking arrow key navigation within sidebar tabs.
- **Effort:** Tiny — Add `if (event.key === 'Enter' || event.key === ' ')` guard.

### 7. Grid: no Escape to cancel cell edit
- **Where:** `default-cell.tsx`, `use-edit-mode.tsx`
- **Impact:** Users enter edit mode with Enter but cannot cancel — must click away.
- **Effort:** Small — Add Escape handler to restore original value and exit edit mode.

### 8. Grid: Tab exits grid instead of navigating cells
- **Where:** `use-keyboard-navigation.ts`
- **Impact:** Tab jumps to next DOM element outside the grid instead of moving to next cell.
- **Effort:** Medium — Intercept Tab/Shift+Tab within grid bounds, exit only at last/first cell.

### 9. Modal focus trap missing
- **Where:** `modal.tsx`, `use-studio-modal.tsx`
- **Impact:** Tab can escape the modal into background content. Ant Design provides basic focus management but no strict trap.
- **Effort:** Small — Add `focus-trap-react` or verify Ant's behavior meets AA. Add focus restoration to trigger element on close.

### 10. Grid sort button triggers on ANY key
- **Where:** `sort-button.tsx:40-41`
- **Impact:** `onKeyUp` fires sort toggle on every keystroke, not just Enter/Space.
- **Effort:** Tiny — Add key check for Enter/Space only.

---

## MEDIUM (P2) — Should fix for AA compliance

### 11. No skip-to-content link
- **Where:** Base layout
- **Impact:** Keyboard users must Tab through entire nav/sidebar to reach main content.
- **Effort:** Small — Add hidden skip link in `base-layout.tsx`.

### 12. Missing aria-expanded on tree nodes
- **Where:** `tree-node.tsx`
- **Impact:** Screen readers don't know if a folder is open/closed.
- **Effort:** Small — Add `aria-expanded={isExpanded}` to expandable nodes.

### 13. Missing aria-selected on tree nodes
- **Where:** `tree-node.tsx`
- **Impact:** Screen readers don't know which node is active.
- **Effort:** Small — Add `aria-selected={isSelected}`.

### 14. No Home/End key support in tree
- **Where:** `tree-node.tsx`
- **Impact:** Can't jump to first/last node — only sequential arrow navigation.
- **Effort:** Small — Add Home/End handlers in the existing `onKeyDown`.

### 15. Toolbar has no roving tabindex
- **Where:** `toolbar.tsx`
- **Impact:** Each button is a separate tab stop instead of using arrow keys within toolbar (WAI-ARIA toolbar pattern).
- **Effort:** Medium — Implement roving tabindex pattern.

### 16. Focus indicators not explicitly styled
- **Where:** Global CSS
- **Impact:** Relies on browser/Ant defaults. May not meet 3:1 contrast ratio requirement.
- **Effort:** Small — Add `:focus-visible` styles with proper contrast.

### 17. Label association (htmlFor/id) incomplete
- **Where:** Various form components
- **Impact:** Some form labels not programmatically associated with their inputs.
- **Effort:** Medium — Audit and fix across form components.

### 18. Sidebar collapse not keyboard accessible
- **Where:** `sidebar.tsx`
- **Impact:** Can't expand/collapse sidebar panels via Enter/Space.
- **Effort:** Small — Add Enter/Space handler on panel toggle.

---

## LOW (P3) — Enhancement / best practice

### 19. No keyboard shortcut help modal
- **Where:** App-level
- **Impact:** Users can't discover available shortcuts.
- **Effort:** Medium — Create Ctrl+? / F1 help modal listing all shortcuts.

### 20. Spacebar drag not discoverable
- **Where:** Rule builder (where it works)
- **Impact:** No visual hint that Space activates drag.
- **Effort:** Small — Add tooltip or ARIA description.

### 21. Grid: no keyboard shortcut for row operations
- **Where:** Operational grid, M2M relation grid
- **Impact:** Add/delete row only via toolbar buttons, not keyboard shortcuts.
- **Effort:** Small — Add Delete key for remove, keyboard shortcut for add.

### 22. Iframe editor key forwarding edge cases
- **Where:** `use-forward-key-bindings.ts`
- **Impact:** Works for most shortcuts but untested with Shift+F10.
- **Effort:** Small — Verify and add F10 to forwarded keys.

---

## What already works well

| Area | Status |
|------|--------|
| Tree arrow key navigation (up/down/left/right, expand/collapse, Enter to select) | Fully implemented |
| Grid cell arrow navigation (up/down/left/right between cells) | Fully implemented |
| Grid column resize via keyboard (Arrow Left/Right on resizer, +/-5px) | Fully implemented |
| Global keyboard shortcuts (save, publish, search, navigation) | Mature, user-configurable, documented |
| Ant Design components (Select, Checkbox, Tabs, Form) | Inherit good keyboard defaults |
| Toolstrip escape-to-collapse | Implemented |
| Iframe key forwarding for document editor | Working |
| ESLint jsx-a11y rules enforced | Prevents basic accessibility regressions |
| Rule builder drag & drop | Has KeyboardSensor with spacebar + arrow keys |

---

## Effort estimates summary

| Priority | Items | Total effort |
|----------|-------|-------------|
| P0 Critical | 5 issues | ~3-4 days |
| P1 High | 5 issues | ~2-3 days |
| P2 Medium | 8 issues | ~3-4 days |
| P3 Low | 4 issues | ~1-2 days |
| **Total** | **22 issues** | **~9-13 days** |

The biggest single effort is P0 #5 (drag & drop keyboard support) which touches the core `Draggable` component used across the entire app. The biggest bang-for-buck is P0 #1 (Shift+F10 context menu) which can be centralized in one component and fixes access to all context menus at once.

---

## Key files reference

### Core components
- `core/components/element-tree/node/tree-node.tsx` — Tree node keyboard + ARIA
- `core/components/element-tree/element-tree.tsx` — Tree container
- `core/components/grid/grid.tsx` — Main grid component
- `core/components/grid/columns/default-cell.tsx` — Cell editing keyboard
- `core/components/grid/keyboard-navigation/use-keyboard-navigation.ts` — Arrow navigation
- `core/components/grid/resizer/resizer.tsx` — Column resize keyboard
- `core/components/sort-button/sort-button.tsx` — Sort trigger
- `core/components/context-menu-wrapper/context-menu-wrapper.tsx` — Context menu trigger
- `core/components/drag-and-drop/draggable.tsx` — Core drag wrapper
- `core/components/modal/modal.tsx` — Modal wrapper
- `core/components/sidebar/sidebar.tsx` — Sidebar tabs + resize
- `core/components/tabs/tabs.tsx` — Tab component
- `core/components/toolbar/toolbar.tsx` — Toolbar layout

### Search
- `core/modules/search/modal/tabs/general/search-result/search-result.tsx`
- `core/modules/search/modal/tabs/general/search-result/search-result-item.tsx`

### Keyboard shortcuts
- `core/modules/app/hook/use-handle-keybindings.ts` — Global shortcut handler
- `core/modules/user/management/detail/tabs/key-bindings/constants.ts` — Shortcut definitions

### Tree instances
- `core/modules/asset/tree/node/with-context-menu.tsx`
- `core/modules/document/tree/node/with-context-menu.tsx`
- `core/modules/data-object/tree/node/with-context-menu.tsx`
- `core/modules/asset/tree/node/with-draggable.tsx`
- `core/modules/document/tree/node/with-draggable.tsx`
- `core/modules/data-object/tree/node/with-draggable.tsx`
