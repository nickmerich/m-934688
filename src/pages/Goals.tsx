
import React, { useState } from 'react';
import { Target, Filter } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AddGoalModal } from '@/components/goals/AddGoalModal';
import { GoalCard } from '@/components/goals/GoalCard';
import { GoalCategories } from '@/components/goals/GoalCategories';
import { useToast } from '@/hooks/use-toast';

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [goals, setGoals] = useState(mockGoals);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const addNewGoal = (newGoalData: {
    title: string;
    description: string;
    target: number;
    deadline: string;
    category: string;
    priority: 'Low' | 'Medium' | 'High';
    unit: string;
  }) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...newGoalData,
      progress: 0
    };

    setGoals([...goals, newGoal]);
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.max(0, Math.min(newProgress, goal.target)) }
        : goal
    ));

    const goal = goals.find(g => g.id === goalId);
    if (goal && newProgress >= goal.target) {
      toast({
        title: "Goal Completed! 🎉",
        description: `Congratulations! You've achieved "${goal.title}".`,
      });
    }
  };

  const deleteGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    setGoals(goals.filter(g => g.id !== goalId));
    
    if (goal) {
      toast({
        title: "Goal deleted",
        description: `"${goal.title}" has been removed from your goals.`,
      });
    }
  };

  const editGoal = (goal: Goal) => {
    // For now, just show a toast. In a real app, this would open an edit modal
    toast({
      title: "Edit Goal",
      description: "Goal editing functionality coming soon!",
    });
  };

  // Filter goals by category
  const filteredGoals = selectedCategory 
    ? goals.filter(goal => goal.category === selectedCategory)
    : goals;

  // Get unique categories and their counts
  const categories = [...new Set(goals.map(goal => goal.category))];
  const goalCounts = categories.reduce((acc, category) => {
    acc[category] = goals.filter(goal => goal.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  // Calculate stats
  const completedGoals = goals.filter(goal => goal.progress >= goal.target).length;
  const totalGoals = goals.length;
  const averageProgress = totalGoals > 0 
    ? goals.reduce((sum, goal) => sum + (goal.progress / goal.target), 0) / totalGoals * 100
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <Target className="h-8 w-8 mr-3 text-green-500" />
                  Goals Tracking
                </h1>
                <p className="text-gray-400 mt-2">Set and achieve your meaningful goals</p>
              </div>
              <AddGoalModal onAddGoal={addNewGoal} />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Goals</p>
                    <p className="text-2xl font-bold text-white">{totalGoals}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-white">{completedGoals}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Average Progress</p>
                    <p className="text-2xl font-bold text-white">{Math.round(averageProgress)}%</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <GoalCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                goalCounts={goalCounts}
              />
            </div>

            {/* Goals Grid */}
            {filteredGoals.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
                <Target className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  {selectedCategory ? `No goals in ${selectedCategory}` : 'No goals yet'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {selectedCategory 
                    ? `You haven't set any goals in the ${selectedCategory} category yet.`
                    : 'Start by creating your first goal to track your progress.'
                  }
                </p>
                <AddGoalModal onAddGoal={addNewGoal} />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={editGoal}
                    onDelete={deleteGoal}
                    onUpdateProgress={updateGoalProgress}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Goals;
