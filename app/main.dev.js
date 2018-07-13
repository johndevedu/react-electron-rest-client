/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import fs from "fs";
import { app, BrowserWindow } from "electron";
import MenuBuilder from "./menu";
import React from "react";
import { renderToString } from "react-dom/server";
import { JssProvider, SheetsRegistry } from "react-jss";
import RequestPage from "./containers/RequestPage";

let mainWindow = null;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_PROD === "true"
) {
  require("electron-debug")();
  const path = require("path");
  const p = path.join(__dirname, "..", "app", "node_modules");
  require("module").globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", async () => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.DEBUG_PROD === "true"
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: true,
    width: 1024,
    height: 728
  });

  const sheets = new SheetsRegistry();

  const jsx = (
    <JssProvider registry={sheets}>
      <RequestPage />
    </JssProvider>
  );

  const reactDom = renderToString(jsx);
  const reactDomHtml = htmlTemplate(reactDom, sheets);

  // console.log(reactDomHtml);

  //var dataHtml = "data:text/html;charset=UTF-8," + encodeURIComponent(html);
  // mainWindow.loadURL(dataHtml);

  let htmlFile;

  // htmlFile = `file://${__dirname}/app.prod.html`;
  fs.writeFileSync(`${__dirname}/app.prod.html`, reactDomHtml);
  // if (process.env.NODE_ENV === "production") {
  //   htmlFile = `file://${__dirname}/app.prod.html`;
  //   fs.writeFileSync(htmlFile, reactDomHtml, function(error) {
  //     if (error) {
  //       console.log("[write output]: " + err);
  //       if (fail) fail(error);
  //     } else {
  //       console.log("[write output]: success");
  //       if (success) success();
  //     }
  //   });
  // } else {
  //   htmlFile = `file://${__dirname}/app.html`;
  // }

  // htmlfile =
  //   process.env.NODE_ENV === "development"
  //     ? `file://${__dirname}/app.html`
  //     : `file://${__dirname}/app.prod.html`;
  // mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.loadURL(`file://${__dirname}/app.prod.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  // mainWindow.webContents.on("did-finish-load", () => {
  //   if (!mainWindow) {
  //     throw new Error('"mainWindow" is not defined');
  //   }
  //   mainWindow.show();
  //   mainWindow.focus();
  // });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

function htmlTemplate(reactDom, sheets) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Hello Electron React!</title>
      <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"> -->
      <style type="text/css" id="server-side-styles">
      ${sheets.toString()}
    </style>
      <script>
        (function() {
          if (!process.env.HOT) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'http://localhost:1212/dist/style.css';
            // HACK: Writing the script path should be done with webpack
            document.getElementsByTagName('head')[0].appendChild(link);
          }
        }());
      </script>
    </head>
    <body>
      <div id="root">
        ${reactDom}
      </div>
      <script>
        {
          const scripts = [];
  
          // Dynamically insert the DLL script in development env in the
          // renderer process
          if (process.env.NODE_ENV === 'development') {
            scripts.push('file:///C:/sf.code/JOHNLEE/react-electron-rest-client/dll/renderer.dev.dll.js');
          }
  
          // Dynamically insert the bundled app script in the renderer process
          const port = process.env.PORT || 1212;
          scripts.push(
            (process.env.HOT)
              ? 'http://localhost:' + port + '/dist/renderer.dev.js'
              : './dist/renderer.prod.js'
          );
  
          document.write(
            scripts
              .map(script => {
                const line = "<script defer src="+script+"></s"+"cript>"
                return line;
              })
              .join('')
          );
        }
      </script>
    </body>
  </html>
  
  `;
}
