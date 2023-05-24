const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  message: {
    send: (payload) => ipcRenderer.send("message", payload),
    on: (handler) => ipcRenderer.on("message", handler),
    off: (handler) => ipcRenderer.off("message", handler),
  },
  saveData: {
    send: (payload) => ipcRenderer.send("saveData", payload),
    on: (handler) => ipcRenderer.on("saveData", handler),
    off: (handler) => ipcRenderer.off("saveData", handler),
  },
  loadData: {
    send: (payload) => ipcRenderer.send("loadData", payload),
    on: (handler) => ipcRenderer.on("loadData", handler),
    off: (handler) => ipcRenderer.off("loadData", handler),
  },
  linkPath: {
    send: (payload) => ipcRenderer.send("linkPath", payload),
    on: (handler) => ipcRenderer.on("linkPath", handler),
    off: (handler) => ipcRenderer.off("linkPath", handler),
  },
  checkLinks: {
    send: (payload) => ipcRenderer.send("checkLinks", payload),
    on: (handler) => ipcRenderer.on("checkLinks", handler),
    off: (handler) => ipcRenderer.off("checkLinks", handler),
  },
});
