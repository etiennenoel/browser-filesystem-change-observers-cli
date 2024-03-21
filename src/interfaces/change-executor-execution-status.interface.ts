import {ExecutionStatusEnum} from '../enums/execution-status.enum';

export interface ChangeExecutorExecutionStatusInterface {
  status: ExecutionStatusEnum;

  message?: string;
}