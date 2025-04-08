import { Plugin } from "obsidian";
import {
	OrganizerPluginSettingTab,
	OrganizerSettings,
	DEFAULT_SETTINGS,
} from "src/components/setting-tab";

export default class OrganizerPlugin extends Plugin {
	settings: OrganizerSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new OrganizerPluginSettingTab(this.app, this));
	}

	async onunload() {
		console.log("unloading plugin");
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
