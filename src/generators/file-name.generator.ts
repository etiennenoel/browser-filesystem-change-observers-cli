import {injectable} from 'tsyringe';
import {DirectoryManager, FileManager} from '@pristine-ts/file';
import {randomBytes} from 'node:crypto';
import {randomInt} from 'crypto';

@injectable()
export class FileNameGenerator {
  constructor(private readonly directoryManager: DirectoryManager, private readonly fileManager: FileManager) {
  }

  generate(previousPathParts: string[] = []) {
    const isAnimal = previousPathParts.indexOf("animals") !== -1;
    const isCountry = previousPathParts.indexOf("countries") !== -1;
    const isFamily = previousPathParts.indexOf("family") !== -1;
    const isPets = previousPathParts.indexOf("isPets") !== -1;

    let possibleFilenames: string[] = [];

    if (isAnimal) {
      possibleFilenames = [
        "aardvark.txt",
        "bear.txt",
        "camel.txt",
        "dolphin.txt",
        "elephant.txt",
        "fox.txt",
        "gorilla.txt",
        "hippopotamus.txt",
        "impala.txt",
        "jaguar.txt",
        "kangaroo.txt",
        "lion.txt",
        "monkey.txt",
        "narwhal.txt",
        "octopus.txt",
        "panda.txt",
        "quail.txt",
        "rabbit.txt",
        "snake.txt",
        "tiger.txt",
        "urial.txt",
        "vulture.txt",
        "wolf.txt",
        "x-Ray.txt",
        "yak.txt",
        "zebra.txt",
      ];
    }
    else if (isCountry) {
      possibleFilenames = [
        "afghanistan",
        "brazil",
        "canada",
        "denmark",
        "egypt",
        "france",
        "germany",
        "hungary",
        "india",
        "japan",
        "kenya",
        "luxembourg",
        "mexico",
        "nigeria",
        "oman",
        "pakistan",
        "qatar",
        "russia",
        "spain",
        "thailand",
        "united_states",
        "venezuela",
        "wales",
        "xenia",
        "yemen",
        "zambia",
      ];
    }
    else if (isFamily) {
      possibleFilenames = [
        "adam",
        "benjamin",
        "charlotte",
        "dylan",
        "emily",
        "florence",
        "gabriel",
        "hannah",
        "isaac",
        "julia",
        "katherine",
        "leo",
        "mia",
        "noah",
        "olivia",
        "penelope",
        "quinn",
        "riley",
        "samuel",
        "thomas",
        "uriel",
        "violet",
        "william",
        "xavier",
        "yasmin",
        "zachary",
      ]
    }
    else if (isPets) {
      possibleFilenames = [
        "abby",
        "buddy",
        "coco",
        "duke",
        "ellie",
        "finn",
        "ginger",
        "harley",
        "izzy",
        "jasper",
        "kitty",
        "leo",
        "max",
        "nala",
        "oliver",
        "peach",
        "quinn",
        "riley",
        "shadow",
        "tucker",
        "uno",
        "vader",
        "willow",
        "xena",
        "yoshi",
        "zeus",
      ]
    }

    if(possibleFilenames.length === 0) {
      return randomBytes(20).toString('hex');;
    }

    // Randomly select a file name
    const randomNumber = randomInt(0, possibleFilenames.length);

    return possibleFilenames[randomNumber];
  }
}