import {injectable} from 'tsyringe';
import {DirectoryManager, FileManager} from '@pristine-ts/file';
import {ChangeActionGenerator} from '../generators/change-action.generator';
import {RunCommandOptions} from '../command-options/run.command-options';

@injectable()
export class FileChangeManager {
  constructor(private readonly fileChangeGenerator: ChangeActionGenerator) {
  }

  generate(options: RunCommandOptions) {
    // Generate the next action

    // Ask the action executor if it can be executed. If it can't, generate a new one until one is executable.
  }
}