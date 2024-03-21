import {injectable} from 'tsyringe';
import {DirectoryManager, FileManager} from '@pristine-ts/file';
import {FileChangeGenerator} from '../generators/file-change.generator';
import {RunCommandOptions} from '../command-options/run.command-options';

@injectable()
export class FileChangeManager {
  constructor(private readonly fileChangeGenerator: FileChangeGenerator) {
  }

  generate(options: RunCommandOptions) {

  }
}