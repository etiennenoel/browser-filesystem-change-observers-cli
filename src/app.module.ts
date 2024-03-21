import {AppModuleInterface} from '@pristine-ts/common';
import {CliModule} from '@pristine-ts/cli';
import {RunCommand} from './commands/run.command';
import {LoggingModule} from '@pristine-ts/logging';
import {DirectoryNameGenerator} from './generators/directory-name.generator';
import {FileChangeGenerator} from './generators/file-change.generator';
import {FileNameGenerator} from './generators/file-name.generator';
import {PathGenerator} from './generators/path.generator';

export const AppModule: AppModuleInterface = {
  importServices: [
      // Commands
      RunCommand,

      // Generators
      DirectoryNameGenerator,
      FileChangeGenerator,
      FileNameGenerator,
      PathGenerator,
  ],
  keyname: 'app.module',
  importModules: [
      LoggingModule,
      CliModule,
  ]
}