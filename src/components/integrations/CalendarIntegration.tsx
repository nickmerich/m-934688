
import React, { useState } from 'react';
import { Calendar, Mail, Smartphone, Clock, Check, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CalendarProvider {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

export function CalendarIntegration() {
  const { toast } = useToast();
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [reminderTime, setReminderTime] = useState('08:00');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [providers, setProviders] = useState<CalendarProvider[]>([
    { id: 'google', name: 'Google Calendar', icon: '📅', connected: false },
    { id: 'outlook', name: 'Outlook Calendar', icon: '📆', connected: true },
    { id: 'apple', name: 'Apple Calendar', icon: '🍎', connected: false },
    { id: 'notion', name: 'Notion Calendar', icon: '📝', connected: false }
  ]);

  const connectProvider = (providerId: string) => {
    setProviders(providers.map(p => 
      p.id === providerId ? { ...p, connected: !p.connected } : p
    ));
    
    const provider = providers.find(p => p.id === providerId);
    toast({
      title: provider?.connected ? "Disconnected" : "Connected",
      description: `${provider?.name} ${provider?.connected ? 'disconnected' : 'connected'} successfully`,
    });
  };

  const saveReminderSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your reminder preferences have been updated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Calendar Providers */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Calendar Connections
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Connect your calendars to sync habits and goals with your schedule
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {providers.map((provider) => (
            <div 
              key={provider.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{provider.icon}</span>
                <div>
                  <h4 className="font-medium text-white">{provider.name}</h4>
                  <Badge 
                    variant={provider.connected ? "default" : "outline"}
                    className={provider.connected ? "bg-green-500 text-white" : ""}
                  >
                    {provider.connected ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => connectProvider(provider.id)}
                variant={provider.connected ? "outline" : "default"}
                size="sm"
                className={provider.connected 
                  ? "border-red-500 text-red-400 hover:bg-red-500/10" 
                  : "bg-blue-600 hover:bg-blue-700"
                }
              >
                {provider.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2 text-green-500" />
            Daily Reminder Settings
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Configure how and when you want to receive daily habit reminders
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Reminders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <Label htmlFor="email-reminders" className="text-white">Email Reminders</Label>
              </div>
              <Switch
                id="email-reminders"
                checked={emailReminders}
                onCheckedChange={setEmailReminders}
              />
            </div>
            {emailReminders && (
              <div className="ml-6">
                <Label htmlFor="email" className="text-gray-400 text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}
          </div>

          {/* SMS Reminders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-green-400" />
                <Label htmlFor="sms-reminders" className="text-white">SMS Reminders</Label>
              </div>
              <Switch
                id="sms-reminders"
                checked={smsReminders}
                onCheckedChange={setSmsReminders}
              />
            </div>
            {smsReminders && (
              <div className="ml-6">
                <Label htmlFor="phone" className="text-gray-400 text-sm">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}
          </div>

          {/* Reminder Time */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              <Label htmlFor="reminder-time" className="text-white">Daily Reminder Time</Label>
            </div>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white max-w-xs"
            />
          </div>

          <Button 
            onClick={saveReminderSettings}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Save Reminder Settings
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-sm">Reminder Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-medium text-white mb-2">🌅 Daily Gryt Reminder</h4>
            <p className="text-gray-300 text-sm mb-2">
              Good morning! Time to tackle your habits for today:
            </p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Morning Meditation (5 min)</li>
              <li>• Workout Session (30 min)</li>
              <li>• Read 30 Minutes</li>
              <li>• Journal Writing</li>
            </ul>
            <p className="text-green-400 text-sm mt-2">
              You're on a 7-day streak! Keep it going! 🔥
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
