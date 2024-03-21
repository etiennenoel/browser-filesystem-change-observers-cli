import {ChangeAction} from '../actions/change.action';

export interface ChangeExecutorInterface {
  supports(changeAction: ChangeAction): boolean;

  isExecutable(changeAction: ChangeAction): Promise<boolean>;

  execute(changeAction: ChangeAction): Promise<boolean>;
}