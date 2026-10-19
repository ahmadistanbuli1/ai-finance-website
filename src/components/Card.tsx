import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export default function Card({ title, description, Icon }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-950/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-6 rounded-xl flex flex-col items-start gap-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 p-3 rounded-lg border border-sky-100 dark:border-sky-900/50">
        <Icon size={28} className="text-sky-600 dark:text-sky-400" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
