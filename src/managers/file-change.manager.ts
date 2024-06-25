import {injectable} from 'tsyringe';
import {DirectoryManager, FileManager} from '@pristine-ts/file';
import {ChangeActionGenerator} from '../generators/change-action.generator';
import {RunCommandOptions} from '../command-options/run.command-options';
import {ChangeExecutorManager} from './change-executor.manager';
import {ChangeAction} from '../actions/change.action';
import { ChangeActionReplayManager } from './change-action-replay.manager';

@injectable()
export class FileChangeManager {
  constructor(
    private readonly directoryManager: DirectoryManager,
    private readonly changeActionGenerator: ChangeActionGenerator,
    private readonly changeExecutorManager: ChangeExecutorManager,
  ) {
  }

  async generate(options: RunCommandOptions): Promise<ChangeAction> {
    // Ask the action executor if it can be executed. If it can't, generate a new one until one is executable.
    do {
      // Generate the next action
      const changeAction = this.changeActionGenerator.generate();

      const isExecutable = await this.changeExecutorManager.isExecutable(options.rootDirectoryPath, changeAction);

      if(isExecutable === false) {
        continue;
      }

      await this.changeExecutorManager.executeChange(options.rootDirectoryPath, changeAction);

      if(options.saveReplayFile) {

      }

      return changeAction;
    } while (true)
  }
}