import React from 'react';
import { CATEGORIES, CategoryId } from '../data/sections';
import { NavLink } from 'react-router-dom';

interface PageHeaderProps {
  categoryId?: CategoryId;
  title: string;
  description: string;
}

export default function PageHeader({ categoryId, title, description }: PageHeaderProps) {
  const categoryName = categoryId ? CATEGORIES[categoryId].title : 'Category';

  return (
    <header className="mb-12">
      <nav className="flex items-center gap-2 text-xs font-medium mb-6 uppercase tracking-wider opacity-60">
        <NavLink to="/" className="hover:text-primary transition-colors text-on-surface-variant">Home</NavLink>
        <span className="text-on-surface-variant">/</span>
        <span className="text-on-surface-variant">{categoryName}</span>
        <span className="text-on-surface-variant">/</span>
        <span className="text-primary">{title}</span>
      </nav>
      <h1 className="text-4xl font-extrabold text-on-background mb-4 tracking-tight">{title}</h1>
      <p className="text-lg leading-relaxed max-w-3xl text-on-surface-variant">
        {description}
      </p>
    </header>
  );
}
