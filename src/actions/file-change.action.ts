import {ChangeTypeEnum} from '../enums/change-type.enum';

export class FileChangeAction {
  /**
   * The type of change to operate on the file
   */
  changeType: ChangeTypeEnum;

  /**
   * Contains the absolute file path from relative to the root directory of the Change Observer project.
   */
  filePath: string;


}