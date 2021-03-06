# OBS Scripts

A collection of scripts that I use for [OBS Studio](https://obsproject.com/) (Open Broadcaster Software). These perform various operations in OBS via an obs-websockets connection.

## Installation

Clone this repository, and run `npm i` to install dependencies:

```
git clone https://github.com/bendechrai/obs-scripts.git
cd obs-scripts
npm i
```

You'll also need to install the [OBS WebSockets plugin](https://obsproject.com/forum/resources/obs-websocket-remote-control-obs-studio-from-websockets.466/)
and restart OBS.

## Configuration

Copy `.env.example` to `.env` and configure:

- Core config
  - **OBS_WS_ADDRESS** The address that the OBS WebSockets plugin is listening on. By default, this will be localhost:4444 if running the script on the same machine as OBS is running.
  - **OBS_WS_PASSWORD** The OBS WebSockets plugin doesn't require a password by default. You might want to do this though. Configure this in OBS (Tools > WebSockets Server Settings) and configure your chosen password in the `.env` file.
- Countdown configuration
  - **OBS_START_SCENE**: The name of the OBS scene you want to switch to when the countdown starts. This is the scene that includes the countdown.txt contents.
  - **OBS_TRANSITION_SCENE**: The name of the OBS scene you want to transition via after when the countdown ends. If this is a blank string, we'll move straight to the `OBS_END_SCENE` scene, and ignore the `OBS_TRANSITION_DELAY`.
  - **OBS_TRANSITION_DELAY**: If the `OBS_TRANSITION_SCENE` is set, we'll wait this many milliseconds before switching scenes.
  - **OBS_END_SCENE**: The name of the OBS scene you want to switch to when the countdown ends.
  - **OBS_END_DELAY**: We'll wait this many milliseconds before switching to the `OBS_END_SCENE` scene.

## OBS Countdown Timer

This counts down to a target timestamp, and automatically transitions to another scene, optionally via a transition scene.

### Running the countdown timer

Simply call the script and pass the target timestamp:

```
npm run countdown "2020-05-30 13:00"
```

### Showing the countdown timer in OBS

In the scene that you want the timer to show, add a new source of type "Text". Leave the "Text" field blank, and tick the "Read from file" checkbox.

In the "Text File" file selector, select `countdown.txt` from this project directory. Note, this file won't exists until the first time you start the countdown timer.

During the countdown, the `countdown.txt` file will contain just the remaining time, in the format `h:mm:ss` or `m:ss`, prefied with the word "in". For example, with 2 minutes and 45 seconds remaining, it will read `in 2:45`. Once the countdown timer finishes, the file will contain `Soon!`. Edit the `countdown.js` file to your heart's content to modify this.

Bearing this in mind, you might want to add a static string alongside the dynamic content, that works for both the countdown text and final message, like "Starting". This could be a separate OBS source element, or added right into the JavaScript file.

### Use case for a transition scene

If you're using something like the [Move Transition plugin](https://obsproject.com/forum/resources/move-transition.913/), you might want to transition from a title screen to another scene that allows fancy animation of each element. This might require you to have lots of individual elements in these two scenes.

Managing all your other scenes though, is easier if you create a background and overlay scene that you can include. This could break the Move Transition effect though.

In this case, you could have a **Countdown Title** scene and **Post-Countdown** scene that are configured for an amazing animated transition, and a **Starting Soon** scene that looks like **Post-Countdown** scene, but is optimised to use templates shared by other scenes.

By overriding the transition from **Post-Countdown** to **Starting Soon** to have no animation (cut transition), your output won't look any different.

### Countdown Example

[![Example for OBS Countdown Timer on YouTube](https://img.youtube.com/vi/azusNGU_vOw/0.jpg)](http://www.youtube.com/watch?v=azusNGU_vOw)

## Scene Switcher

This provides a simple scene switching operation, and was created to be called from [@timothycrosley](https://github.com/timothycrosley)'s [streamdeck_ui](https://timothycrosley.github.io/streamdeck-ui/) -- a Linux compatible UI for the Elgato Stream Deck.

### Running the scene switcher

Simply call the script and pass the target scene. In the event there are spaces in your scene names, replace them with underscores. If you have underscores in your scene names, you'll need to tinker with the `switch.js` file.

```
npm run switch Countdown_Title
```
