export const OUTPUT_LANGUAGE_STORAGE_KEY = 'gnpl.outputLanguage';

const SUPPORTED_OUTPUT_LANGUAGES = new Set(['notebook', 'zh-TW', 'en']);
const GENERATED_PROMPT_MARKER = 'PROMPT INSTRUCTIONS:';
const GENERATED_PREFIX_PATTERN = /^OUTPUT LANGUAGE — HIGHEST PRIORITY:\r?\n[\s\S]*?\r?\n\r?\nPROMPT INSTRUCTIONS:\r?\n/;

export function normalizeOutputLanguage(value) {
  return SUPPORTED_OUTPUT_LANGUAGES.has(value) ? value : 'notebook';
}

export function outputLanguageInstruction(value) {
  const language = normalizeOutputLanguage(value);
  if (language === 'zh-TW') {
    return 'Generate the entire output in Traditional Chinese (zh-TW). Translate the source material faithfully when necessary. Every title, heading, paragraph, caption, label, callout, dialogue, and all text embedded in images must use Traditional Chinese. Do not switch to English because the source material or these instructions are in English.';
  }
  if (language === 'en') {
    return 'Generate the entire output in English. Translate the source material faithfully when necessary. Every title, heading, paragraph, caption, label, callout, dialogue, and all text embedded in images must use English. Do not switch to Chinese because the source material contains Chinese.';
  }
  return 'Follow the output language selected in Gemini Notebook. Ignore the source language and the language of these instructions when deciding the output language. Translate the source material faithfully when necessary, and use the selected language for every title, paragraph, caption, label, dialogue, and all text embedded in images.';
}

export function stripGeneratedOutputLanguage(prompt) {
  return String(prompt || '').replace(GENERATED_PREFIX_PATTERN, '').trim();
}

export function applyOutputLanguage(prompt, value) {
  const body = stripGeneratedOutputLanguage(prompt);
  if (!body) return '';
  return `OUTPUT LANGUAGE — HIGHEST PRIORITY:\n${outputLanguageInstruction(value)}\n\n${GENERATED_PROMPT_MARKER}\n${body}`;
}
