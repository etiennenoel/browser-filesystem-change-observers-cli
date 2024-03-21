import {ChangeExecutorInterface} from '../interfaces/change-executor.interface';
import {injectable} from 'tsyringe';
import {ChangeAction} from '../actions/change.action';
import {ElementTypeEnum} from '../enums/element-type.enum';
import {ChangeTypeEnum} from '../enums/change-type.enum';
import {ChangeExecutorIsExecutableInterface} from '../interfaces/change-executor-is-executable.interface';
import {join} from "node:path";
import {existsSync} from "node:fs"
import {ChangeExecutorExecutionStatusInterface} from '../interfaces/change-executor-execution-status.interface';
import {mkdirSync} from 'fs';
import {ExecutionStatusEnum} from '../enums/execution-status.enum';
import {tag} from '@pristine-ts/common';
import {rm, unlink} from 'fs/promises';

@tag("ChangeExecutorInterface")
@injectable()
export class DirectoryDeleteChangeExecutor implements ChangeExecutorInterface {

  supports(changeAction: ChangeAction): boolean {
    return changeAction.elementType === ElementTypeEnum.Directory && changeAction.changeType === ChangeTypeEnum.DELETE && changeAction.filePath.length !== 0;
  }

  async isExecutable(baseDirectory: string, changeAction: ChangeAction): Promise<ChangeExecutorIsExecutableInterface> {
    // If the final directory already exists, we can't execute this change.
    const path = join(baseDirectory, ...changeAction.filePath);
    const exists = existsSync(path);

    if(!exists) {
      return {
        message: `The directory at path '${path}' doesn't exists. Can't execute this change.`,
        isExecutable: false,
      }
    }

    return {
      isExecutable: true,
      message: `Directory '${path}' can be deleted.`,
    };
  }

  async execute(baseDirectory: string, changeAction: ChangeAction): Promise<ChangeExecutorExecutionStatusInterface> {
    const path = join(baseDirectory, ...changeAction.filePath);

    await rm(path, {
      recursive: true,
    })

    return {
      status: ExecutionStatusEnum.Success,
    }
  }
}