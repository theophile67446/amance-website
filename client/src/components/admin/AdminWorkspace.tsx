import { ReactNode } from "react";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminWorkspaceProps {
  mode: "browse" | "create" | "edit" | "view";
  title: string;
  collectionLabel: string;
  description?: string;
  count?: number;
  createLabel?: string;
  createDisabled?: boolean;
  onCreate?: () => void;
  backLabel: string;
  onBack: () => void;
  editorTitle: string;
  editorDescription?: string;
  editorBadge: string;
  accentClassName?: string;
  collectionContent: ReactNode;
  editorContent: ReactNode;
}

export default function AdminWorkspace({
  mode,
  title,
  collectionLabel,
  description,
  count,
  createLabel,
  createDisabled,
  onCreate,
  backLabel,
  onBack,
  editorTitle,
  editorDescription,
  editorBadge,
  accentClassName,
  collectionContent,
  editorContent,
}: AdminWorkspaceProps) {
  if (mode === "browse") {
    return (
      <div className="space-y-6">
        <section
          className={cn(
            "overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm",
            accentClassName,
          )}
        >
          <div className="flex flex-col gap-6 px-6 py-6 md:px-8 md:py-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#1E5D2A]/70">
                <span>{collectionLabel}</span>
                {typeof count === "number" && (
                  <span className="rounded-full bg-[#1A361D] px-3 py-1 text-[11px] tracking-[0.18em] text-white">
                    {count}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1A361D] md:text-3xl">{title}</h2>
                {description && <p className="mt-2 max-w-3xl text-sm text-gray-600 md:text-base">{description}</p>}
              </div>
            </div>

            {onCreate && createLabel && (
              <Button
                type="button"
                onClick={onCreate}
                disabled={createDisabled}
                className="h-12 rounded-xl bg-[#1A361D] px-5 text-sm font-semibold text-white hover:bg-[#152e18]"
              >
                <Plus className="h-4 w-4" />
                {createLabel}
              </Button>
            )}
          </div>
        </section>

        {collectionContent}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="sticky top-[73px] z-20 overflow-hidden rounded-[24px] border border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-start gap-3 md:items-center">
            <Button type="button" variant="outline" className="h-10 rounded-xl px-4" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Button>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#1A361D] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  {editorBadge}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1E5D2A]/70">{title}</span>
              </div>
              <h2 className="mt-2 truncate text-xl font-bold text-[#1A361D] md:text-2xl">{editorTitle}</h2>
              {editorDescription && <p className="mt-1 text-sm text-gray-600">{editorDescription}</p>}
            </div>
          </div>
        </div>
      </section>

      {editorContent}
    </div>
  );
}