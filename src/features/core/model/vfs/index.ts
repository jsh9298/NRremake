import { filetypes, link_type, Node, Inode, IndexNum } from "@/src/features/core";
import { BaseTree } from "../base";
export class FileSystem {
    dataBlock = new Map<number, Node>();
    inodeBlock = new Map<string, number>();
    idx = new IndexNum();
    baseTree: BaseTree<Node>;
    constructor() {
        this.baseTree = new BaseTree<Node>(
            {
                name: '/',
                type: filetypes.dir,
                owner: 'root',
                group: ['root'],
                permission: [7, 7, 0],
                edit: new Date(),
                inode: {
                    inode: this.idx.getNumber(),
                    link_type: link_type.none
                }
            }
        );
    }
    createNode(name: string, type: filetypes, owner: string) {
        const newInode: Inode = {
            inode: this.idx.getNumber(),
            link_type: link_type.none
        }
        const newNode: Node = {
            name: name,
            type: type,
            owner: owner,
            group: [owner],
            permission: [],
            edit: new Date(),
            inode: newInode
        }
        this.dataBlock.set(newInode.inode, newNode);
        this.inodeBlock.set(newNode.name, newInode.inode);
    }
    deleteNode(name: string): boolean {
        const inode = this.inodeBlock.get(name);
        if (inode) {
            const target = this.dataBlock.get(inode);
            if (target) {
                this.baseTree.removeNode(target);
                this.dataBlock.delete(inode);
                this.inodeBlock.delete(name);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    // readNode(name: string, user: string, group: string[]): Node {

    // }
    // updateNode(data: Partial<Node>, user: string, group: string[]): boolean {

    // }
}




