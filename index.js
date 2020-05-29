const OBSWebSocket = require('obs-websocket-js')
const moment = require('moment')
const fs = require('fs')
require('dotenv').config()

const obs = new OBSWebSocket()
obs.on('error', err => {})

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const generateCountdownString = (now, eventTime) => {

    // Calculate components of the time remaining
    const duration = moment.duration(eventTime.diff(now))
    const hours    = duration.get('hours')
    const minutes  = duration.get('minutes')
    const seconds  = duration.get('seconds')

    // If any value is greater than 0, we still have time to wait
    if( Math.max( hours, minutes, seconds ) > 0 ) {
        let remaining = 'in '
        if(hours>0) remaining += hours + ':'
        remaining += minutes + ':'
        if(seconds<10) remaining += '0'
        remaining += seconds
        return remaining

    } else {
        return false
    }
}

const countdown = (targetTimestamp) => {
    return new Promise(async (resolve) => {

        const eventTime = moment(targetTimestamp)

        let countdownString = generateCountdownString(moment(), eventTime)
        while( countdownString !== false ) {
            fs.writeFileSync('./countdown.txt', countdownString)
            await sleep(1000)
            countdownString = generateCountdownString(moment(), eventTime)
        }

        fs.writeFileSync('./countdown.txt', 'Soon!')
        await sleep(2000)
        resolve()

    })
}


const main = (targetTimestamp) => {

    obs.connect({ address: process.env.WS_ADDRESS, password: process.env.PASSWORD })
    .then(async () => {

        obs.send('SetCurrentScene', { 'scene-name': process.env.OBS_START_SCENE })
        await countdown(targetTimestamp)
        obs.send('SetCurrentScene', { 'scene-name': process.env.OBS_END_SCENE })
        obs.disconnect()

    })
    .catch(err => {
        console.log(err)
    })

}

const targetTimestamp = process.argv[2]
if(targetTimestamp && targetTimestamp.match(/^20[0-9]{2}-[01][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]$/)) {
    main(targetTimestamp)
} else {
    console.log('Usage: node index.js "yyyy-mm-dd hh:mm"')
}

