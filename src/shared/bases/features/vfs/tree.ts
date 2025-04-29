class BaseTree<T> {
    public value: T;
    public children: BaseTree<T>[];
    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
    insertNode(value: T): BaseTree<T> {
        const childNode: BaseTree<T> = new BaseTree(value);
        this.children.push(childNode);
        return childNode;
    }
    contains(value: T): boolean {
        if (this.value === value) {
            return true;
        }
        for (const childNode of this.children) {
            if (childNode.contains(value)) {
                return true;
            }
        }
        return false;
    }
    removeNode(value: T): boolean {
        for (let i = 0; i < this.children.length; i++) {
            const childNode: BaseTree<T> = this.children[i];
            if (childNode.value === value) {
                this.children.splice(i, 1);
                return true;
            }
        }
        for (const child of this.children) {
            if (child.removeNode(value)) {
                return true;
            }
        }
        return false;
    }
    toString(): string {
        return this._toStringHelper(this, 0);
    }
    private _toStringHelper(node: BaseTree<T>, level: number): string {
        const indent: string = '  '.repeat(level);
        let result: string = `${indent}${node.value}\n`;
        for (const child of node.children) {
            result += this._toStringHelper(child, level + 1);
        }

        return result;
    }
}

export default BaseTree;