import {ChangeExecutorInterface} from '../interfaces/change-executor.interface';
import {injectable} from 'tsyringe';
import {ChangeAction} from '../actions/change.action';
import {ElementTypeEnum} from '../enums/element-type.enum';
import {ChangeTypeEnum} from '../enums/change-type.enum';

@injectable()
export class DirectoryCreateChangeExecutor implements ChangeExecutorInterface {
  execute(changeAction: ChangeAction): Promise<boolean> {
    return Promise.resolve(false);
  }

  isExecutable(changeAction: ChangeAction): Promise<boolean> {
    return Promise.resolve(false);
  }

  supports(changeAction: ChangeAction): boolean {
    return changeAction.elementType === ElementTypeEnum.Directory && changeAction.changeType === ChangeTypeEnum.CREATE;
  }

}