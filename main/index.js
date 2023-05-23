// Native
const path=require("path")
const { join } = path
const { format } = require('url')

const parser = require("node-html-parser")
const fs = require('fs');
// Packages
const { BrowserWindow, app, ipcMain, protocol } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

const filePath=join("assets","data.json")    
// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
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
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message',async (event, message) => {
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

})



ipcMain.on('saveData', (event, message) => {
  console.log("saveData")
  if (!fs.existsSync('assets')) {
    fs.mkdir("assets", (err) => {
      if (err) console.log(err);
  });
  }
  fs.writeFile(filePath, JSON.stringify(message), (err) => {
    if(err){
      event.sender.send("saveData", {  message:  JSON.stringify(err),path:filePath})
    }
    else 
    {
      console.log(message)
      event.sender.send("saveData", { message: "data saved",data:message })
    }
  })
  
})

ipcMain.on('loadData', (event, message) => {
  console.log("loadData")
  fs.readFile(filePath,'utf8',(err, data) => {
    console.log(data)
    if (err)
    {
      console.log(err);
      event.sender.send("loadData", { message:JSON.stringify(err),path:filePath })
    }
    else
    {
      event.sender.send("loadData", {message:"Success",data:JSON.parse(data)})
    }
  })

})





























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
