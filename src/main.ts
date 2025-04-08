import { Notice, Plugin, WorkspaceLeaf, setIcon, setTooltip } from "obsidian";
import {
	OrganizerPluginSettingTab,
	OrganizerSettings,
	DEFAULT_SETTINGS,
} from "src/setting-tab";
import {
	OrganizerView,
	VIEW_TYPE_ORGANIZER,
} from "src/organizer-view";
import { t } from "src/i18n";

export default class OrganizerPlugin extends Plugin {
	settings: OrganizerSettings = DEFAULT_SETTINGS;
	statusBarItem: HTMLSpanElement | null = null;

	async onload() {
		await this.loadSettings();

		this.initStatusBar();

		this.registerView(
			VIEW_TYPE_ORGANIZER,
			(leaf) => new OrganizerView(leaf)
		);

		this.addRibbonIcon(
			"sparkles",
			t("organizer_plugin.activate_view"),
			() => {
				this.activateView();
			}
		);

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
			await leaf.setViewState({
				type: VIEW_TYPE_ORGANIZER,
				active: true,
			});
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

	initStatusBar() {
		const statusBar = this.addStatusBarItem();
		statusBar.addClass(
			"organizer-status",
			"status-bar-item",
			"status-bar-item-icon",
			"mod-clickable"
		);
		setIcon(statusBar, "sparkles");
		setTooltip(statusBar, t("organizer_plugin.activate_view"), {
			placement: "top",
		});
		statusBar.addEventListener("click", () => {
			this.activateView();
		});
	}
}
