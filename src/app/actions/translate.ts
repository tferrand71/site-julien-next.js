'use server';

import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const TranslateInputSchema = z.object({
  text: z.string().min(1).max(10000),
  targetLang: z.enum(['fr', 'en', 'de', 'es', 'FR', 'EN', 'DE', 'ES']),
});

export async function translateText(text: string, targetLang: string) {
  await requireAdmin();

  const validated = TranslateInputSchema.parse({ text, targetLang });

  if (!validated.text) return '';
  
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY is not configured');
  }

  // Map targetLang to DeepL supported codes
  let deeplTargetLang = validated.targetLang.toUpperCase();
  if (deeplTargetLang === 'EN') deeplTargetLang = 'EN-US';

  const isFreeAPI = apiKey.endsWith(':fx');
  const apiUrl = isFreeAPI 
    ? 'https://api-free.deepl.com/v2/translate' 
    : 'https://api.deepl.com/v2/translate';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [validated.text],
        target_lang: deeplTargetLang,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepL API Error:', errorText);
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}
