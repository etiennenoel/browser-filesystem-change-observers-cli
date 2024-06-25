import {injectable, injectAll} from 'tsyringe';
import {ChangeExecutorInterface} from '../interfaces/change-executor.interface';
import {ChangeAction} from '../actions/change.action';

@injectable()
export class ChangeExecutorManager {
  constructor(
    @injectAll("ChangeExecutorInterface") private readonly changeExecutors: ChangeExecutorInterface[],
  ) {
  }

  async isExecutable(baseDirectory: string, changeAction: ChangeAction): Promise<boolean> {
    let isExecutable = false;

    for (const value of this.changeExecutors) {
      if(value.supports(changeAction) === false) {
        continue;
      }

      // Actually log why and return that a new changeAction must be generated.
      if((await value.isExecutable(baseDirectory, changeAction)).isExecutable) {
        isExecutable = true;
      }
    }

    return isExecutable;
  }

  async executeChange(baseDirectory: string, changeAction: ChangeAction) {
    for (const value of this.changeExecutors) {
      if(value.supports(changeAction) === false) {
        continue;
      }

      await value.execute(baseDirectory, changeAction)
    }
  }
}