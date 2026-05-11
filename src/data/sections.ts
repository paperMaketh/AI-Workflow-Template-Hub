export type CategoryId = 
  | 'core' 
  | 'triage' 
  | 'intake' 
  | 'spec' 
  | 'impl' 
  | 'review' 
  | 'design' 
  | 'agent' 
  | 'mistake' 
  | 'library';

export interface Section {
  id: string;
  title: string;
  path: string;
  categoryId: CategoryId;
  description?: string;
}

export interface Category {
  id: CategoryId;
  title: string;
  colorVar: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  core: { id: 'core', title: 'Getting Started', colorVar: 'var(--color-cat-core)' },
  triage: { id: 'triage', title: 'Task Triage', colorVar: 'var(--color-cat-triage)' },
  intake: { id: 'intake', title: 'Brain Dump Intake', colorVar: 'var(--color-cat-intake)' },
  spec: { id: 'spec', title: 'Spec-First Planning', colorVar: 'var(--color-cat-spec)' },
  impl: { id: 'impl', title: 'Implementation', colorVar: 'var(--color-cat-impl)' },
  review: { id: 'review', title: 'Review & QA', colorVar: 'var(--color-cat-review)' },
  design: { id: 'design', title: 'Design System', colorVar: 'var(--color-cat-design)' },
  agent: { id: 'agent', title: 'Agent Config', colorVar: 'var(--color-cat-agent)' },
  mistake: { id: 'mistake', title: 'Troubleshooting', colorVar: 'var(--color-cat-mistake)' },
  library: { id: 'library', title: 'Library', colorVar: 'var(--color-cat-core)' },
};

export const SECTIONS: Section[] = [
  { id: 'home', title: 'Home', path: '/', categoryId: 'core', description: 'Main index and dashboard' },
  { id: 'quick-start', title: 'Quick Start', path: '/quick-start', categoryId: 'core', description: 'Get up and running immediately' },
  { id: 'task-triage', title: 'Task Triage', path: '/task-triage', categoryId: 'triage', description: 'Decide if the task is direct, guided, or spec-first.' },
  { id: 'brain-dump', title: 'Brain Dump Intake', path: '/brain-dump', categoryId: 'intake', description: 'Turn messy ideas into structured input.' },
  { id: 'spec-first', title: 'Spec-First Planning', path: '/spec-first', categoryId: 'spec', description: 'Generate proposal.md, design.md, tasks.md, and acceptance criteria.' },
  { id: 'impl-templates', title: 'Implementation', path: '/implementation', categoryId: 'impl', description: 'Give Codex a controlled work order.' },
  { id: 'review-templates', title: 'Review & QA', path: '/review', categoryId: 'review', description: 'Check design, scope, code quality, SEO, accessibility, and performance.' },
  { id: 'design-skills', title: 'Design Control', path: '/design', categoryId: 'design', description: 'Use DESIGN.md and skills to prevent visual drift.' },
  { id: 'agents-setup', title: 'AGENTS.md Setup', path: '/agents-setup', categoryId: 'agent', description: 'Configuring your agent rules' },
  { id: 'agent-roles', title: 'Agent Roles', path: '/agent-roles', categoryId: 'agent', description: 'Personas for different task types' },
  { id: 'mistakes', title: 'Common Mistakes', path: '/mistakes', categoryId: 'mistake', description: 'Anti-patterns and how to avoid them' },
  { id: 'template-library', title: 'Template Library', path: '/templates', categoryId: 'library', description: 'All prompt templates in one place' },
];
