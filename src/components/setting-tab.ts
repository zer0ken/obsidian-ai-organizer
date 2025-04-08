import { App, PluginSettingTab, Setting } from "obsidian";
import OrganizerPlugin from "src/main";
import { t } from "src/i18n";

export interface OrganizerSettings {
	model: string;
	geminiApiKey: string;
	promptTemplate: string;
}

export const DEFAULT_SETTINGS: OrganizerSettings = {
	model: "gemini-2.0-flash-001",
	geminiApiKey: "",
	promptTemplate: "You are a helpful AI assistant.",
};

export class OrganizerPluginSettingTab extends PluginSettingTab {
	plugin: OrganizerPlugin;

	constructor(app: App, plugin: OrganizerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: t("settings.title") });

		new Setting(containerEl)
			.setName(t("settings.model.name"))
			.setDesc(t("settings.model.desc"))
			.addText((text) =>
				text
					.setPlaceholder(t("settings.model.placeholder"))
					.setValue(this.plugin.settings.model)
					.onChange(async (value: string) => {
						this.plugin.settings.model = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.gemini_api_key.name"))
			.setDesc(t("settings.gemini_api_key.desc"))
			.addText((text) =>
				text
					.setPlaceholder(t("settings.gemini_api_key.placeholder"))
					.setValue(this.plugin.settings.geminiApiKey)
					.onChange(async (value: string) => {
						this.plugin.settings.geminiApiKey = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t("settings.prompt_template.name"))
			.setDesc(t("settings.prompt_template.desc"))
			.addTextArea((text) =>
				text
					.setPlaceholder(t("settings.prompt_template.placeholder"))
					.setValue(this.plugin.settings.promptTemplate)
					.onChange(async (value: string) => {
						this.plugin.settings.promptTemplate = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
