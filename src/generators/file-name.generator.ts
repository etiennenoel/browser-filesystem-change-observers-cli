import {injectable} from 'tsyringe';
import {DirectoryManager, FileManager} from '@pristine-ts/file';
import {randomBytes} from 'node:crypto';
import {randomInt} from 'crypto';

@injectable()
export class FileNameGenerator {
    animals = [
        "aardvark",
        "bear",
        "camel",
        "dolphin",
        "elephant",
        "fox",
        "gorilla",
        "hippopotamus",
        "impala",
        "jaguar",
        "kangaroo",
        "lion",
        "monkey",
        "narwhal",
        "octopus",
        "panda",
        "quail",
        "rabbit",
        "snake",
        "tiger",
        "urial",
        "vulture",
        "wolf",
        "x-Ray",
        "yak",
        "zebra",
    ];

    countries = [
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
    ]

    firstNames = [
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
    ];

    petNames = [
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
    ];

    constructor(private readonly directoryManager: DirectoryManager, private readonly fileManager: FileManager) {
    }

    generate(previousPathParts: string[] = []) {
        const isAnimal = previousPathParts.indexOf("animals") !== -1;
        const isCountry = previousPathParts.indexOf("countries") !== -1;
        const isFamily = previousPathParts.indexOf("family") !== -1;
        const isPets = previousPathParts.indexOf("pets") !== -1;
        const isPictures = previousPathParts.indexOf("pictures") !== -1;
        const isDocuments = previousPathParts.indexOf("documents") !== -1;

        let possibleFilenames: string[] = [];

        if (isAnimal) {
            possibleFilenames = this.animals;
        } else if (isCountry) {
            possibleFilenames = this.countries;
        } else if (isFamily) {
            possibleFilenames = this.firstNames;
        } else if (isPets) {
            possibleFilenames = this.petNames;
        }

        if (possibleFilenames.length === 0) {
            if(isPictures) {
                possibleFilenames = [
                    "profile_picture",
                    "background",
                ];
            } else if(isDocuments) {
                possibleFilenames = [
                    "agenda",
                    "schedule",
                    "meeting_notes",
                ];
            } else {
                possibleFilenames = [
                    "2024-03-02_log",
                    "backup",
                ];
            }

        }

        // Randomly select a file name
        const randomNumber = randomInt(0, possibleFilenames.length);

        let filename = possibleFilenames[randomNumber];

        if (isPictures) {
            filename += ".jpg";
        } else {
            filename += ".txt";
        }

        return filename;
    }
}