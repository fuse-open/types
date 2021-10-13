#!/bin/bash
set -e

pushd generator
nuget restore generator-typescript.sln
msbuild generator-typescript.sln
popd

pushd ~/fuselibs
npm run doc-export
popd

mono generator/bin/Debug/generator-typescript.exe ~/fuselibs/tools/doc-export/build/docs/Debug > index.d.ts
