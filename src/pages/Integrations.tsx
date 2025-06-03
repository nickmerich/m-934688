
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { IntegrationCategory } from '@/components/integrations/IntegrationCategory';

const Integrations = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-white">Integrations</h1>
              <p className="text-gray-400 mt-2">Connect your favorite productivity apps for mind, body, and spirit</p>
            </div>

            {/* Integration Categories */}
            <div className="space-y-8">
              <IntegrationCategory 
                title="Mind" 
                description="Apps for mental clarity, focus, and cognitive enhancement"
                category="mind"
              />
              <IntegrationCategory 
                title="Body" 
                description="Fitness, nutrition, and physical wellness applications"
                category="body"
              />
              <IntegrationCategory 
                title="Spirit" 
                description="Meditation, mindfulness, and spiritual growth tools"
                category="spirit"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;
