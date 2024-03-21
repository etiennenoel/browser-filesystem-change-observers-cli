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
import {rename, writeFile} from 'fs/promises';
import * as crypto from 'crypto';

@tag("ChangeExecutorInterface")
@injectable()
export class MoveChangeExecutor implements ChangeExecutorInterface {
  supports(changeAction: ChangeAction): boolean {
    return (changeAction.elementType === ElementTypeEnum.File || changeAction.elementType === ElementTypeEnum.Directory) && changeAction.changeType === ChangeTypeEnum.MOVE && changeAction.filePath.length !== 0;
  }

  async isExecutable(baseDirectory: string, changeAction: ChangeAction): Promise<ChangeExecutorIsExecutableInterface> {
    // If the final file|directory already exists, we can't execute this change.
    const path = join(baseDirectory, ...changeAction.filePath);
    const destinationFilePath = join(baseDirectory, ...changeAction.destinationFilePath);
    const exists = existsSync(path);
    const destinationExists = existsSync(path);

    if(!exists) {
      return {
        message: `Cannot move file|directory '${path}' since it doesn't exist.`,
        isExecutable: false,
      }
    }

    if(destinationExists) {
      return {
        message: `Cannot move file|directory '${path}' to '${destinationFilePath}' since there's already a file|directory there.`,
        isExecutable: false,
      }
    }

    return {
      isExecutable: true,
      message: `File|Directory '${path}' can be moved.`,
    };
  }

  async execute(baseDirectory: string, changeAction: ChangeAction): Promise<ChangeExecutorExecutionStatusInterface> {
    const path = join(baseDirectory, ...changeAction.filePath);
    const destinationPath = join(baseDirectory, ...changeAction.destinationFilePath);

    await rename(path, destinationPath);

    return {
      status: ExecutionStatusEnum.Success,
    }
  }
}