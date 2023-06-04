// Native
const path = require("path");
const { join } = path;
const { format } = require("url");
const fs = require("fs");
const { BrowserWindow, app, ipcMain, Menu, shell } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");

// const filePath = join("assets", "data.json");
// const filePath = "../temp/data.json";
// const filePath = join("../temp/data.json");
const newDataTempVersion = join(app.getPath("userData"), "temp_0");
const filePath = join(newDataTempVersion, "data.json");
// const fileOriginalPath = join(__dirname, "../assets/data.json");
// console.log(__static);
// Prepare the renderer once the app is ready
let contents;
const template = [
  {
    label: "Edit",
    submenu: [
      {
        role: "undo",
      },
      {
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        role: "cut",
      },
      {
        role: "copy",
      },
      {
        role: "paste",
      },
    ],
  },

  {
    label: "View",
    submenu: [
      {
        role: "reload",
      },
      {
        role: "toggledevtools",
      },
      {
        type: "separator",
      },
      {
        role: "resetzoom",
      },
      {
        role: "zoomin",
      },
      {
        role: "zoomout",
      },
      {
        type: "separator",
      },
      {
        role: "togglefullscreen",
      },
    ],
  },

  {
    role: "window",
    submenu: [
      {
        role: "minimize",
      },
      {
        role: "close",
      },
    ],
  },

  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://github.com/Sourav9063/ftp-nextron");
        },
      },
    ],
  },
  // full screen
  {
    role: "togglefullscreen",
  },
  {
    label: "Backward",
    accelerator: ",",
    click: () => {
      const fw = BrowserWindow.getFocusedWindow();
      fw.webContents.canGoBack() && fw.webContents.goBack();
    },
  },
  {
    label: "Forward",
    accelerator: ".",
    click: () => {
      const fw = BrowserWindow.getFocusedWindow();

      fw.webContents.canGoForward() && fw.webContents.goForward();
    },
  },
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on("ready", async () => {
  await prepareNext("./renderer");
  // const root = path.normalize(`${__dirname}/..`)

  // // file:// interceptor to serve all assets without running a web server in the background
  // protocol.interceptFileProtocol('file', (request, callback) => {
  // 	let url = request.url.substr(7)    /* all urls start with 'file://' */
  // 	if (!url.startsWith(root)) {
  // 		if (url.startsWith('css/fonts') || url.startsWith('css/img')) {
  // 			url = url.substr(4)
  // 		}
  // 		url = path.normalize(`${root}/${frontendAssetsPath}${url}`)
  // 	}
  // 	callback({path: url})
  // })

  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
    },
  });
  const url = isDev
    ? "http://localhost:8000"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });
  if (!fs.existsSync(newDataTempVersion)) {
    fs.mkdir(newDataTempVersion, (err) => {
      if (err) {
        console.log(err);
      } else {
        // fs.copyFile(fileOriginalPath, filePath, (err) => {
        //   console.log("copy..............................................");
        //   console.log({ err });
        // });
      }
    });
  }
  await mainWindow.loadURL(url);

  // mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  //   return {
  //     action: "allow",

  //     overrideBrowserWindowOptions: {
  //       titleBarStyle: "hidden",

  //       webPreferences: {},
  //     },
  //   };
  // });

  // mainWindow.webContents.on("before-input-event", (event, input) => {
  //   console.log(input);
  // });
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", async (event, message) => {
  //  if(!message || !message.link){
  //   event.sender.send("message",{message:"Provide link please"})
  //   return;
  // }
  //   try {
  //     const response = await fetch(message.link);
  //   const html = await response.text();
  //   // console.log(html)
  //     const doc = parser.parse(html);
  //   const links = doc.querySelectorAll('a');
  //   console.log(links.length)
  // }
  // catch (err) {
  //   console.log(err)
  //   }
});

ipcMain.on("saveData", (event, message) => {
  console.log("saveData");
  if (!fs.existsSync(newDataTempVersion)) {
    fs.mkdir(newDataTempVersion, (err) => {
      if (err) console.log(err);
    });
  }
  fs.writeFile(filePath, JSON.stringify(message), (err) => {
    if (err) {
      console.log(err);
      event.sender.send("saveData", {
        message: JSON.stringify(err),
        path: filePath,
      });
    } else {
      +event.sender.send("saveData", {
        path: filePath,
        message: "data saved",
        data: message,
      });
    }
  });
});

