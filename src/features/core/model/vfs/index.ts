
import { Inode, InodeType } from "../../config";
import { IndexNum } from "../../lib";
import { BaseTree } from "../base";
export class FileSystem {
    dataMap = new Map<number, Inode>();
    inodeMap = new Map<string, number>();
    idx = new IndexNum();
    baseTree: BaseTree<Inode, number>;
    constructor() {
        const rootInodeNumber = this.idx.getNumber();
        const rootInodeData = new Inode(
            InodeType.Directory,
            [0, 7, 5, 5], // [특수권한 없음, rwx, r-x, r-x]
            0,          // ownerUid (root)
            0,          // groupId (root)
            4096,          // sizeInBytes (예시)
            2,             // hardLinkCount (루트 자신 '.' 및 그 자식 디렉토리의 '..' 링크 수)
            1,             // blockCount (예시)
            new Date(),    // accessTime (현재 시각)
            new Date(),    // modifyTime (현재 시각)
            new Date()     // changeTime (현재 시각)
        );
        this.dataMap.set(rootInodeNumber, rootInodeData);
        this.inodeMap.set('/', rootInodeNumber);
        this.baseTree = new BaseTree<Inode, number>(rootInodeData, rootInodeNumber);
    }
    createNode(parentDirPath: string, fileName: string, initialContent: string) {
    }
    deleteNode(name: string, user: string, group: string[]): boolean {

    }
    updateNode(name: string, data: Node, user: string, group: string[]): boolean {

    }
    checkPermit(currPath: string, user: string, group: string[], data?: Node) {

    }
}




