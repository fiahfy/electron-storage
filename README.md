# electron-storage

[![Publish](https://github.com/fiahfy/electron-storage/actions/workflows/publish.yml/badge.svg)](https://github.com/fiahfy/electron-storage/actions/workflows/publish.yml)

> A helper library for managing application storage in Electron applications.

## Installation

```bash
npm install @fiahfy/electron-storage
```

## Usage

```js
// main.js
import { createStore, register } from '@fiahfy/electron-storage'

const store = createStore()

register(store)
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
