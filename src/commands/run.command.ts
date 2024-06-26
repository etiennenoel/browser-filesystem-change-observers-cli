import {CommandInterface, ConsoleManager, ExitCodeEnum, ShellManager} from '@pristine-ts/cli';
import {injectable} from 'tsyringe';
import {RunCommandOptions} from '../command-options/run.command-options';
import {ServiceDefinitionTagEnum, tag} from '@pristine-ts/common';
import {DirectoryManager} from '@pristine-ts/file';
import {FileNameGenerator} from '../generators/file-name.generator';
import {DirectoryNameGenerator} from '../generators/directory-name.generator';
import {PathGenerator} from '../generators/path.generator';
import {randomInt} from 'crypto';
import {ChangeActionGenerator} from '../generators/change-action.generator';
import {FileChangeManager} from '../managers/file-change.manager';
import { ChangeActionReplayManager } from '../managers/change-action-replay.manager';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, unlink, unlinkSync } from 'fs';
import { FileReplay } from '../models/file-replay.model';
import { ChangeExecutorManager } from '../managers/change-executor.manager';
import { readdir } from 'fs/promises';
import path from 'path';
import { ChangeAction } from '../actions/change.action';

@tag(ServiceDefinitionTagEnum.Command)
@injectable()
export class RunCommand implements CommandInterface<RunCommandOptions> {
  name: string = "run";
  optionsType: RunCommandOptions;

  constructor(private readonly consoleManager: ConsoleManager,
              private readonly directoryManager: DirectoryManager,
              private readonly fileChangeManager: FileChangeManager,
              private readonly changeActionReplayManager: ChangeActionReplayManager,
              private readonly changeExecutorManager: ChangeExecutorManager,
              private readonly shellManager: ShellManager,
  ) {
  }

 private async generateChange(args: RunCommandOptions) {
  const changeAction = await this.fileChangeManager.generate(args);

  this.consoleManager.writeLine(changeAction.toString());

  if(args.saveReplayFile) {
    this.changeActionReplayManager.appendChangeActionToFileReplay(changeAction);
  }
 }

  private async replayFile(fileReplay: FileReplay): Promise<ExitCodeEnum> {
    // If there are no interval, we need to replay it in "manual mode".
  return new Promise( async (resolve) => {
    let changeActionsIndex = 0;

    if(fileReplay.interval) {
      const interval = setInterval(async () => {
        if(changeActionsIndex >= fileReplay.changeActions.length) {
          return resolve(ExitCodeEnum.Success);
        }

        const changeAction = new ChangeAction(fileReplay.changeActions[changeActionsIndex]);
        await this.changeExecutorManager.executeChange(fileReplay.rootDirectoryPath, changeAction);
        this.consoleManager.writeLine(changeAction.toString());

        changeActionsIndex++;
      }, fileReplay.interval);
    } else {
      do {
        await this.consoleManager.readLine("Press the 'enter' key to process the next change. Press 'ctrl-c' to exit.")

        const changeAction = new ChangeAction(fileReplay.changeActions[changeActionsIndex]);
        await this.changeExecutorManager.executeChange(fileReplay.rootDirectoryPath, changeAction);

        this.consoleManager.writeLine(changeAction.toString());

        changeActionsIndex++;
      } while(changeActionsIndex < fileReplay.changeActions.length)

      return resolve(ExitCodeEnum.Success);
    }
  });


  }

  async run(args: RunCommandOptions): Promise<ExitCodeEnum | number> {
    this.consoleManager.writeLine("File System Change Observers CLI");
    this.consoleManager.writeLine("Options:")
    this.consoleManager.writeLine("========")
    const rootDirectoryPath = args.rootDirectoryPath;

    const rootDirectoryPathExists = await this.directoryManager.exists(rootDirectoryPath);

    this.consoleManager.writeLine(`Directory Path: '${rootDirectoryPath}' [${rootDirectoryPathExists ? 'EXISTS' : 'NOT FOUND'}]`)

    if (!rootDirectoryPathExists) {
      this.consoleManager.writeLine(`The directory path '${rootDirectoryPath}' doesn't exist. It will be created.`)
      mkdirSync(rootDirectoryPath, {
        recursive: true,
      });
    }

    if(args.replayFilePath) {
      this.consoleManager.writeLine(`Replaying file '${args.replayFilePath}'. Press 'ctrl-c' to exit.`)

      if(existsSync(args.replayFilePath) === false) {
        this.consoleManager.writeLine(`The replay file '${args.replayFilePath}' doesn't exist.`);
        return ExitCodeEnum.Error;
      }

      if(args.clearRootDirectoryPathOnReplay) {
        if(args.rootDirectoryPath && args.rootDirectoryPath !== "/") {
          await this.shellManager.execute(`rm -rf ${args.rootDirectoryPath}/*`, {outputDuration: false,})
        }

      } else {
        // Check if the replay directory is empty or not.
        if(readdirSync(args.rootDirectoryPath).length !== 0) {
          this.consoleManager.writeLine(`You are replaying and this directory '' isn't empty. Be careful, it might produce unexpected results. If you want to automatically clear it, pass this argument: '--clearRootDirectoryPathOnReplay=true' `)
        }
      }

      this.consoleManager.writeLine(`The directory '${args.rootDirectoryPath}' is now ready to be observed.`)
      const fileReplay = JSON.parse(readFileSync(args.replayFilePath, "utf-8"));

      return this.replayFile(fileReplay);
    }

    if(args.continuous) {
      this.consoleManager.writeLine(`Continuous: ${args.continuous}`)
      this.consoleManager.writeLine(`Interval: ${args.interval}`)
      this.consoleManager.writeLine(`Stop After X Iterations: ${args.stopAfterXIterations}`)
    }

    if(args.saveReplayFile) {
      this.changeActionReplayManager.createFileReplay({
        interval: args.interval,
        rootDirectoryPath: args.rootDirectoryPath
      });
    }

    // Generate a random directory name

    this.consoleManager.writeLine("")

    if (args.continuous) {
      return new Promise((resolve, reject) => {
        let numberOfExecutions = 0;

        const interval = setInterval(async () => {
          if(args.stopAfterXIterations && numberOfExecutions >= args.stopAfterXIterations) {
            return resolve(ExitCodeEnum.Success);
          }

          await this.generateChange(args);

          numberOfExecutions++;
        }, args.interval)
      });
    } else {
      do {
        await this.consoleManager.readLine("Press the 'enter' key to generate a change. Press 'ctrl-c' to exit.")

        await this.generateChange(args);
      } while (true)

    }

    return Promise.resolve(ExitCodeEnum.Success);
  }
}
