import { injectable, singleton } from "tsyringe";
import { ChangeAction } from "../actions/change.action";
import { FileReplay } from "../models/file-replay.model";
import { DirectoryManager } from "@pristine-ts/file";
import { PathManager } from "@pristine-ts/cli";
import {mkdirSync, existsSync, writeFileSync, appendFileSync, readFileSync} from "fs";
import { format } from "date-fns";
import path from "path";

@singleton()
@injectable()
export class ChangeActionReplayManager {
    private fileTitle;


    constructor(private readonly pathManager: PathManager) {
    }

    public createFileReplay(options: {
        rootDirectoryPath: string,
         interval: number} ) {
        const fileReplay = new FileReplay();
        fileReplay.interval = options.interval;
        fileReplay.rootDirectoryPath = options.rootDirectoryPath;

        const replayFilesFolder = this.pathManager.getPathRelativeToCurrentExecutionDirectory("replay-files");

        if(!existsSync(replayFilesFolder)) {
            mkdirSync(replayFilesFolder);
        }

        this.fileTitle = path.join(replayFilesFolder, format(new Date(), "yyyy-MM-dd_hh:mm:ss") + ".json");

        writeFileSync(this.fileTitle, JSON.stringify(fileReplay, null, 2), "utf-8");
    }

    public appendChangeActionToFileReplay(changeAction: ChangeAction) {
        // We need to load the file first
        const fileReplay = JSON.parse(readFileSync(this.fileTitle, "utf-8")) as FileReplay;
        fileReplay.changeActions.push(changeAction);

        writeFileSync(this.fileTitle, JSON.stringify(fileReplay, null, 2), "utf-8");
    }
}