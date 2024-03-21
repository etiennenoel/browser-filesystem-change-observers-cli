import {injectable} from 'tsyringe';
import {DirectoryManager, FileManager} from '@pristine-ts/file';
import {randomBytes} from "node:crypto"
import {ChangeAction} from '../actions/change.action';
import {PathGenerator} from './path.generator';
import {ElementTypeEnum} from '../enums/element-type.enum';
import {randomInt} from 'crypto';
import {ChangeTypeGenerator} from './change-type.generator';
@injectable()
export class ChangeActionGenerator {

  constructor(
      private readonly pathGenerator: PathGenerator,
      private readonly changeTypeGenerator: ChangeTypeGenerator,
  ) {
  }

  generate(): ChangeAction {
    const changeAction = new ChangeAction();
    changeAction.elementType = randomInt(0, 2) === 0 ? ElementTypeEnum.Directory : ElementTypeEnum.File;
    changeAction.changeType = this.changeTypeGenerator.generate();
    changeAction.filePath = this.pathGenerator.generate(changeAction.elementType, randomInt(1, 4));

    return changeAction;
  }

}