// Shared helper for mapping a topic/unit id to its palette color, based on
// the topic's position in TOPICS. Previously this exact function was
// duplicated independently in App.tsx, drug-classification.tsx, and
// practical-viva.tsx — consolidated here so the three can't drift out of
// sync (same rationale as TOPIC_PALETTE's consolidation in ./palette.ts).
import { TOPICS } from "@/data/facts";
import { TOPIC_PALETTE, type PaletteColor } from "@/lib/palette";

export function topicColor(topicId: string): PaletteColor {
  const index = TOPICS.findIndex((t) => t.id === topicId);
  return TOPIC_PALETTE[(index < 0 ? 0 : index) % TOPIC_PALETTE.length]!;
}
