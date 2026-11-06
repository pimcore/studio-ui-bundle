/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The registry only reports errors through this, and the real module pulls in
// the app shell; the stand-in keeps the call site valid.
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {}
}))

// The real base reaches @sdk/components (antd-style, untranspiled ESM), which
// Jest cannot parse; the stand-in keeps the three Map operations the dropdown
// path uses. Same reason as the stand-in in
// types/data/classificationstore/dynamic-type-field-definition-classificationstore.test.ts.
jest.mock('@sdk/modules/element', () => ({
  DynamicTypeRegistryAbstract: class DynamicTypeRegistryAbstract {
    protected readonly dynamicTypes = new Map<string, StubType>()

    registerDynamicType (type: StubType): void {
      this.dynamicTypes.set(type.id, type)
    }

    getDynamicType (id: string): StubType | undefined {
      return this.dynamicTypes.get(id)
    }

    getDynamicTypes (): StubType[] {
      return Array.from(this.dynamicTypes.values())
    }
  }
}))

interface StubContext {
  area: string[]
  path: string[]
  fieldDefinitions: Record<string, { fieldtype: string }>
}

/** A field definition type reduced to what the dropdown path actually reads. */
interface StubType {
  id: string
  getTags: () => string[]
  getGroup: () => string[]
  getIcon: () => { type: string, value: string }
  getValidDropdownTags: () => string[]
  getValidConvertibleTags: () => string[]
  getAllowedAreas: () => string[] | null
}

interface StubAction {
  key: string
  actions?: StubAction[]
}

interface Registry {
  registerDynamicType: (type: StubType) => void
  getDropdownActions: (context: StubContext) => StubAction[]
}

const { DynamicTypeFieldDefinitionRegistry } = jest.requireActual<{
  DynamicTypeFieldDefinitionRegistry: new () => Registry
}>('./dynamic-type-field-definition-registry')

/**
 * `allowedAreas` defaults to null rather than being left off, because every
 * real type inherits that default from DynamicTypeFieldDefinitionAbstract.
 */
const stubType = (
  id: string,
  allowedAreas: string[] | null = null,
  convertibleTags: string[] = []
): StubType => ({
  id,
  getTags: () => ['group:root'],
  getGroup: () => ['data'],
  getIcon: () => ({ type: 'name', value: 'questionmark' }),
  getValidDropdownTags: () => ['group:root'],
  getValidConvertibleTags: () => convertibleTags,
  getAllowedAreas: () => allowedAreas
})

const actionKeys = (actions: StubAction[]): string[] =>
  actions.flatMap((action) => [
    action.key,
    ...(Array.isArray(action.actions) ? actionKeys(action.actions) : [])
  ])

describe('DynamicTypeFieldDefinitionRegistry dropdown scoping', () => {
  const classEditorContext: StubContext = {
    area: ['class'],
    path: ['root'],
    fieldDefinitions: { root: { fieldtype: 'panel' } }
  }

  const registryWith = (...types: StubType[]): Registry => {
    const registry = new DynamicTypeFieldDefinitionRegistry()
    registry.registerDynamicType(stubType('panel'))
    types.forEach((type) => { registry.registerDynamicType(type) })
    return registry
  }

  it('does not offer a type scoped to another area in the class editor', () => {
    // Reproduces pimcore/platform-version#764: a bundle registers its own
    // relation types into the global registry so buildTree can resolve their
    // icons, and they then appear in the ordinary class editor dropdown.
    const registry = registryWith(stubType('asset', ['panel']))

    const keys = actionKeys(registry.getDropdownActions(classEditorContext))

    expect(keys).not.toContain('add-asset')
  })

  it('still offers a type that declares no area', () => {
    const registry = registryWith(stubType('input'))

    const keys = actionKeys(registry.getDropdownActions(classEditorContext))

    expect(keys).toContain('add-input')
  })

  it('offers an area-scoped type inside the area it declares', () => {
    const registry = registryWith(stubType('asset', ['panel']))

    const keys = actionKeys(
      registry.getDropdownActions({ ...classEditorContext, area: ['panel'] })
    )

    expect(keys).toContain('add-asset')
  })

  it('does not offer a type scoped to another area as a conversion', () => {
    // Convert is a second picker on the same registry, reached only on a
    // non-root field. Filtering Add alone left it open: choosing the type
    // there replaces the field with one restricted to another editor.
    const registry = new DynamicTypeFieldDefinitionRegistry()
    registry.registerDynamicType(stubType('panel', null, ['group:root']))
    registry.registerDynamicType(stubType('asset', ['panel']))

    const keys = actionKeys(registry.getDropdownActions({
      area: ['class'],
      path: ['root', 'child'],
      fieldDefinitions: { root: { fieldtype: 'panel' }, child: { fieldtype: 'panel' } }
    }))

    expect(keys).not.toContain('convert-asset')
  })

  it('still offers an unrestricted type as a conversion', () => {
    const registry = new DynamicTypeFieldDefinitionRegistry()
    registry.registerDynamicType(stubType('panel', null, ['group:root']))
    registry.registerDynamicType(stubType('input'))

    const keys = actionKeys(registry.getDropdownActions({
      area: ['class'],
      path: ['root', 'child'],
      fieldDefinitions: { root: { fieldtype: 'panel' }, child: { fieldtype: 'panel' } }
    }))

    expect(keys).toContain('convert-input')
  })
})
