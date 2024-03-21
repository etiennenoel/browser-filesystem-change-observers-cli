import {injectable} from 'tsyringe';
import {ChangeTypeEnum} from '../enums/change-type.enum';
import {randomInt} from 'crypto';

@injectable()
export class ChangeTypeGenerator {
  generate(): ChangeTypeEnum {
    const enumValues = Object.values(ChangeTypeEnum);
    return enumValues[randomInt(0, enumValues.length)];
  }
}