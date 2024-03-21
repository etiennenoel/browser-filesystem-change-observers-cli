import {CommandInterface, ConsoleManager, ExitCodeEnum} from '@pristine-ts/cli';
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

@tag(ServiceDefinitionTagEnum.Command)
@injectable()
export class RunCommand implements CommandInterface<RunCommandOptions> {
  name: string = "run";
  optionsType: RunCommandOptions;

  constructor(private readonly consoleManager: ConsoleManager,
              private readonly directoryManager: DirectoryManager,
              private readonly fileChangeManager: FileChangeManager,
  ) {
  }

  async run(args: RunCommandOptions): Promise<ExitCodeEnum | number> {
    this.consoleManager.writeLine("File System Change Observers CLI");
    this.consoleManager.writeLine("Options:")
    this.consoleManager.writeLine("========")
    const rootDirectoryPath = args.rootDirectoryPath;

    const rootDirectoryPathExists = await this.directoryManager.exists(rootDirectoryPath);

    this.consoleManager.writeLine(`Directory Path: '${rootDirectoryPath}' [${rootDirectoryPathExists ? 'EXISTS' : 'NOT FOUND'}]`)

    if (!rootDirectoryPathExists) {
      this.consoleManager.writeLine(`The directory path '${rootDirectoryPath}' doesn't exist. Aborting`)
      return ExitCodeEnum.Error
    }


    if(args.continuous) {
      this.consoleManager.writeLine(`Continuous: ${args.continuous}`)
      this.consoleManager.writeLine(`Interval: ${args.interval}`)
      this.consoleManager.writeLine(`Stop After X Iterations: ${args.stopAfterXIterations}`)
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
          const changeAction = await this.fileChangeManager.generate(args);

          this.consoleManager.writeLine(changeAction.toString());
          numberOfExecutions++;
        }, args.interval)
      });
    } else {
      do {
        await this.consoleManager.readLine("Press the 'enter' key to generate a change. Press 'ctrl-c' to exit.")
        const changeAction = await this.fileChangeManager.generate(args);

        this.consoleManager.writeLine(changeAction.toString());
      } while (true)

    }

    return Promise.resolve(ExitCodeEnum.Success);
  }
}