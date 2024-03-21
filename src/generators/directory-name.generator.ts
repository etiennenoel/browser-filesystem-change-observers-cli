import {injectable} from 'tsyringe';
import {randomInt} from 'crypto';

@injectable()
export class DirectoryNameGenerator {

  generate(previousPathParts: string[] = []): string | null {
    const numberOfPathParts = previousPathParts.length;

    let possibleDirectoryNames: string[] = [];

    switch (numberOfPathParts) {
      case 0:
        possibleDirectoryNames = [
          "documents",
          "pictures",
        ];
        break;
      case 1:
        switch(previousPathParts[0]) {
          case "documents":
              possibleDirectoryNames = [
                  "animals",
                  "countries",
              ];
            break;

          case "pictures":
            possibleDirectoryNames = [
                "family",
                "pets",
            ]
            break;
        }
        break;
      default: // We only support two levels of directories
        break;
    }

    if(possibleDirectoryNames.length === 0) {
      return null;
    }

    // Randomly select a directory name
    const randomNumber = randomInt(0, possibleDirectoryNames.length);

    return possibleDirectoryNames[randomNumber];
  }
}