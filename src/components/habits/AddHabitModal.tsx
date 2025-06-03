
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AddHabitModalProps {
  onAddHabit: (habit: {
    name: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description?: string;
  }) => void;
}

export function AddHabitModal({ onAddHabit }: AddHabitModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: '' as 'Easy' | 'Medium' | 'Hard' | '',
    description: ''
  });
  const { toast } = useToast();

  const categories = [
    'Fitness',
    'Mindfulness',
    'Learning',
    'Health',
    'Reflection',
    'Productivity',
    'Social',
    'Creative'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Habit name required",
        description: "Please enter a name for your habit.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your habit.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.difficulty) {
      toast({
        title: "Difficulty required",
        description: "Please select a difficulty level.",
        variant: "destructive"
      });
      return;
    }

    onAddHabit({
      name: formData.name.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      description: formData.description.trim() || undefined
    });

    toast({
      title: "Habit added successfully!",
      description: `"${formData.name}" has been added to your daily habits.`,
    });

    // Reset form and close modal
    setFormData({
      name: '',
      category: '',
      difficulty: '',
      description: ''
    });
    setOpen(false);
  };

  const getDifficultyWins = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 10;
      case 'Medium': return 20;
      case 'Hard': return 30;
      default: return 0;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create New Habit</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-gray-300">
              Habit Name *
            </Label>
            <Input
              id="habit-name"
              placeholder="e.g., Morning Meditation"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-300">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-gray-300">
              Difficulty Level *
            </Label>
            <Select value={formData.difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setFormData({ ...formData, difficulty: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Easy" className="text-white hover:bg-gray-700">
                  <div className="flex items-center justify-between w-full">
                    <span>Easy</span>
                    <span className="text-green-400 ml-2">+10 Wins</span>
                  </div>
                </SelectItem>
                <SelectItem value="Medium" className="text-white hover:bg-gray-700">
                  <div className="flex items-center justify-between w-full">
                    <span>Medium</span>
                    <span className="text-yellow-400 ml-2">+20 Wins</span>
                  </div>
                </SelectItem>
                <SelectItem value="Hard" className="text-white hover:bg-gray-700">
                  <div className="flex items-center justify-between w-full">
                    <span>Hard</span>
                    <span className="text-red-400 ml-2">+30 Wins</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {formData.difficulty && (
              <p className="text-sm text-gray-400">
                You'll earn <span className="text-green-400 font-medium">+{getDifficultyWins(formData.difficulty)} Wins</span> each time you complete this habit.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add any notes or details about this habit..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[80px]"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              Create Habit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
