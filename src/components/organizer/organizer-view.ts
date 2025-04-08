import {
	ItemView,
	WorkspaceLeaf,
	DropdownComponent,
	setIcon,
	setTooltip,
	EventRef,
} from "obsidian";
import { t } from "src/i18n";

export const VIEW_TYPE_ORGANIZER = "organizer-view";

export class OrganizerView extends ItemView {
	icon = "sparkles";
	fileSelectDropdown: DropdownComponent | undefined;
	vaultEventRefs: EventRef[] = [];

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_ORGANIZER;
	}

	getDisplayText(): string {
		return "Organizer";
	}

	async onOpen() {
		this.containerEl.children[1].addClass("no-padding");
		const container = this.containerEl.children[1];
		container.empty();

		const navHeader = container.createDiv({
			cls: "nav-header",
		});

		const navButtonsContainer = navHeader.createDiv({
			cls: "nav-buttons-container",
		});

		const locateButton = navButtonsContainer.createDiv({
			cls: "clickable-icon nav-action-button",
		});
		setIcon(locateButton, "locate-fixed");
		setTooltip(locateButton, t("organizer_view.select_current_note"));
		locateButton.addEventListener("click", () => {
			this.selectCurrentNote();
		});

		const playButton = navButtonsContainer.createDiv({
			cls: "clickable-icon nav-action-button",
		});
		setIcon(playButton, "play");
		setTooltip(playButton, t("organizer_view.start_organizing"));

		const inputContainer = navHeader.createDiv({
			cls: "file-selection-container",
		});
		const fileSelectDropdown = new DropdownComponent(inputContainer);
		this.fileSelectDropdown = fileSelectDropdown;
		fileSelectDropdown.selectEl.style.width = "100%";

		this.updateFileList();

		// 볼트 이벤트 등록
		this.vaultEventRefs.push(
			this.app.vault.on("create", () => this.updateFileList()),
			this.app.vault.on("delete", () => this.updateFileList()),
			this.app.vault.on("rename", () => this.updateFileList())
		);
	}

	async onClose() {
		// 이벤트 정리
		this.vaultEventRefs.forEach((ref) => this.app.vault.offref(ref));
		this.vaultEventRefs = [];
	}

	updateFileList() {
		if (!this.fileSelectDropdown) return;

		// 현재 선택된 파일 경로 저장
		const currentValue = this.fileSelectDropdown.getValue();

		// 드롭다운 초기화
		this.fileSelectDropdown.selectEl.empty();

		// placeholder 추가
		this.fileSelectDropdown.addOption(
			"",
			t("organizer_view.file_selector.placeholder")
		);

		// 파일 목록 추가
		const markdownFiles = this.app.vault.getMarkdownFiles();
		markdownFiles.forEach((file) => {
			this.fileSelectDropdown?.addOption(file.path, file.basename);
		});

		// 이전에 선택된 파일이 여전히 존재하는지 확인
		const fileExists = markdownFiles.some(
			(file) => file.path === currentValue
		);

		// 파일이 존재하면 이전 선택 유지, 아니면 placeholder 선택
		this.fileSelectDropdown.setValue(fileExists ? currentValue : "");
	}

	selectCurrentNote() {
		const activeFile = this.app.workspace.getActiveFile();
		if (activeFile) {
			this.fileSelectDropdown?.setValue(activeFile.path);
		}
	}
}