ipcMain.on("loadData", (event, message) => {
  console.log("loadData");
  let dataFinal = {};

  fs.readFile(filePath, "utf8", (err, data) => {
    console.log(err);
    // if (err) {
    //   console.log(err);
    //   event.sender.send("loadData", {
    //     message: JSON.stringify(err),
    //     path: "https://sourav9063.github.io/ftp-nextron/api/db.json",
    //   });
    // } else {
    const dataLocal = data ? JSON.parse(data) : {};
    dataFinal = dataLocal;
    fetch("https://sourav9063.github.io/ftp-nextron/api/db.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response && response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((dataCloud) => {
        dataFinal = { ...dataCloud, ...dataFinal };
        dataFinal.version = dataCloud.version
          ? dataCloud.version
          : dataLocal.version;
        if (dataCloud.live.length > dataLocal.live.length) {
          dataFinal.live = dataCloud.live;
        }
        if (dataCloud.media.length > dataLocal.media.length) {
          dataFinal.media = dataCloud.media;
        }
        event.sender.send("loadData", {
          message: "Success",
          data: dataFinal,
          path: "https://sourav9063.github.io/ftp-nextron/api/db.json",
        });
      })
      .catch((e) => {
        console.log(e);
        event.sender.send("loadData", {
          message: "Success.",
          data: dataFinal,
          path: filePath,
        });
      });

    // event.sender.send("loadData", {
    //   message: "Success",
    //   data: JSON.parse(data),
    //   path: filePath,
    // });
    // }
  });
});

ipcMain.on("linkPath", (event, message) => {
  const url = isDev
    ? "http://localhost:8000/" + message
    : format({
        pathname: join(__dirname, "../renderer/out/", `${message}.html`),
        protocol: "file:",
        slashes: true,
      });
  console.log(url);
  event.sender.send("linkPath", url);
});

ipcMain.on("checkLinks", async (event, { links, type }) => {
  if (!links) {
    event.sender.send("message", { message: "Provide link please" });
    return;
  }

  event.sender.send("checkLinks", { message: "Checking links" });

  if (type == "fast") {
    links.forEach(async (link) => {
      try {
        const response = await fetch(link);
        const html = await response.text();

        if (response.ok) {
          event.sender.send("checkLinks", { message: "Working", link: link });
        } else {
          event.sender.send("checkLinks", {
            message: "Not Working",
            link: link,
          });
        }
      } catch (err) {
        // console.log(err);
        event.sender.send("checkLinks", { message: "Not Sure", link: link });
      }
    });
  } else {
    const scraperWindow = new BrowserWindow({
      // show:false,
      webPreferences: {
        devTools: true,
        // offscreen: true,
      },
    });
    links.forEach(async (link) => {
      await scraperWindow.loadURL(link);
      scraperWindow.webContents.on("did-finish-load", () => {
        event.sender.send("checkLinks", { message: "Working", link: link });
        scraperWindow.close();
      });
      scraperWindow.webContents.on("did-fail-load", () => {
        event.sender.send("checkLinks", { message: "Not Working", link: link });
        scraperWindow.close();
      });
    });
  }
});
ipcMain.on("openExternal", (event, message) => {
  shell.openExternal(message);
});
// const scraperWindow = new BrowserWindow({
//   // show:false,
//   webPreferences: {
//     devTools: true,
//     // offscreen: true,
//   }
// })
// scraperWindow.loadURL("https://sites.google.com/view/bdixftpserverlist/media-ftp-servers")
// scraperWindow.webContents.on("did-finish-load", () => {
//   // console.log(scraperWindow)
//   // event.sender.send('message', scraperWindow)
//   console.log(scraperWindow.getTitle())
//   scraperWindow.webContents.executeJavaScript(`
//   console.log(document.querySelectorAll('a div p'));
//   function gethtml () {
//     return new Promise((resolve, reject) => { resolve(document.querySelectorAll('a div p'); });
//     }
//     gethtml();
//   `).then((links) => {
//     console.log(links)
//   }).catch(err => console.log(err))

//   // scraperWindow.close();
// })
// // event.sender.send('message', message)
