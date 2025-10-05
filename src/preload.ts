import { type IpcRendererEvent, ipcRenderer } from 'electron'

const prefix = 'electron-storage.'

type OnDidChangeHandler = (
  newValue: Record<string, unknown>,
  oldValue: Record<string, unknown>,
) => void

export type Operations = {
  getItem: (key: string) => Promise<unknown>
  setItem: (key: string, value: unknown) => Promise<void>
  removeItem: (key: string) => Promise<void>
  onDidChange: (handler: OnDidChangeHandler) => () => void
}

export const exposeOperations = (): Operations => {
  return {
    getItem: (key: string) => ipcRenderer.invoke(`${prefix}get`, key),
    setItem: (key: string, value: unknown) =>
      ipcRenderer.invoke(`${prefix}set`, key, value),
    removeItem: (key: string) => ipcRenderer.invoke(`${prefix}delete`, key),
    onDidChange: (handler: OnDidChangeHandler) => {
      const listener = (
        _event: IpcRendererEvent,
        newValue: Record<string, unknown>,
        oldValue: Record<string, unknown>,
      ) => handler(newValue, oldValue)
      ipcRenderer.on(`${prefix}onDidChange`, listener)
      return () => ipcRenderer.off(`${prefix}onDidChange`, listener)
    },
  }
}
