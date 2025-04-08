import { Notice, Plugin, WorkspaceLeaf } from "obsidian";
import {
	OrganizerPluginSettingTab,
	OrganizerSettings,
	DEFAULT_SETTINGS,
} from "src/components/setting-tab";
import {
	OrganizerView,
	VIEW_TYPE_ORGANIZER,
} from "src/components/organizer/organizer-view";
import { t } from "src/i18n";

export default class OrganizerPlugin extends Plugin {
	settings: OrganizerSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_ORGANIZER,
			(leaf) => new OrganizerView(leaf)
		);

		this.addRibbonIcon("layout-list", t("organizer_plugin.ribbon_icon.title"), () => {
			this.activateView();
		});

		this.addSettingTab(new OrganizerPluginSettingTab(this.app, this));
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_ORGANIZER);
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_ORGANIZER);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			if (!leaf) {
				new Notice(t("organizer_plugin.leaf_is_null"));
				return;
			}
			await leaf.setViewState({ type: VIEW_TYPE_ORGANIZER, active: true });
		}

		workspace.revealLeaf(leaf);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
