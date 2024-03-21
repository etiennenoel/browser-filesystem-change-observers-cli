import {IsString} from '@pristine-ts/class-validator';

export class RunCommandOptions {

    @IsString()
    rootDirectoryPath: string;

}