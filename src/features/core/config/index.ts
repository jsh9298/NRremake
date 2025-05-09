
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

type PermissionDigits = [number, number, number, number];

export class Inode {
    public type: InodeType;
    public typeCharacter: string;

    public permissionsOctal: PermissionDigits;
    public permissionsString: string;

    public ownerUid: number;
    public groupId: number;

    public sizeInBytes: number;
    public hardLinkCount: number;
    public blockCount: number;

    public accessTime: Date;
    public modifyTime: Date;
    public changeTime: Date;

    public isSetuid: boolean;
    public isSetgid: boolean;
    public isSticky: boolean;

    /**
     * 새로운 Inode 인스턴스를 생성합니다.
     *
     * @param type - Inode 타입 (InodeType 열거형)
     * @param permissionsOctal - 4자리 8진수 권한 배열 [특수권한, 소유자, 그룹, 기타]
     * @param ownerUid - 소유자 사용자 ID (UID)
     * @param groupId - 소유자 그룹 ID (GID)
     * @param sizeInBytes - 파일 크기 (바이트)
     * @param hardLinkCount - 하드 링크 수
     * @param blockCount - 할당된 블록 수
     * @param accessTime - 마지막 접근 시간 (Date 객체)
     * @param modifyTime - 마지막 수정 시간 (Date 객체)
     * @param changeTime - Inode 상태 변경 시간 (Date 객체)
     * @throws Error - 유효하지 않은 입력 권한 배열 또는 숫자 범위
     */
    constructor(
        type: InodeType,
        permissionsOctal: PermissionDigits,
        ownerUid: number,
        groupId: number,
        sizeInBytes: number,
        hardLinkCount: number,
        blockCount: number,
        accessTime: Date,
        modifyTime: Date,
        changeTime: Date
    ) {
        if (permissionsOctal.length !== 4) {
            throw new Error(`권한 배열은 4개의 숫자를 포함해야 합니다.`);
        }
        if (permissionsOctal.some(digit => digit < 0 || digit > 7)) {
            throw new Error('각 권한 숫자는 0부터 7 사이여야 합니다.');
        }

        this.type = type;
        this.permissionsOctal = permissionsOctal;
        this.ownerUid = ownerUid;
        this.groupId = groupId;
        this.sizeInBytes = sizeInBytes;
        this.hardLinkCount = hardLinkCount;
        this.blockCount = blockCount;
        this.accessTime = accessTime;
        this.modifyTime = modifyTime;
        this.changeTime = changeTime;

        this.typeCharacter = this._getTypeCharacter(type);

        const [specialDigit, ownerDigit, groupDigit, othersDigit] =
            permissionsOctal;

        this.isSetuid = (specialDigit & 4) > 0;
        this.isSetgid = (specialDigit & 2) > 0;
        this.isSticky = (specialDigit & 1) > 0;

        this.permissionsString = this._generatePermissionsString(
            ownerDigit,
            groupDigit,
            othersDigit,
            this.isSetuid,
            this.isSetgid,
            this.isSticky
        );
    }

    private _getTypeCharacter(type: InodeType): string {
        switch (type) {
            case InodeType.File:
                return '-';
            case InodeType.Directory:
                return 'd';
            case InodeType.SymbolicLink:
                return 'l';
            case InodeType.BlockDevice:
                return 'b';
            case InodeType.CharacterDevice:
                return 'c';
            case InodeType.NamedPipe:
                return 'p';
            case InodeType.Socket:
                return 's';
            default:
                return '-';
        }
    }

    /**
     * 3개의 기본 권한 숫자와 특수 권한 플래그로부터
     * 'rwxrwSrwT' 형태의 9자리 권한 문자열을 생성합니다.
     * @param ownerDigit - 소유자 권한 숫자 (0-7)
     * @param groupDigit - 그룹 권한 숫자 (0-7)
     * @param othersDigit - 기타 권한 숫자 (0-7)
     * @param isSetuid - SetUID 비트 설정 여부
     * @param isSetgid - SetGID 비트 설정 여부
     * @param isSticky - Sticky Bit 설정 여부
     * @returns 9자리 권한 문자열
     */
    private _generatePermissionsString(
        ownerDigit: number,
        groupDigit: number,
        othersDigit: number,
        isSetuid: boolean,
        isSetgid: boolean,
        isSticky: boolean
    ): string {
        function mapRwxDigitToSymbols(digit: number): [string, string, string] {
            const r = (digit & 4) > 0 ? 'r' : '-';
            const w = (digit & 2) > 0 ? 'w' : '-';
            const x = (digit & 1) > 0 ? 'x' : '-';
            return [r, w, x];
        }

        const [ownerR, ownerW, ownerX] = mapRwxDigitToSymbols(ownerDigit);
        const [groupR, groupW, groupX] = mapRwxDigitToSymbols(groupDigit);
        const [othersR, othersW, othersX] = mapRwxDigitToSymbols(othersDigit);

        const base9Chars = [
            ownerR,
            ownerW,
            ownerX,
            groupR,
            groupW,
            groupX,
            othersR,
            othersW,
            othersX,
        ];

        if (isSetuid) {
            base9Chars[2] = ownerX === 'x' ? 's' : 'S';
        }
        if (isSetgid) {
            base9Chars[5] = groupX === 'x' ? 's' : 'S';
        }
        if (isSticky) {
            base9Chars[8] = othersX === 'x' ? 't' : 'T';
        }

        return this.typeCharacter + base9Chars.join('');
    }

    toString(): string {
        const formattedSize = this.sizeInBytes.toString();
        const formattedDate = this.modifyTime.toISOString().split('T')[0];

        return `${this.permissionsString} ${this.hardLinkCount} ${this.ownerUid} ${this.groupId} ${formattedSize} ${formattedDate}`;
    }
}