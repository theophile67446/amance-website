import { Search } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AdminShell({
  title,
  subtitle,
  primaryAction,
  children,
}: {
  title: string;
  subtitle: string;
  primaryAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f7f4] pb-10 pl-14 lg:pl-0">
      <div className="sticky top-0 z-30 border-b border-[#dce5dc] bg-white/90 backdrop-blur">
        <div className="px-5 py-5 md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#2f5a35]/60">Administration</p>
              <h1 className="mt-2 text-3xl font-black text-[#18361f]">{title}</h1>
              <p className="mt-2 max-w-3xl text-sm text-[#5f7060] md:text-base">{subtitle}</p>
            </div>
            {primaryAction}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 md:px-8">{children}</div>
    </div>
  );
}

export function ContentGrid({
  sidebar,
  children,
}: {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}) {
  if (!sidebar) return <div>{children}</div>;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0">{children}</div>
      <div className="min-w-0">{sidebar}</div>
    </div>
  );
}

export function FilterInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="h-11 pl-10" />
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="border-dashed border-gray-300 bg-white">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
        <h3 className="text-lg font-bold text-[#18361f]">{title}</h3>
        <p className="max-w-lg text-sm text-gray-500">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}

export function MetaCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#dde6dc] bg-white p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">{label}</p>
      <div className="mt-2 text-sm font-semibold text-gray-700">{value}</div>
    </div>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const classes = {
    neutral: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-700",
    info: "bg-blue-100 text-blue-700",
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${classes[tone]}`}>{children}</span>;
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-sm font-semibold text-gray-700">{children}</label>;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[120px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1E5D2A] focus:ring-2 focus:ring-[#1E5D2A]/15 ${props.className || ""}`}
    />
  );
}

export function SidebarCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-[#dde6dc] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#18361f]">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
