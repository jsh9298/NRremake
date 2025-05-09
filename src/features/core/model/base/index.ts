export enum InodeType {
    File = 'file',
    Directory = 'directory',
    SymbolicLink = 'symlink',
    BlockDevice = 'block',
    CharacterDevice = 'char',
    NamedPipe = 'pipe',
    Socket = 'socket',
    Unknown = 'unknown',
}


export class BaseTree<T, K> {
    public value: T;
    public key: K;
    public children: BaseTree<T, K>[];

    constructor(value: T, key: K) {
        this.value = value;
        this.key = key;
        this.children = [];
    }

    insertNode(value: T, key: K): BaseTree<T, K> {
        const childNode: BaseTree<T, K> = new BaseTree(value, key);
        this.children.push(childNode);
        return childNode;
    }

    /**
     * 트리에 특정 키를 가진 노드가 포함되어 있는지 확인합니다.
     * @param targetKey - 찾으려는 노드의 키
     * @returns 해당 키를 가진 노드가 있으면 true, 없으면 false
     */
    contains(targetKey: K): boolean {
        return this.findNodeByKey(targetKey) !== null;
    }

    /**
     * 특정 키를 가진 노드를 찾아 제거합니다.
     * (주의: 이 메소드는 호출된 노드 자신은 제거하지 못하며, 자식 노드 중에서 찾아서 제거합니다.)
     * @param targetKey - 제거하려는 노드의 키
     * @returns 노드 제거 성공 시 true, 해당 키를 가진 노드를 찾지 못한 경우 false
     */
    removeNodeByKey(targetKey: K): boolean {
        for (let i = 0; i < this.children.length; i++) {
            const childNode: BaseTree<T, K> = this.children[i];
            if (childNode.key === targetKey) {
                this.children.splice(i, 1);
                return true;
            }
        }

        for (const child of this.children) {
            if (child.removeNodeByKey(targetKey)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 트리를 문자열로 표현합니다 (값과 키 포함).
     * @returns 트리 구조를 나타내는 문자열
     */
    toString(): string {
        return this._toStringHelper(this, 0);
    }

    private _toStringHelper(node: BaseTree<T, K>, level: number): string {
        const indent: string = '  '.repeat(level);
        const valueStr = node.value !== null && node.value !== undefined ? node.value.toString() : 'null';
        const keyStr = node.key !== null && node.key !== undefined ? node.key.toString() : 'null';

        let result: string = `${indent}Value: ${valueStr}, Key: ${keyStr}\n`;
        for (const child of node.children) {
            result += this._toStringHelper(child, level + 1);
        }
        return result;
    }


    /**
     * 특정 키를 가진 노드를 찾아 반환합니다.
     * @param targetKey - 찾으려는 노드의 키
     * @returns 해당 키를 가진 노드 또는 null
     */
    findNodeByKey(targetKey: K): BaseTree<T, K> | null {
        if (this.key === targetKey) {
            return this;
        }

        for (const childNode of this.children) {
            const foundNode = childNode.findNodeByKey(targetKey);
            if (foundNode !== null) {
                return foundNode;
            }
        }

        return null;
    }


    /**
     * 특정 키를 가진 노드의 값을 업데이트합니다.
     * @param targetKey - 값을 업데이트하려는 노드의 키
     * @param newValue - 새로 설정할 값
     * @returns 업데이트 성공 시 true, 해당 키를 가진 노드를 찾지 못한 경우 false
     */
    updateValueByKey(targetKey: K, newValue: T): boolean {
        const nodeToUpdate = this.findNodeByKey(targetKey);

        if (nodeToUpdate !== null) {
            nodeToUpdate.value = newValue;
            return true;
        }

        return false;
    }

    /**
     * 특정 키를 가진 노드의 키를 업데이트합니다. (주의: 신중하게 사용)
     * @param targetKey - 키를 업데이트하려는 노드의 현재 키
     * @param newKey - 새로 설정할 키
     * @returns 업데이트 성공 시 true, 해당 키를 가진 노드를 찾지 못한 경우 false
     */
    updateKeyByKey(targetKey: K, newKey: K): boolean {
        const nodeToUpdate = this.findNodeByKey(targetKey);

        if (nodeToUpdate !== null) {
            nodeToUpdate.key = newKey;
            return true;
        }

        return false;
    }
}
