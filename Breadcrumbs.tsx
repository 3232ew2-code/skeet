import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-4 px-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          )}
          <span
            className={`${
              item.active
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground cursor-pointer'
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
}
