import { ItemView, TFile, WorkspaceLeaf, DropdownComponent, setIcon } from "obsidian";
import { t } from "src/i18n";

export const VIEW_TYPE_ORGANIZER = "organizer-view";

export class OrganizerView extends ItemView {
    icon = 'sparkles';
    
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
		this.containerEl.children[1].addClass('no-padding')
		const container = this.containerEl.children[1];
		container.empty();
		
        const navHeader = container.createDiv({
            cls: "nav-header"
        })

        const navButtonsContainer = navHeader.createDiv({
            cls: "nav-buttons-container"
        });
		const locateButton = navButtonsContainer.createDiv({
			cls: "clickable-icon nav-action-button",
		});
		setIcon(locateButton, "locate-fixed");
		const playButton = navButtonsContainer.createDiv({
			cls: "clickable-icon nav-action-button",
		});
		setIcon(playButton, "play");
		
        const inputContainer = navHeader.createDiv({
            cls: "file-selection-container"
        })
        const fileSelectDropdown = new DropdownComponent(inputContainer);
		fileSelectDropdown.selectEl.style.width = "100%";
		const markdownFiles = this.app.vault.getMarkdownFiles();
		fileSelectDropdown.addOption("", t("organizer_view.file_selector.placeholder"));
		markdownFiles.forEach(file => {
			fileSelectDropdown.addOption(file.path, file.basename);
		});
		fileSelectDropdown.onChange(async (value) => {
			if (value) {
				const file = this.app.vault.getAbstractFileByPath(value);
				if (file instanceof TFile) {
					console.log(`Selected file: ${file.name}`);
				}
			}
		});
	}

	async onClose() {
		// Nothing to clean up
	}
}
