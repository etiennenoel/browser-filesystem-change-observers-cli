import {injectable} from 'tsyringe';
import {FileNameGenerator} from './file-name.generator';
import {DirectoryNameGenerator} from './directory-name.generator';
import {ElementTypeEnum} from '../enums/element-type.enum';
import {randomInt} from "crypto";

@injectable()
export class PathGenerator {
  constructor(
      private readonly fileNameGenerator: FileNameGenerator,
      private readonly directoryNameGenerator: DirectoryNameGenerator,
  ) {
  }

  generate(elementType: ElementTypeEnum, nestingLevels: number): string[] {
    const pathParts: string[] = [];

    for (let currentNestingLevel = 1; currentNestingLevel <= nestingLevels; currentNestingLevel++) {
      if(elementType === ElementTypeEnum.File && currentNestingLevel === nestingLevels) {
        pathParts.push(this.fileNameGenerator.generate(pathParts));
      } else {
        const directory = this.directoryNameGenerator.generate(pathParts);

        if(directory === null) {
          break;
        }

        pathParts.push(directory);
      }
    }

    return pathParts;
  }
}