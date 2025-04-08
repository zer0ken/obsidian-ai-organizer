import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_ORGANIZER = "organizer-view";

export class OrganizerView extends ItemView {
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
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", { text: "AI Organizer" });
	}

	async onClose() {
		// Nothing to clean up
	}
}
