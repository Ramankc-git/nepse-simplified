import type { ContentBlock } from "@/lib/data";
import {
  AlertTriangle,
  BarChart3,
  BookmarkPlus,
  Lightbulb,
  List,
} from "lucide-react";

export function ContentRenderer({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-sm text-slate-700 leading-relaxed"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={index}
                className="text-xl font-bold text-[#0a2141] mt-10 mb-4 first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={index}
                className="text-base font-semibold text-[#0a2141] mt-8 mb-3"
              >
                {block.text}
              </h3>
            );

          case "highlight":
            return (
              <div
                key={index}
                className="bg-green-50/60 border border-green-200/60 rounded-2xl p-5 my-6"
              >
                <div className="flex items-start gap-3">
                  <BookmarkPlus className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-900/80 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </div>
            );

          case "list":
            return (
              <ul key={index} className="space-y-2.5 my-4">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-md bg-[#0a2141]/10 text-[#0a2141] flex items-center justify-center text-[10px] font-bold mt-0.5">
                      <List className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "metric":
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {block.label}
                  </span>
                </div>
                <p className="text-lg font-bold text-[#0a2141]">{block.value}</p>
              </div>
            );

          case "tip":
            return (
              <div
                key={index}
                className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 my-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                    {block.title}
                  </span>
                </div>
                <p className="text-sm text-amber-900/80 leading-relaxed">
                  {block.text}
                </p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
