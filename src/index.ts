import { BrowserWindow, type IpcMainInvokeEvent, ipcMain } from 'electron'
import Store from 'electron-store'

const prefix = 'electron-storage.'

export const register = () => {
  const store = new Store()

  store.onDidAnyChange((newValue, oldValue) => {
    const windows = BrowserWindow.getAllWindows()
    for (const window of windows) {
      window.webContents.send(`${prefix}onDidChange`, newValue, oldValue)
    }
  })

  ipcMain.handle(`${prefix}get`, (_event: IpcMainInvokeEvent, key: string) =>
    store.get(key),
  )
  ipcMain.handle(
    `${prefix}set`,
    (_event: IpcMainInvokeEvent, key: string, value: unknown) =>
      store.set(key, value),
  )
  ipcMain.handle(`${prefix}delete`, (_event: IpcMainInvokeEvent, key: string) =>
    store.delete(key),
  )

  return {
    store,
  }
}
