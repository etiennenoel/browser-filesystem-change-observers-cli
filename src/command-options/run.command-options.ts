import {IsBoolean, IsNumber, IsOptional, IsString} from '@pristine-ts/class-validator';

export class RunCommandOptions {

    @IsString()
    rootDirectoryPath: string;

    @IsOptional()
    @IsBoolean()
    continuous: boolean = false;

    @IsOptional()
    @IsNumber()
    interval: number = 2000;

    @IsOptional()
    @IsNumber()
    stopAfterXIterations?: number;
}