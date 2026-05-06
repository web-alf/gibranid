export interface Citation {
  label: string;
  url: string;
  publisher?: string;
}

export function buildCitationNote(citations: Citation[]): string {
  return citations.map((c, i) => `[${i + 1}] ${c.label}`).join(' · ');
}
