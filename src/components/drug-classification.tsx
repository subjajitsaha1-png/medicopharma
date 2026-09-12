import { useMemo, useState } from "react";
import { ChevronDown, ListTree, Search } from "lucide-react";
import { TOPICS } from "@/data/facts";
import { DRUG_CLASSIFICATION, type ClassNode, type ClassificationSection } from "@/data/drug-classification";
import { TOPIC_PALETTE, type PaletteColor } from "@/lib/palette";

function topicColor(topicId: string) {
  const index = TOPICS.findIndex((t) => t.id === topicId);
  return TOPIC_PALETTE[(index < 0 ? 0 : index) % TOPIC_PALETTE.length]!;
}

function matches(node: ClassNode, q: string): boolean {
  if (!q) return true;
  const hay = `${node.label} ${node.examples ?? ""}`.toLowerCase();
  if (hay.includes(q)) return true;
  return (node.children ?? []).some((c) => matches(c, q));
}

function NodeRow({ node, depth, query }: { node: ClassNode; depth: number; query: string }) {
  const [open, setOpen] = useState(depth < 1 || query.length > 0);
  const hasChildren = !!node.children && node.children.length > 0;
  if (!matches(node, query)) return null;
  return (
    <div style={{ marginLeft: depth * 16 }} className={depth > 0 ? "mt-1.5 border-l border-border pl-3" : "mt-2 first:mt-0"}>
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={`flex w-full items-start gap-1.5 rounded-md text-left ${hasChildren ? "cursor-pointer" : "cursor-default"}`}
        disabled={!hasChildren}
      >
        {hasChildren ? (
          <ChevronDown size={14} className={`mt-0.5 shrink-0 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`} />
        ) : (
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" style={{ marginLeft: 3, marginRight: 3 }} />
        )}
        <span className="flex-1">
          <span className={`text-sm ${depth === 0 ? "font-bold text-card-foreground" : "font-semibold text-card-foreground"}`}>{node.label}</span>
          {node.examples && <span className="block text-xs leading-relaxed text-muted-foreground">{node.examples}</span>}
        </span>
      </button>
      {hasChildren && open && (
        <div>
          {node.children!.map((c, i) => <NodeRow key={i} node={c} depth={depth + 1} query={query} />)}
        </div>
      )}
    </div>
  );
}

function SectionCard({ section, color, query }: { section: ClassificationSection; color: PaletteColor; query: string }) {
  const visible = section.tree.some((n) => matches(n, query));
  if (!visible) return null;
  return (
    <div style={{ borderTopColor: color.ring }} className="rounded-xl border border-border border-t-4 bg-card p-4 shadow-sm sm:p-5">
      <h3 className="font-display text-lg text-card-foreground">{section.title}</h3>
      <div className="mt-2">
        {section.tree.map((n, i) => <NodeRow key={i} node={n} depth={0} query={query} />)}
      </div>
    </div>
  );
}

export function DrugClassification() {
  const [unitFilter, setUnitFilter] = useState<string | "all">("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () => DRUG_CLASSIFICATION.filter((g) => unitFilter === "all" || g.topicId === unitFilter),
    [unitFilter]
  );
  const totalSections = DRUG_CLASSIFICATION.reduce((s, g) => s + g.sections.length, 0);

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Classification charts</p>
        <h2 className="mt-1 font-display text-3xl text-foreground">Drug Classification</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {totalSections} classification trees across every unit — the same "classify the following drugs" structure every pharmacology chapter opens with, organized by mechanism or site of action.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search aria-hidden="true" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <label className="sr-only" htmlFor="class-search">Search drug classes</label>
          <input
            id="class-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a class or drug, e.g. beta blocker, amlodipine…"
            className="min-h-11 w-full rounded-xl border border-input bg-card pl-9 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="min-h-11 shrink-0 rounded-xl border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All units</option>
          {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="space-y-8">
        {groups.map((g) => {
          const topic = TOPICS.find((t) => t.id === g.topicId);
          if (!topic) return null;
          const color = topicColor(g.topicId);
          const anySectionVisible = g.sections.some((s) => s.tree.some((n) => matches(n, q)));
          if (q && !anySectionVisible) return null;
          return (
            <div key={g.topicId}>
              <div className="mb-3 flex items-center gap-2">
                <ListTree size={16} className="text-muted-foreground" />
                <span style={{ backgroundColor: color.bg, color: color.fg }} className="rounded-full px-2.5 py-1 text-xs font-bold">{topic.name}</span>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {g.sections.map((s) => <SectionCard key={s.id} section={s} color={color} query={q} />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
