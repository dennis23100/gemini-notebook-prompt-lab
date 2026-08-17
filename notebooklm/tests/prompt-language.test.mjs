import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyOutputLanguage,
  normalizeOutputLanguage,
  outputLanguageInstruction,
  stripGeneratedOutputLanguage
} from '../assets/prompt-language.js';

const basePrompt = 'Use only the uploaded source material. Create a clear slide deck.';

test('unknown output language values safely follow Gemini Notebook', () => {
  assert.equal(normalizeOutputLanguage('unknown'), 'notebook');
  assert.match(outputLanguageInstruction('unknown'), /Follow the output language selected in Gemini Notebook/);
});

test('Traditional Chinese and English choices create strict, source-independent rules', () => {
  const chinese = applyOutputLanguage(basePrompt, 'zh-TW');
  const english = applyOutputLanguage(basePrompt, 'en');
  assert.match(chinese, /Traditional Chinese \(zh-TW\)/);
  assert.match(chinese, /Do not switch to English because the source material/);
  assert.match(english, /Generate the entire output in English/);
  assert.match(english, /Do not switch to Chinese because the source material/);
});

test('changing output language replaces the generated directive instead of stacking it', () => {
  const chinese = applyOutputLanguage(basePrompt, 'zh-TW');
  const english = applyOutputLanguage(chinese, 'en');
  assert.equal((english.match(/OUTPUT LANGUAGE — HIGHEST PRIORITY:/g) || []).length, 1);
  assert.equal(stripGeneratedOutputLanguage(english), basePrompt);
  assert.doesNotMatch(english, /Traditional Chinese \(zh-TW\)/);
});
