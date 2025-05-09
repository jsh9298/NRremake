export class IndexNum {
    inodes: number[];
    constructor() {
        this.inodes = [];
    }
    getNumber(): number {
        let n: number = 0;
        while (true) {
            n = Math.floor(Math.random() * 99) + 1;
            if (!this.sameNum(n)) {
                this.inodes.push(n);
                return n;
            }
        }

    }
    sameNum(n: number) {
        return this.inodes.find((e) => (e === n));
    }
    deleteNumber(n: number): void {
        const idx: number = this.inodes.findIndex((v) => (v === n));
        if (idx != -1) {
            this.inodes.splice(idx, 1);
        }
    }
}

export class GidNum {

}
