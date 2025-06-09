
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
        <Button className="neo-button-primary">
          + ADD GOAL
        </Button>
      </DialogTrigger>
      <DialogContent className="neo-card max-w-lg">
        <DialogHeader>
          <DialogTitle className="neo-text-big text-black flex items-center">
            <Target className="h-5 w-5 mr-2" strokeWidth={3} />
            CREATE NEW GOAL
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goal-title" className="neo-text-medium text-black">
              GOAL TITLE *
            </Label>
            <Input
              id="goal-title"
              placeholder="e.g., Lose 10 pounds"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="neo-border bg-white text-black placeholder:text-black/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="neo-text-medium text-black">
                TARGET VALUE *
              </Label>
              <Input
                id="target"
                type="number"
                placeholder="10"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="neo-border bg-white text-black placeholder:text-black/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit" className="neo-text-medium text-black">
                UNIT
              </Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="neo-border bg-white text-black">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="neo-card">
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit} className="neo-text-medium text-black hover:bg-gray-100">
                      {unit.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="neo-text-medium text-black">
              DEADLINE *
            </Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="neo-border bg-white text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="neo-text-medium text-black">
                CATEGORY *
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="neo-border bg-white text-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="neo-card">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="neo-text-medium text-black hover:bg-gray-100">
                      {category.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority" className="neo-text-medium text-black">
                PRIORITY *
              </Label>
              <Select value={formData.priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setFormData({ ...formData, priority: value })}>
                <SelectTrigger className="neo-border bg-white text-black">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="neo-card">
                  <SelectItem value="Low" className="neo-text-medium text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      LOW
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium" className="neo-text-medium text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      MEDIUM
                    </div>
                  </SelectItem>
                  <SelectItem value="High" className="neo-text-medium text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      HIGH
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="neo-text-medium text-black">
              DESCRIPTION (OPTIONAL)
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your goal and what success looks like..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="neo-border bg-white text-black placeholder:text-black/60 min-h-[80px]"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="neo-button flex-1"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              className="neo-button-primary flex-1"
            >
              CREATE GOAL
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
