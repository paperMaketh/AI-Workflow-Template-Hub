import React from 'react';
import { CATEGORIES, CategoryId } from '../data/sections';
import { Link } from 'react-router-dom';
import Badge from './Badge';

interface SectionCardProps {
  title: string;
  description: string;
  path: string;
  categoryId: CategoryId;
}

export default function SectionCard({ title, description, path, categoryId }: SectionCardProps) {
  const category = CATEGORIES[categoryId];

  return (
    <Link 
      to={path}
      className="group block rounded-lg border border-[#334155] bg-surface p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_4px_24px_rgba(56,189,248,0.1)] relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: category.colorVar }}
      />
      <div className="mb-4">
        <Badge categoryId={categoryId}>{category.title}</Badge>
      </div>
      <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-on-surface-variant text-sm">
        {description}
      </p>
    </Link>
  );
}
