import {ChangeAction} from '../actions/change.action';
import {ChangeExecutorIsExecutableInterface} from './change-executor-is-executable.interface';
import {ChangeExecutorExecutionStatusInterface} from './change-executor-execution-status.interface';

export interface ChangeExecutorInterface {
  supports(changeAction: ChangeAction): boolean;

  isExecutable(baseDirectory: string, changeAction: ChangeAction): Promise<ChangeExecutorIsExecutableInterface>;

  execute(baseDirectory: string, changeAction: ChangeAction): Promise<ChangeExecutorExecutionStatusInterface>;
}