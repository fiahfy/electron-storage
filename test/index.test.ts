import { ipcMain } from 'electron'
import { describe, expect, test, vi } from 'vitest'
import { register } from '../src'

vi.mock('electron', () => {
  const ipcMain = {
    handle: vi.fn(),
  }
  return { ipcMain }
})

vi.mock('electron-store', () => {
  return {
    default: vi.fn().mockImplementation(() => ({ onDidAnyChange: vi.fn() })),
  }
})

describe('register', () => {
  test('should work', () => {
    register()
    expect(ipcMain.handle).toBeCalledTimes(3)
  })
})
