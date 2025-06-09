import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Target, Filter, Download } from 'lucide-react';
import { AnalyticsOverview } from '@/components/analytics/AnalyticsOverview';
import { HabitAnalytics } from '@/components/analytics/HabitAnalytics';
import { ProgressTrends } from '@/components/analytics/ProgressTrends';
import { GoalAnalytics } from '@/components/analytics/GoalAnalytics';
import { WeeklyHabitChart } from '@/components/habits/WeeklyHabitChart';
import { HabitHeatmap } from '@/components/analytics/HabitHeatmap';
import { TimeAnalysisChart } from '@/components/analytics/TimeAnalysisChart';
import { StreakVisualization } from '@/components/analytics/StreakVisualization';

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeRanges = [
    { value: '7d', label: '7 DAYS' },
    { value: '30d', label: '30 DAYS' },
    { value: '90d', label: '90 DAYS' },
    { value: '1y', label: '1 YEAR' }
  ];

  const categories = [
    { value: 'all', label: 'ALL' },
    { value: 'health', label: 'HEALTH' },
    { value: 'career', label: 'CAREER' },
    { value: 'education', label: 'EDUCATION' },
    { value: 'personal', label: 'PERSONAL' }
  ];

  return (
    <div className="min-h-screen bg-white no-gradients">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Back Button */}
            <Button
              onClick={() => navigate('/dashboard')}
              className="neo-button flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO DASHBOARD</span>
            </Button>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="neo-border bg-white px-3 py-2 neo-text-medium"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="neo-border bg-white px-3 py-2 neo-text-medium"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <Button className="neo-button flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>EXPORT</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-12 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Header */}
          <div className="text-center space-y-8 mb-12">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">📊 INTERACTIVE ANALYTICS</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              YOUR PROGRESS
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                DASHBOARD
              </span>
            </h1>
          </div>

          {/* Analytics Overview */}
          <div className="mb-12">
            <AnalyticsOverview />
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="neo-card">
              <HabitAnalytics />
            </div>
            <div className="neo-card">
              <ProgressTrends />
            </div>
            <div className="neo-card">
              <GoalAnalytics />
            </div>
            <div className="neo-card">
              <WeeklyHabitChart />
            </div>
          </div>

          {/* Additional Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="neo-card">
              <HabitHeatmap />
            </div>
            <div className="neo-card">
              <TimeAnalysisChart />
            </div>
            <div className="neo-card">
              <StreakVisualization />
            </div>
          </div>

          {/* Insights Section */}
          <div className="neo-card-charcoal mb-12">
            <div className="text-center">
              <h3 className="neo-text-big text-white mb-4">AI INSIGHTS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="neo-card-green">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <div className="neo-text-medium text-black">BEST STREAK: 23 DAYS</div>
                    <div className="text-sm text-black mt-1">Morning meditation</div>
                  </div>
                </div>
                <div className="neo-card-grey">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-white" />
                    <div className="neo-text-medium text-white">OPTIMAL TIME: 7-9 AM</div>
                    <div className="text-sm text-white mt-1">Peak performance window</div>
                  </div>
                </div>
                <div className="neo-card">
                  <div className="text-center">
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <div className="neo-text-medium text-black">NEXT MILESTONE</div>
                    <div className="text-sm text-black mt-1">5 goals to complete level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Button onClick={() => navigate('/habits')} className="neo-button-primary text-xl px-12 py-6">
              OPTIMIZE YOUR HABITS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
