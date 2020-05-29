# OBS Countdown Timer

This is a node utility that counts down to a target timestamp, and automatically transitions to another scene via an obs-websockets connection.

## Installation

Clone this repository, and run `npm i` to install dependencies:

```
git clone https://github.com/bendechrai/obs-countdown-timer.git
cd obs-countdown-timer
npm i
```

You'll also need to install the [OBS WebSockets plugin](https://obsproject.com/forum/resources/obs-websocket-remote-control-obs-studio-from-websockets.466/)
and restart OBS.

## Configuration

Copy `.env.example` to `.env` and configure:

* **WS_ADDRESS** The address that the OBS WebSockets plugin is listening on. By default, this will be localhost:4444 if running the script on the same machine as OBS is running.
* **PASSWORD** The OBS WebSockets plugin doesn't require a password by default. You might want to do this though. Configure this in OBS (Tools > WebSockets Server Settings) and configure your chosen password in the `.env` file.
* **OBS_START_SCENE**: The name of the OBS scene you want to switch to when the countdown starts.
* **OBS_END_SCENE**: The name of the OBS scene you want to switch to when the countdown ends.

## Running the script

Simply call the script and pass the target timestamp:

```
node index.js "2020-05-30 00:30"
```

## Example

[![Example for OBS Countdown Timer on YouTube](https://img.youtube.com/vi/azusNGU_vOw/0.jpg)](http://www.youtube.com/watch?v=azusNGU_vOw)
