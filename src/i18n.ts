import { moment } from "obsidian";

import en from "src/languages/en.json";
import ko from "src/languages/ko.json";
import ja from "src/languages/ja.json";

const translations: Record<string, Record<string, string>> = {
	en: en,
	ko: ko,
	ja: ja,
};

export function t(key: string): string {
	const lang = moment.locale();
	const translation =
		translations[lang]?.[key as keyof typeof en] ||
		en[key as keyof typeof en] ||
		key;
	return translation;
}
