
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Trophy, Calendar, Flag } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  unit: string;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Lose 10 pounds',
    description: 'Achieve target weight through consistent exercise and nutrition',
    progress: 6,
    target: 10,
    deadline: '2024-03-15',
    category: 'Health',
    priority: 'High',
    unit: 'pounds'
  },
  {
    id: '2',
    title: 'Read 12 books',
    description: 'Expand knowledge through consistent reading habit',
    progress: 4,
    target: 12,
    deadline: '2024-06-30',
    category: 'Learning',
    priority: 'Medium',
    unit: 'books'
  },
  {
    id: '3',
    title: 'Save $5,000',
    description: 'Build emergency fund for financial security',
    progress: 2800,
    target: 5000,
    deadline: '2024-12-31',
    category: 'Finance',
    priority: 'High',
    unit: 'dollars'
  },
  {
    id: '4',
    title: 'Exercise 100 hours',
    description: 'Maintain consistent fitness routine throughout the year',
    progress: 45,
    target: 100,
    deadline: '2024-12-31',
    category: 'Fitness',
    priority: 'Medium',
    unit: 'hours'
  }
];

const Goals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(mockGoals);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter goals by category
  const filteredGoals = selectedCategory 
    ? goals.filter(goal => goal.category === selectedCategory)
    : goals;

  // Get unique categories
  const categories = [...new Set(goals.map(goal => goal.category))];

  // Calculate stats
  const completedGoals = goals.filter(goal => goal.progress >= goal.target).length;
  const totalGoals = goals.length;
  const averageProgress = totalGoals > 0 
    ? goals.reduce((sum, goal) => sum + (goal.progress / goal.target), 0) / totalGoals * 100
    : 0;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

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

            {/* Logo */}
            <div className="flex items-center">
              <img 
                alt="The Gryt" 
                src="/lovable-uploads/c3193544-bf00-4f06-a79a-b09dee14a047.png" 
                className="h-12 w-auto object-cover" 
              />
            </div>

            {/* Add Goal Button */}
            <Button className="neo-button-primary">
              + ADD GOAL
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-16">
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">🎯 ACHIEVE YOUR DREAMS</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              GOALS
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                TRACKING
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed">
                SET AND ACHIEVE YOUR MEANINGFUL GOALS WITH POWERFUL TRACKING AND INSIGHTS
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="neo-grid mb-16">
            <div className="neo-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Target className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">TOTAL GOALS</h3>
                <p className="neo-text-huge text-black">{totalGoals}</p>
              </div>
            </div>

            <div className="neo-card-green">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Trophy className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">COMPLETED</h3>
                <p className="neo-text-huge text-black">{completedGoals}</p>
              </div>
            </div>

            <div className="neo-card-pink">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Calendar className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">AVG PROGRESS</h3>
                <p className="neo-text-huge text-black">{Math.round(averageProgress)}%</p>
              </div>
            </div>

            <div className="neo-card-charcoal">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Flag className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">CATEGORIES</h3>
                <p className="neo-text-huge text-white">{categories.length}</p>
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="neo-card mb-12 p-8">
            <h2 className="neo-text-big text-black mb-6 text-center">FILTER BY CATEGORY</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? 'neo-button-primary' : 'neo-button'}
              >
                ALL GOALS
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'neo-button-primary' : 'neo-button'}
                >
                  {category.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Goals Grid */}
          {filteredGoals.length === 0 ? (
            <div className="neo-card p-12 text-center">
              <Target className="h-16 w-16 text-black mx-auto mb-4" strokeWidth={3} />
              <h3 className="neo-text-big text-black mb-2">
                {selectedCategory ? `NO GOALS IN ${selectedCategory.toUpperCase()}` : 'NO GOALS YET'}
              </h3>
              <p className="neo-text-medium text-black mb-6">
                {selectedCategory 
                  ? `YOU HAVEN'T SET ANY GOALS IN THE ${selectedCategory.toUpperCase()} CATEGORY YET.`
                  : 'START BY CREATING YOUR FIRST GOAL TO TRACK YOUR PROGRESS.'
                }
              </p>
              <Button className="neo-button-primary">
                + ADD YOUR FIRST GOAL
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredGoals.map((goal) => {
                const progressPercentage = (goal.progress / goal.target) * 100;
                const isCompleted = goal.progress >= goal.target;
                
                return (
                  <div key={goal.id} className={isCompleted ? 'neo-card-green' : 'neo-card'}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="neo-text-big text-black">{goal.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}></span>
                          <span className="neo-text-medium text-black text-sm">{goal.priority.toUpperCase()}</span>
                        </div>
                      </div>
                      
                      <p className="neo-text-medium text-black opacity-70 mb-6">{goal.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="neo-text-medium text-black">PROGRESS</span>
                          <span className="neo-text-medium text-black">
                            {goal.progress} / {goal.target} {goal.unit}
                          </span>
                        </div>
                        
                        <div className="w-full bg-black h-4 border-2 border-black">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="neo-text-medium text-black">DEADLINE: {goal.deadline}</span>
                          <span className="neo-text-medium text-black">{Math.round(progressPercentage)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4 mt-6">
                        <Button className="neo-button flex-1">
                          UPDATE PROGRESS
                        </Button>
                        <Button className="neo-button-accent">
                          EDIT
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Button */}
          <div className="text-center mt-16">
            <Button onClick={() => navigate('/habits')} className="neo-button-primary text-xl px-12 py-6">
              VIEW YOUR HABITS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Goals;
