import { RsbuildPlugin } from "@rsbuild/core";

export interface PluginOptions {
  alternativePluginExportPath?: string;
}

export function pluginGenerateEntrypoints(options?: PluginOptions): RsbuildPlugin

export interface WriteBuildIdPluginOptions {
  buildId: string;
}

export function pluginWriteBuildId(options: WriteBuildIdPluginOptions): RsbuildPlugin
