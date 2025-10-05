# electron-storage

[![Publish](https://github.com/fiahfy/electron-storage/actions/workflows/publish.yml/badge.svg)](https://github.com/fiahfy/electron-storage/actions/workflows/publish.yml)

> Helper for using [electron-store](https://github.com/sindresorhus/electron-store) as storage.

## Installation

```bash
npm install @fiahfy/electron-storage
```

## Usage

```js
// main.js
import { register } from '@fiahfy/electron-storage'

const { store } = register()
```

```js
// preload.js
import { exposeOperations } from '@fiahfy/electron-storage/preload'

contextBridge.exposeInMainWorld('electronAPI', {
  ...exposeOperations(),
}
```

```js
// renderer.js
import { createStorage } from '@fiahfy/electron-storage/renderer'

const storage = createStorage(window.electronAPI)
```
