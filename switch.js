#!/usr/bin/node
const OBSWebSocket = require("obs-websocket-js")
const fs = require("fs")
require("dotenv").config()

let scene = process.argv[2]
if (!scene) {
  console.log('Usage: npm run switch "Scene_Name"')
  console.log(
    'Note: underscores are converted to spaces, so to change to a scene called "Main Scene", use "npm run switch Main_Scene"'
  )
} else {
  scene = scene.replace(/_/g, " ")

  const obs = new OBSWebSocket()
  obs.on("error", err => {})
  obs
    .connect({ address: process.env.OBS_WS_ADDRESS, password: process.env.OBS_WS_PASSWORD })
    .then(async () => {
      obs.send("SetCurrentScene", { "scene-name": scene })
      obs.disconnect()
    })
    .catch(err => {
      console.log(err)
    })
}
