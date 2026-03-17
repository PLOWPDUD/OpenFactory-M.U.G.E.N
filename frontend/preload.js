const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  extractSFF: (sffPath) => ipcRenderer.invoke('extract-sff', sffPath)
});
