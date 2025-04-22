enum filetypes {
    Directory,
    txt,
    sh,
    c,
    py,
    out,
    targz
}

type Node = {
    name: string; // 파일명
    type: filetypes; // 파일타입
    owner: string; // 소유자
    group: string; // 그룹
    permission: number[]; // 권한
    edit: Date; // 수정일
    children?: Node[];
};

class TreeNode {
    root: Node;
    children: Node[];

    constructor(edit: Date) {
        this.children = [];
        this.root = {
            name: '/',
            type: filetypes.Directory,
            owner: 'root',
            group: 'root',
            permission: [7, 7, 0],
            edit: edit,
            children: this.children
        };
    }

    addChild(child: Node) {
        this.children.push(child);
    }

    removeChild(childName: string) {
        this.children = this.children.filter(child => child.name !== childName);
        this.root.children = this.children; // root.children 최신화
    }
}

class FileSystem {
}

export { FileSystem };