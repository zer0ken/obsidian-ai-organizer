# Obsidian 샘플 플러그인

이 프로젝트는 Obsidian(https://obsidian.md)을 위한 샘플 플러그인입니다.

이 프로젝트는 TypeScript를 사용하여 타입 검사와 문서를 제공합니다.  
이 저장소는 최신 플러그인 API(obsidian.d.ts)에 의존하며, 이는 TSDoc 주석을 포함하여 API의 기능을 설명합니다.

이 샘플 플러그인은 플러그인 API가 수행할 수 있는 기본 기능 몇 가지를 보여줍니다.
- 리본 아이콘을 추가하며, 클릭 시 알림(Notice)을 표시합니다.
- "샘플 모달 열기"라는 명령을 추가하며, 이를 통해 모달을 엽니다.
- 설정 페이지에 플러그인 설정 탭을 추가합니다.
- 전역 클릭 이벤트를 등록하고, 클릭 시 콘솔에 'click'을 출력합니다.
- 전역 간격(interval)을 등록하고, 콘솔에 'setInterval'을 주기적으로 출력합니다.

## 플러그인 개발이 처음이신가요?

새로운 플러그인 개발자를 위한 빠른 시작 가이드:

- [원하는 기능의 플러그인이 이미 개발되었는지 확인하세요](https://obsidian.md/plugins)! 비슷한 플러그인이 있다면 협업할 수도 있습니다.
- 이 저장소를 템플릿으로 복사하세요. GitHub에 로그인한 경우 "Use this template" 버튼을 사용할 수 있습니다.
- 저장소를 로컬 개발 폴더로 복제하세요. 편의를 위해 이 폴더를 `.obsidian/plugins/your-plugin-name` 폴더에 배치할 수 있습니다.
- NodeJS를 설치한 후, 저장소 폴더에서 명령줄에 `npm i`를 실행하세요.
- `npm run dev`를 실행하여 `main.ts`를 `main.js`로 컴파일하세요.
- `main.ts`를 수정하거나 새로운 `.ts` 파일을 생성하세요. 이러한 변경 사항은 자동으로 `main.js`로 컴파일됩니다.
- Obsidian을 다시 로드하여 플러그인의 새 버전을 로드하세요.
- 설정 창에서 플러그인을 활성화하세요.
- Obsidian API를 업데이트하려면 저장소 폴더에서 명령줄에 `npm update`를 실행하세요.

## 새 릴리스 배포하기

- `manifest.json` 파일에서 새 버전 번호(예: `1.0.1`)와 최신 릴리스에 필요한 최소 Obsidian 버전을 업데이트하세요.
- `versions.json` 파일에 `"새 플러그인 버전": "최소 Obsidian 버전"` 형식으로 추가하여, 이전 Obsidian 버전에서도 호환 가능한 플러그인을 다운로드할 수 있도록 하세요.
- 새 버전 번호를 "태그 버전"으로 사용하여 GitHub 릴리스를 생성하세요. 정확한 버전 번호를 사용하고, 접두사 `v`는 포함하지 마세요. 예시는 다음 링크를 참고하세요: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- `manifest.json`, `main.js`, `styles.css` 파일을 바이너리 첨부 파일로 업로드하세요. 참고: `manifest.json` 파일은 저장소의 루트 경로와 릴리스에 모두 있어야 합니다.
- 릴리스를 게시하세요.

> `manifest.json`에서 `minAppVersion`을 수동으로 업데이트한 후, `npm version patch`, `npm version minor`, 또는 `npm version major` 명령어를 실행하여 버전 증가 프로세스를 간소화할 수 있습니다.  
> 이 명령어는 `manifest.json`과 `package.json`의 버전을 증가시키고, `versions.json`에 새 버전에 대한 항목을 추가합니다.

## 커뮤니티 플러그인 목록에 플러그인 추가하기

- [플러그인 가이드라인](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)을 확인하세요.
- 초기 버전을 게시하세요.
- 저장소 루트에 `README.md` 파일이 있는지 확인하세요.
- https://github.com/obsidianmd/obsidian-releases 에 Pull Request를 생성하여 플러그인을 추가하세요.

## 사용 방법

- 이 저장소를 복제하세요.
- NodeJS 버전이 최소 v16인지 확인하세요(`node --version`).
- `npm i` 또는 `yarn`을 실행하여 의존성을 설치하세요.
- `npm run dev`를 실행하여 감시 모드에서 컴파일을 시작하세요.

## 플러그인 수동 설치

- `main.js`, `styles.css`, `manifest.json` 파일을 `VaultFolder/.obsidian/plugins/your-plugin-id/` 경로로 복사하세요.

## eslint로 코드 품질 개선하기 (선택 사항)

- [ESLint](https://eslint.org/)는 코드를 분석하여 문제를 빠르게 찾는 도구입니다. ESLint를 사용하여 플러그인을 분석하고 일반적인 버그와 개선 방법을 찾을 수 있습니다.
- 이 프로젝트에서 eslint를 사용하려면 터미널에서 eslint를 설치하세요:
  - `npm install -g eslint`
- 이 프로젝트를 분석하려면 다음 명령어를 사용하세요:
  - `eslint main.ts`
  - eslint는 파일과 줄 번호별로 코드 개선 제안을 포함한 보고서를 생성합니다.
- 소스 코드가 `src`와 같은 폴더에 있는 경우, 해당 폴더의 모든 파일을 분석하려면 다음 명령어를 사용하세요:
  - `eslint .\src\`

## 후원 URL

플러그인을 사용하는 사람들이 재정적으로 지원할 수 있는 후원 URL을 포함할 수 있습니다.

간단한 방법은 `manifest.json` 파일의 `fundingUrl` 필드에 링크를 설정하는 것입니다:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

만약 여러 개의 URL이 있는 경우, 다음과 같이 설정할 수도 있습니다:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api
