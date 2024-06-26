import {ChangeTypeEnum} from '../enums/change-type.enum';
import {ElementTypeEnum} from '../enums/element-type.enum';

export class ChangeAction {
  /**
   * The Element Type (Directory or File).
   */
  elementType: ElementTypeEnum;

  /**
   * The type of change to operate on the file
   */
  changeType: ChangeTypeEnum;

  /**
   * Contains the absolute file path from relative to the root directory of the Change Observer project.
   */
  filePath: string[];

  /**
   * Contains the destination filepath, in case of a move
   */
  destinationFilePath: string[];

  constructor(object?: any) {
    if(object) {
      this.elementType = object.elementType;
      this.changeType = object.changeType;
      this.filePath = object.filePath;
      this.destinationFilePath = object.destinationFilePath;
    }
  }

  toString() {
    return `[${this.elementType}] - [${this.changeType}] - /${this.filePath.join('/')}`;
  }

}