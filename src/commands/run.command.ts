import {CommandInterface, ConsoleManager, ExitCodeEnum} from '@pristine-ts/cli';
import {injectable} from 'tsyringe';
import {RunCommandOptions} from '../command-options/run.command-options';
import {ServiceDefinitionTagEnum, tag} from '@pristine-ts/common';
import {DirectoryManager} from '@pristine-ts/file';
import {FileNameGenerator} from '../generators/file-name.generator';
import {DirectoryNameGenerator} from '../generators/directory-name.generator';
import {PathGenerator} from '../generators/path.generator';
import {randomInt} from 'crypto';

@tag(ServiceDefinitionTagEnum.Command)
@injectable()
export class RunCommand implements CommandInterface<RunCommandOptions> {
  name: string = "run";
  optionsType: RunCommandOptions;

  constructor(private readonly consoleManager: ConsoleManager,
              private readonly directoryManager: DirectoryManager,
              private readonly pathGenerator: PathGenerator,
  ) {
  }

  async run(args: RunCommandOptions): Promise<ExitCodeEnum | number> {
    this.consoleManager.writeLine("File System Change Observers CLI");
    this.consoleManager.writeLine("Options:")
    this.consoleManager.writeLine("========")
    const rootDirectoryPath = args.rootDirectoryPath;

    const rootDirectoryPathExists = await this.directoryManager.exists(rootDirectoryPath);

    this.consoleManager.writeLine(`Directory Path: '${rootDirectoryPath}' [${rootDirectoryPathExists ? 'EXISTS' : 'NOT FOUND'}]`)

    if(rootDirectoryPathExists === false) {
      this.consoleManager.writeLine(`The directory path '${rootDirectoryPath}' doesn't exist. Aborting`)
      return ExitCodeEnum.Error
    }

    // Generate a random directory name

    this.consoleManager.writeLine("")

    await this.consoleManager.readLine("Press the 'enter' key to generate a change.", {showCharactersOnTyping: false})
    this.consoleManager.writeLine(this.pathGenerator.generate(randomInt(1, 4)));

    return Promise.resolve(ExitCodeEnum.Success);
  }
}