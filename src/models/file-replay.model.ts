import { ChangeAction } from "../actions/change.action";

export class FileReplay {
    rootDirectoryPath: string;

    interval?: number;

    changeActions: ChangeAction[] = [];
}