import { ChevronRight, Home } from 'lucide-react';
import { navigateTo } from '../utils/router';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0">
      <ol className="flex items-center space-x-2 text-xs text-[#57606A] flex-wrap">
        <li>
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center hover:text-[#24292F] transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#8C959F]" />
              {isLast || !item.path ? (
                <span className="font-semibold text-[#24292F] truncate max-w-[240px] sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.path && navigateTo(item.path)}
                  className="hover:text-[#24292F] transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
