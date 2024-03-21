import {injectable} from 'tsyringe';
import {ChangeAction} from '../actions/change.action';
import {PathGenerator} from './path.generator';
import {ElementTypeEnum} from '../enums/element-type.enum';
import {randomInt} from 'crypto';
import {ChangeTypeGenerator} from './change-type.generator';
import {ChangeTypeEnum} from '../enums/change-type.enum';

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

    if(changeAction.changeType === ChangeTypeEnum.MOVE) {
      changeAction.destinationFilePath = this.pathGenerator.generate(changeAction.elementType, randomInt(1, 4));
    }

    return changeAction;
  }

}