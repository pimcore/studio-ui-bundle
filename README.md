# Studio UI

The Studio UI Bundle provides the frontend for [Pimcore Studio](https://pimcore.com/), the administration interface for Pimcore. It relies on the [Studio Backend Bundle](https://github.com/pimcore/studio-backend-bundle/) for its REST API.

Built with [React](https://react.dev/), [Ant Design](https://ant.design/), [TypeScript](https://www.typescriptlang.org/), [Redux](https://redux.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), [Mercure](https://mercure.rocks/), and [Rsbuild](https://rsbuild.rs/).

Access Pimcore Studio at: `{your-domain}/pimcore-studio`

## Features in a Nutshell

- Modern React-based administration interface for Pimcore
- Plugin architecture for extending the UI with custom functionality
- SDK with reusable components, services, and dependency injection
- Widget and perspective system for customizable workspaces
- Dynamic type system for extensible data type rendering
- Context menu and component registries for UI customization
- Real-time updates via Mercure integration
- Auto-generated TypeScript API client via RTK Query and OpenAPI
- Storybook-documented component library

## Documentation Overview

- [Architecture Overview](./doc/01_Architecture_Overview/README.md) - SDK, plugin system, and Window API
- [Installation](./doc/02_Installation.md) - Setup and prerequisites
- [Configuration and Administration](./doc/03_Configuration_and_Administration/README.md) - Configuration, users, perspectives
- [Extending](./doc/04_Extending/README.md) - Plugin development guide and examples
- [Development Details](./doc/05_Development_Details/README.md) - Core development setup
