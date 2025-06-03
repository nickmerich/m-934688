
import React, { useState } from 'react';
import { Plus, Target, Calendar, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AddGoalModalProps {
  onAddGoal: (goal: {
    title: string;
    description: string;
    target: number;
    deadline: string;
    category: string;
    priority: 'Low' | 'Medium' | 'High';
    unit: string;
  }) => void;
}

export function AddGoalModal({ onAddGoal }: AddGoalModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    category: '',
    priority: '' as 'Low' | 'Medium' | 'High' | '',
    unit: ''
  });
  const { toast } = useToast();

  const categories = [
    'Health',
    'Fitness',
    'Learning',
    'Finance',
    'Career',
    'Relationships',
    'Personal',
    'Travel',
    'Hobbies'
  ];

  const units = [
    'pounds',
    'books',
    'dollars',
    'hours',
    'days',
    'items',
    'points',
    'percent'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Goal title required",
        description: "Please enter a title for your goal.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.target || parseFloat(formData.target) <= 0) {
      toast({
        title: "Target value required",
        description: "Please enter a valid target value.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.deadline) {
      toast({
        title: "Deadline required",
        description: "Please select a deadline for your goal.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your goal.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.priority) {
      toast({
        title: "Priority required",
        description: "Please select a priority level.",
        variant: "destructive"
      });
      return;
    }

    onAddGoal({
      title: formData.title.trim(),
      description: formData.description.trim(),
      target: parseFloat(formData.target),
      deadline: formData.deadline,
      category: formData.category,
      priority: formData.priority,
      unit: formData.unit || 'items'
    });

    toast({
      title: "Goal created successfully!",
      description: `"${formData.title}" has been added to your goals.`,
    });

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      target: '',
      deadline: '',
      category: '',
      priority: '',
      unit: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-500" />
            Create New Goal
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goal-title" className="text-gray-300">
              Goal Title *
            </Label>
            <Input
              id="goal-title"
              placeholder="e.g., Lose 10 pounds"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">
                Target Value *
              </Label>
              <Input
                id="target"
                type="number"
                placeholder="10"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit" className="text-gray-300">
                Unit
              </Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit} className="text-white hover:bg-gray-700">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-gray-300">
              Deadline *
            </Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select category" />
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
              <Label htmlFor="priority" className="text-gray-300">
                Priority *
              </Label>
              <Select value={formData.priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setFormData({ ...formData, priority: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Low" className="text-white hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium" className="text-white hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="High" className="text-white hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your goal and what success looks like..."
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
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
