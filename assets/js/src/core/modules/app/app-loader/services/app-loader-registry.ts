import { StringMappingType } from "typescript";

export interface Loader {
  readonly name: string;
  onLoad: () => Promise<void>;
}

export class AppLoaderRegistry {
  protected readonly loaders = new Map<string, Loader>()

  registerLoader(loader: Loader): void {
    if (this.loaders.has(loader.name)) {
      throw new Error(`Loader with name "${loader.name}" already exists`);
    }

    this.loaders.set(loader.name, loader);
  }

  getLoader(name: string, throwException: boolean = true): Loader {
    const loader = this.loaders.get(name);

    if (loader === undefined && throwException) {
      throw new Error(`Loader with name "${name}" not found`);
    }

    return loader!;
  }

  getLoaders(): Loader[] {
    return Array.from(this.loaders.values());
  }

  async loadAll(): Promise<void> {
    for (const loader of this.loaders.values()) {
      try {
        await loader.onLoad();
      } catch (error) {
        console.warn(`Loader ${loader.name} failed:`, error);
      }
    }
  }

  hasLoader(name: string): boolean {
    return this.loaders.has(name);
  }

  overrideLoader(loader: Loader): void {
    if (!this.loaders.has(loader.name)) {
      throw new Error(`Loader with name "${loader.name}" not found`);
    }

    this.loaders.set(loader.name, loader);
  }
}