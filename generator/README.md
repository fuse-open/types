# TypeScript Definitions generator

This program generates a TypeScript Definitions file based on the JSON files
found in `api-docs/`, located in the [docs-repo](https://github.com/fuse-open/docs).

Usage example:

    dotnet run -- /path/to/api-docs /path/to/index.d.ts > index.d.ts
