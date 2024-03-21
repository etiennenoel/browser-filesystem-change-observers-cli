Browser Filesystem Change Observers CLI
===========================

This project will create changes for you inside a directory. This CLI uses
human-friendly filenames so that it's easy to identify the changes. It uses countries, 
first names, animals and pet names.

## Setup
1- Clone this repository
2- At the root, run `npm install`. Make sure you have node installed for your computer.
3- Run `npm build`

## Base Directory
This tool requires a Base Directory where it will do changes. Ideally, it should be empty but it doesn't have to be.

This parameter is set via `--rootDirectoryPath`. You can go to `package.json` and change the parameter there.

## Continuous mode
In the continuous mode (`--continuous`), the CLI will constantly be generating changes. You specify
the `--interval` and `--stopAfterXIterations(optional)`  values to control the 
frequency and when it should stop.

To run it, just run:

`npm run generate-changes-continuously`

To change the parameters mentioned above, go to `package.json` and change the parameters there.

## Manual mode
In the manual mode, the CLI stays active and you must press 'enter' to generate a new change.

To run it, just run:

`npm run generate-changes-manually`



## TODOS

 - [] Support building scenarios of specific action
   - [] Scenarios are simply a list of change actions to be executed in order. The executed actions will be stored in a scenario file by datetime so they can be replayed.
   - [] There should be a configuration option that accepts a json file to replay scenarios
 - [] Support executing actions with different mechanisms than just Node's version of it. For example, using the command `mkdir` versus `md`. There should be an option to `useOsSpecificCommandsForActions`