
enum filetypes {
    dir,
    txt,
    sh,
    c,
    py,
    out,
    tar
}
enum link_type {
    none,
    hard,
    soft
}
type Inode = {
    p_inode?: number;
    inode: number;
    link_type: link_type;
};
type Node = {
    name: string; // 파일명
    type: filetypes; // 파일타입
    owner: string; // 소유자
    group: string[]; // 그룹
    permission: number[]; // 권한
    edit: Date; // 수정일
    inode: Inode;
};
export type { Node, Inode }
export { filetypes, link_type };