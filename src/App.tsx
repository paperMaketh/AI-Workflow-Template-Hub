/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuickStart from './pages/QuickStart';
import TaskTriage from './pages/TaskTriage';
import BrainDump from './pages/BrainDump';
import SpecFirst from './pages/SpecFirst';
import ImplementationTemplates from './pages/ImplementationTemplates';
import ReviewTemplates from './pages/ReviewTemplates';
import DesignSkills from './pages/DesignSkills';
import AgentsSetup from './pages/AgentsSetup';
import AgentRoles from './pages/AgentRoles';
import CommonMistakes from './pages/CommonMistakes';
import TemplateLibrary from './pages/TemplateLibrary';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quick-start" element={<QuickStart />} />
          <Route path="task-triage" element={<TaskTriage />} />
          <Route path="brain-dump" element={<BrainDump />} />
          <Route path="spec-first" element={<SpecFirst />} />
          <Route path="implementation" element={<ImplementationTemplates />} />
          <Route path="review" element={<ReviewTemplates />} />
          <Route path="design" element={<DesignSkills />} />
          <Route path="agents-setup" element={<AgentsSetup />} />
          <Route path="agent-roles" element={<AgentRoles />} />
          <Route path="mistakes" element={<CommonMistakes />} />
          <Route path="templates" element={<TemplateLibrary />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
