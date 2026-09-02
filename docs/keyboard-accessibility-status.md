# Keyboard Navigation & Accessibility — Implementation Status

**Date:** 2026-09-02
**Relates to:** https://github.com/pimcore/product-management/issues/372
**Standard:** WCAG 2.1 Level AA + Pimcore Studio UI interaction rules

---

## Pimcore Studio UI Keyboard Rules

| Interaction | Keystroke |
|-------------|-----------|
| Press a button, link, decision making | Enter / Return |
| Activate element for drag & drop | Spacebar *(deferred — see Known Limitations)* |
| Navigate within an element | Arrow keys |
| Expand / Collapse (folder in tree, dropdown level) | Arrow Left / Right |
| Shift focus from one element to another | Tab (Shift+Tab backwards) |
| Open a context menu | Shift+F10 |

---

## Implemented — First Batch (Quick Wins)

### PR #4046 — Sidebar Tab Keyboard Fix
**WCAG:** 2.1.1 (Keyboard)
- Sidebar `onKeyDown` restricted to Enter and Space only (was: every key triggered tab selection)
- Arrow keys (Down/Up/Left/Right) move focus between sidebar tabs with wrapping
- Roving tabindex: active tab gets `tabIndex=0`, others `-1`

### PR #4047 — Sort Button Key Guard
**WCAG:** 2.1.1 (Keyboard)
- Sort button only triggers on Enter and Space (was: any key)
- Changed from `onKeyUp` to `onKeyDown` so Space `preventDefault` fires before browser default scroll

### PR #4048 — Tree Keyboard Navigation (Full DOM-Based Rewrite)
**WCAG:** 2.1.1 (Keyboard), 2.4.3 (Focus Order), 2.4.7 (Focus Visible)

All navigation uses live DOM traversal (`querySelectorAll`) instead of the previous broken `nodeOrder()` sorting:

| Key | Action |
|-----|--------|
| Tab | Focus enters tree on selected or first visible node (roving tabindex) |
| Arrow Down | Next visible node |
| Arrow Up | Previous visible node |
| Arrow Right | Expand folder (if collapsed) / Move to first child (if expanded) |
| Arrow Left | Collapse folder (if expanded) / Move to parent (if collapsed) |
| Home | First visible node |
| End | Last visible node |
| Enter | Select / open node |

- Focus-visible ring: blue `2px solid` outline on keyboard focus, hidden on mouse click (`:focus-visible` / `:focus:not(:focus-visible)`)
- Helper functions (`moveFocus`, `moveFocusToParent`, `getVisibleNodes`) extracted to module scope per SonarCloud requirements

### PR #4049 — Grid Escape to Cancel Edit
**WCAG:** 2.1.1 (Keyboard)
- Escape key exits grid cell edit mode and returns focus to the cell
- Focus deferred via `requestAnimationFrame` to prevent editor `onBlur` from saving a stale value

---

## Implemented — Second Batch (High Impact)

### PR #4055 — Shift+F10 Context Menu
**WCAG:** 2.1.1 (Keyboard)
- Shift+F10 opens context menu from any focused element wrapped by `ContextMenuWrapper`
- Dispatches synthetic `contextmenu` MouseEvent at the element's bounding rect for correct positioning
- `getPopupContainer={() => document.body}` prevents clipping by `overflow: hidden` ancestors
- First menu item receives focus automatically so ArrowDown/Up navigation works immediately
- Centralized in one component — all context menus across the app (trees, tabs, grids) benefit

### PR #4056 — ARIA Tree Roles
**WCAG:** 4.1.2 (Name, Role, Value), 1.3.1 (Info and Relationships)
- Tree container: `role="tree"` with translated `aria-label` per tree type:
  - Asset tree: "Asset Tree"
  - Document tree: "Document Tree"
  - Data Object tree: "Data Object Tree"
- Tree nodes: `role="treeitem"` (replaces previous `role="button"`)
- Child lists: semantic `<ul>` element (no explicit `role="group"` needed — `<ul>` inside `role="tree"` is understood by assistive technology)
- `aria-expanded` on expandable nodes (`true`/`false`, omitted on leaf nodes)
- `aria-selected` on all nodes
- `aria-level` reflecting nesting depth (clamped to minimum `1` for root node rendered at `level={-1}`)

### PR #4058 — Search Results Keyboard Navigation
**WCAG:** 2.1.1 (Keyboard), 4.1.2 (Name, Role, Value)
- Arrow Down/Up navigates between Quick Search results
- Enter opens the focused result in the editor
- Container: `role="listbox"`
- Items: `role="option"` with `aria-selected` on the active/previewed item
- First item gets `tabIndex=0` as keyboard entry point (only when no item is active — prevents dual tabIndex)
- Mouse hover/click interaction unchanged

### PR #4059 — Skip-to-Content Link
**WCAG:** 2.4.1 (Bypass Blocks)
- Visually hidden "Skip to content" link at the very top of the base layout
- Appears on first Tab press, styled with brand primary color at `z-index: 9999`
- Links to `#main-content` wrapping the WidgetManagerContainer
- Target has `tabIndex={-1}` so keyboard focus actually moves (not just scroll)
- Disappears when unfocused — invisible during normal mouse usage

### PR #4060 — Grid Tab Within Bounds
**WCAG:** 2.1.1 (Keyboard), 2.4.3 (Focus Order)
- Tab moves to next cell within the grid (wraps to first cell of next row at end of row)
- Shift+Tab moves to previous cell (wraps to last cell of previous row)
- Tab exits the grid only at the very last cell; Shift+Tab exits only at the very first cell
- Refactored to `resolveTarget` / `resolveTabTarget` with switch/case to satisfy SonarCloud cognitive complexity limit
- Arrow key behavior unchanged

