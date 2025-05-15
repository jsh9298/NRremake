// pcCommons.ts (또는 types/pcCommons.ts)

/**
 * PC 공통 기본 설정을 나타내는 타입 (pc_commons.yaml 구조)
 */
export interface PcCommonsConfig {
  base_filesystem_template: DirectoryEntry; // 파일 시스템 루트는 디렉토리입니다.
  common_network_settings: CommonNetworkSettings;
  // ... 기타 공통 설정 섹션 (예: default_users, default_groups) 추가 가능
  // default_users?: DefaultUserTemplate[];
  // default_groups?: DefaultGroupTemplate[];
}

/**
 * 모든 파일 시스템 항목이 공통적으로 가지는 기본 속성
 */
interface BaseFilesystemEntry {
  name: string; // 파일 또는 디렉토리 이름
  permissions?: string; // 권한 문자열 (예: "drwxr-xr-x")
  owner?: string; // 소유자 사용자 이름
  group?: string; // 소유 그룹 이름
  // 기타 공통 속성 (예: created_at, modified_at - 필요하다면)
}

/**
 * 파일 시스템 항목의 가능한 타입들을 나타내는 리터럴 유니언
 */
export type FilesystemEntryType =
  | "directory"
  | "file" // 일반 파일 (내용이 중요하지 않거나 다른 방식으로 관리되는 경우)
  | "text" // 텍스트 파일 (content 속성에 내용 포함)
  | "executable" // 실행 파일
  | "config" // 설정 파일 (텍스트 내용 포함 가능)
  | "image" // 이미지 파일 (내용은 보통 별도 관리)
  | "data" // 기타 데이터 파일
  | "device" // 장치 파일 (예: /dev/null)
  | "symlink"; // 심볼릭 링크

/**
 * 파일 시스템 항목의 판별 유니언 (type 속성으로 구분)
 * DirectoryEntry, FileEntry 등 구체적인 타입들의 유니언입니다.
 */
export type FilesystemEntry =
  | DirectoryEntry
  | TextFileEntry
  | ExecutableFileEntry
  | ConfigFileEntry
  | ImageFileEntry
  | DataFileEntry
  | DeviceFileEntry
  | SymlinkEntry;

/**
 * 디렉토리를 나타내는 항목 타입
 */
export interface DirectoryEntry extends BaseFilesystemEntry {
  type: "directory";
  contents: FilesystemEntry[]; // 하위 항목 목록 (재귀적 구조)
}

/**
 * 일반 파일 (내용이 중요하지 않거나 다른 방식으로 관리되는 경우)
 */
export interface FileEntry extends BaseFilesystemEntry {
  type: "file";
  // size?: number; // 파일 크기 (필요하다면 추가)
  // content_ref?: string; // 내용이 별도 리소스 파일에 있는 경우 참조 경로
}

/**
 * 텍스트 파일을 나타내는 항목 타입
 */
export interface TextFileEntry extends BaseFilesystemEntry {
  type: "text";
  content: string; // 텍스트 파일의 실제 내용
}

/**
 * 실행 파일을 나타내는 항목 타입
 */
export interface ExecutableFileEntry extends BaseFilesystemEntry {
  type: "executable";
  // logic_ref?: string; // 이 실행 파일 실행 시 트리거될 게임 로직 참조 ID
}

/**
 * 설정 파일을 나타내는 항목 타입 (텍스트 내용 포함 가능)
 */
export interface ConfigFileEntry extends BaseFilesystemEntry {
  type: "config";
  content?: string; // 설정 파일의 내용 (텍스트 형식인 경우)
}

/**
 * 이미지 파일을 나타내는 항목 타입 (내용은 보통 별도 관리)
 */
export interface ImageFileEntry extends BaseFilesystemEntry {
  type: "image";
  // src?: string; // 게임 리소스 경로 (예: "assets/images/icon.png")
}

/**
 * 기타 데이터 파일을 나타내는 항목 타입
 */
export interface DataFileEntry extends BaseFilesystemEntry {
  type: "data";
  // content_base64?: string; // 바이너리 데이터를 Base64로 인코딩한 문자열 (비효율적)
  // src?: string; // 게임 리소스 경로 또는 별도 데이터 파일 참조
}

/**
 * 장치 파일 (예: /dev/null)을 나타내는 항목 타입
 */
export interface DeviceFileEntry extends BaseFilesystemEntry {
  type: "device";
  // major?: number; // 주 번호 (필요하다면)
  // minor?: number; // 부 번호 (필요하다면)
}

/**
 * 심볼릭 링크를 나타내는 항목 타입
 */
export interface SymlinkEntry extends BaseFilesystemEntry {
  type: "symlink";
  target: string; // 이 링크가 가리키는 대상 파일 또는 디렉토리의 경로
}

/**
 * PC 공통 네트워크 설정을 나타내는 타입
 */
export interface CommonNetworkSettings {
  default_subnet: string;
  default_gateway: string;
  // ... 기타 네트워크 관련 기본 설정 속성 ...
}

// 필요하다면 DefaultUserTemplate, DefaultGroupTemplate 등 다른 공통 설정 관련 타입도 정의
// export interface DefaultUserTemplate { ... }
// export interface DefaultGroupTemplate { ... }
