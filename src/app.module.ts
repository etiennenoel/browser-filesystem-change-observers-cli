import {AppModuleInterface} from '@pristine-ts/common';
import {CliModule} from '@pristine-ts/cli';
import {RunCommand} from './commands/run.command';
import {LoggingModule} from '@pristine-ts/logging';
import {DirectoryNameGenerator} from './generators/directory-name.generator';
import {ChangeActionGenerator} from './generators/change-action.generator';
import {FileNameGenerator} from './generators/file-name.generator';
import {PathGenerator} from './generators/path.generator';
import {ChangeTypeGenerator} from './generators/change-type.generator';
import {DirectoryCreateChangeExecutor} from './change-executors/directory-create.change-executor';
import {FileCreateChangeExecutor} from './change-executors/file-create.change-executor';
import {MoveChangeExecutor} from './change-executors/move.change-executor';
import {FileDeleteChangeExecutor} from './change-executors/file-delete.change-executor';
import {FileModifyChangeExecutor} from './change-executors/file-modify.change-executor';

export const AppModule: AppModuleInterface = {
  importServices: [
    // Change Executors
    DirectoryCreateChangeExecutor,
    FileCreateChangeExecutor,
    FileDeleteChangeExecutor,
    FileModifyChangeExecutor,
    MoveChangeExecutor,

    // Commands
    RunCommand,

    // Generators
    ChangeActionGenerator,
    ChangeTypeGenerator,
    DirectoryNameGenerator,
    FileNameGenerator,
    PathGenerator,
  ],
  keyname: 'app.module',
  importModules: [
    LoggingModule,
    CliModule,
  ]
}