### PR #4061 — Modal Focus Restoration
**WCAG:** 2.4.3 (Focus Order)
- Captures `document.activeElement` when a modal opens
- Restores focus to that element when the modal closes (via `requestAnimationFrame` to avoid racing with Ant Design's animation)
- Ant Design's `rc-dialog` already traps focus within the modal — this completes the focus management cycle

---

## Pre-existing (Already Worked Before Our Changes)

| Feature | Notes |
|---------|-------|
| Tree arrow key navigation (up/down) | Was working but used broken `nodeOrder()` — now rewritten to DOM traversal |
| Grid cell arrow navigation | Up/Down/Left/Right between cells |
| Grid column resize via keyboard | Arrow Left/Right on resizer (±5px) |
| Global keyboard shortcuts | Save, publish, search, open element — user-configurable per user |
| Ant Design components | Select, Checkbox, Tabs, Form — inherit good keyboard defaults |
| Toolstrip escape-to-collapse | Escape collapses expanded toolstrip |
| Iframe key forwarding | Document editor shortcuts work inside iframe |
| ESLint jsx-a11y rules | Enforced — prevents basic accessibility regressions |
| Rule builder drag & drop | Has @dnd-kit KeyboardSensor with spacebar + arrow keys |

---

## Known Limitations (Deferred)

| Issue | Why deferred |
|-------|-------------|
| **Drag & drop keyboard support** (core `Draggable` component) | Large effort — requires replacing native HTML5 drag with @dnd-kit KeyboardSensor across the entire app. Will be covered in a dedicated future batch. |
| **TreeList not owned by parent treeitem** in DOM | The `<ul>` child list is a sibling of `role="treeitem"`, not nested inside it. Fixing requires major DOM restructuring of tree node hierarchy. |
| **Grid Tab skips custom cells** (checkbox, drag handle) | Custom cells don't have `data-grid-*` attributes. Arrow keys handle those columns. |
| **WindowModal conditional mount bypasses focus restoration** | `edit-modal-mode-cell.tsx` unmounts modal while `open` is still true, so the `useEffect` never fires. Standard `Modal` usage (majority of cases) works correctly. |
| **Toolbar roving tabindex** | Each toolbar button is a separate Tab stop instead of using arrow keys within toolbar (WAI-ARIA toolbar pattern). P2 enhancement. |
| **Label association (htmlFor/id) incomplete** | Some form labels not programmatically associated with their inputs. Needs audit across form components. |

---

## WCAG 2.1 Coverage Summary

| Criterion | Level | Status | What we implemented |
|-----------|-------|--------|-------------------|
| **1.3.1** Info and Relationships | A | ✅ Done | ARIA tree roles (`role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-selected`, `aria-level`, `aria-label`), search listbox (`role="listbox"`, `role="option"`, `aria-selected`) |
| **2.1.1** Keyboard | A | ✅ Done | Tree navigation, grid edit/escape/tab, sidebar tabs, sort button, context menu Shift+F10, search results, skip link |
| **2.1.2** No Keyboard Trap | A | ✅ OK | No traps identified; grid Tab exits at boundaries; modal focus trapped by Ant Design |
| **2.1.3** Keyboard (No Exception) | AAA | ⚠️ Partial | Core drag & drop still mouse-only (deferred) |
| **2.4.1** Bypass Blocks | A | ✅ Done | Skip-to-content link |
| **2.4.3** Focus Order | A | ✅ Done | Roving tabindex on tree/sidebar, grid Tab bounds, modal focus restoration |
| **2.4.7** Focus Visible | AA | ✅ Done | Tree focus ring with `:focus-visible`; Ant Design defaults elsewhere |
| **4.1.2** Name, Role, Value | A | ✅ Done | Tree roles + labels, search listbox roles, aria-expanded/selected/level |

---

## PR Reference

| PR | Title | Batch | Status |
|----|-------|-------|--------|
| [#4046](https://github.com/pimcore/studio-ui-bundle/pull/4046) | Sidebar tab keyboard fix | 1st | Ready for review |
| [#4047](https://github.com/pimcore/studio-ui-bundle/pull/4047) | Sort button key guard | 1st | Ready for review |
| [#4048](https://github.com/pimcore/studio-ui-bundle/pull/4048) | Tree keyboard navigation (DOM rewrite) | 1st | Ready for review |
| [#4049](https://github.com/pimcore/studio-ui-bundle/pull/4049) | Grid Escape cancel edit | 1st | Ready for review |
| [#4055](https://github.com/pimcore/studio-ui-bundle/pull/4055) | Shift+F10 context menu | 2nd | Ready for review |
| [#4056](https://github.com/pimcore/studio-ui-bundle/pull/4056) | ARIA tree roles | 2nd | Ready for review |
| [#4058](https://github.com/pimcore/studio-ui-bundle/pull/4058) | Search results keyboard nav | 2nd | Ready for review |
| [#4059](https://github.com/pimcore/studio-ui-bundle/pull/4059) | Skip-to-content link | 2nd | Ready for review |
| [#4060](https://github.com/pimcore/studio-ui-bundle/pull/4060) | Grid Tab within bounds | 2nd | Ready for review |
| [#4061](https://github.com/pimcore/studio-ui-bundle/pull/4061) | Modal focus restoration | 2nd | Ready for review |

All PRs relate to https://github.com/pimcore/product-management/issues/372
