import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateCard from '../components/TemplateCard';
import Callout from '../components/Callout';
import { DESIGN_MD_EXTRACTION_TEMPLATE, AI_SKILL_CREATION_TEMPLATE } from '../data/templates';

export default function DesignSkills() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      <PageHeader
        categoryId="design"
        title="DESIGN.md + Skills"
        description="Explain how DESIGN.md and AI skills prevent visual drift and make outputs consistent across different agents and media."
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">DESIGN.md is the Design Source of Truth</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          It captures typography, colors, spacing, radius, shadows, layout rhythm, motion rules, component style, brand feeling, and what to avoid.
        </p>

        <div className="bg-surface border border-[#334155] rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-primary">The Mental Model</h3>
          <ul className="space-y-2 text-on-surface-variant">
            <li><strong className="text-on-background">HTML / React UI</strong> = finished dish</li>
            <li><strong className="text-on-background">DESIGN.md</strong> = recipe</li>
            <li><strong className="text-on-background">AI skills</strong> = ingredients and cooking methods</li>
            <li><strong className="text-on-background">AI agent</strong> = chef</li>
            <li><strong className="text-on-background">User</strong> = creative director</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">The Problem It Solves</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          The common AI-build problem: Screen 1 looks amazing. Screen 2 looks generic. Screen 3 uses different spacing. Screen 4 invents new colors. Screen 5 feels like another product.
        </p>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          <strong>DESIGN.md prevents this by giving every agent the same visual DNA.</strong>
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">Do Not Start From Nothing</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Do not create a design system from a blank page. Study good references first.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-low border border-[#334155] p-5 rounded-lg">
            <h3 className="font-medium mb-3">Examples to Study:</h3>
            <ul className="list-disc pl-5 space-y-1 text-on-surface-variant text-sm">
              <li>Linear, Stripe, Vercel</li>
              <li>Arc, Raycast, Notion</li>
              <li>Apple, Framer</li>
              <li>Branch Furniture, Herman Miller, Steelcase</li>
            </ul>
          </div>
          <div className="bg-surface-low border border-[#334155] p-5 rounded-lg">
            <h3 className="font-medium mb-3">What to Observe:</h3>
            <ul className="list-disc pl-5 space-y-1 text-on-surface-variant text-sm">
              <li>Colors, Typography, Spacing</li>
              <li>Buttons, Cards, Forms</li>
              <li>Motion, Empty Space, Layout Rhythm</li>
              <li>What makes it feel premium</li>
            </ul>
          </div>
        </div>

        <Callout type="warning">
          <strong>Important:</strong> Do not copy the brand. Extract the principles. Create your own system.
        </Callout>

        <TemplateCard 
          title="DESIGN.md Extraction Template"
          description="Use this to extract design rules from existing references."
          content={DESIGN_MD_EXTRACTION_TEMPLATE}
          tags={['DESIGN.md', 'Setup']}
          context="ChatGPT / Claude (with vision)"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">Skills Built on DESIGN.md</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Skills are reusable instruction files for specific output types (e.g. Landing Page Skill, Product Page Skill, Mobile App Skill, Dashboard Skill, Motion Design Skill, Slide Deck Skill, Blog Layout Skill, Email Template Skill, Ad Creative Skill).
        </p>
        
        <Callout type="info">
          Every skill should say: <em>"Always follow DESIGN.md. Do not invent new visual rules. Use the same brand DNA across all outputs."</em>
        </Callout>

        <TemplateCard 
          title="AI Skill Creation Template"
          description="Use this to create specialized skills anchored to your DESIGN.md."
          content={AI_SKILL_CREATION_TEMPLATE}
          tags={['Skills', 'Setup']}
          context="ChatGPT / Claude"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">Design Second Brain</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Build a design inspiration library. Capture landing pages, buttons, cards, animations, navbars, product pages, pricing pages, quiz flows, dashboards, email designs, slide decks, mobile layouts, and copywriting patterns.
        </p>
        <p className="text-lg text-on-surface-variant leading-relaxed text-primary italic font-medium">
          Taste is developed, not downloaded.
        </p>
      </section>

    </div>
  );
}
