
import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { shareOnTwitter, shareOnLinkedIn, shareOnFacebook, copyToClipboard, generateShareText } from '@/utils/socialShare';
import { useUserStreaks } from '@/hooks/useUserStreaks';

export function SocialSharing() {
  const { highestStreak, activeStreaks, canShare } = useUserStreaks();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleShare = async (platform: string, habitName?: string) => {
    const shareText = generateShareText(highestStreak, habitName);
    const shareData = {
      title: 'My Habit Streak Achievement!',
      text: shareText,
      url: 'https://thegryt.app',
      hashtags: ['HabitTracker', 'Consistency', 'PersonalGrowth', 'TheGryt']
    };

    switch (platform) {
      case 'twitter':
        shareOnTwitter(shareData);
        break;
      case 'linkedin':
        shareOnLinkedIn(shareData);
        break;
      case 'facebook':
        shareOnFacebook(shareData);
        break;
      case 'copy':
        const success = await copyToClipboard(shareText);
        if (success) {
          setCopiedText(shareText);
          setTimeout(() => setCopiedText(null), 3000);
        }
        break;
    }
  };

  if (!canShare) {
    return (
      <Card className="neo-card">
        <CardHeader>
          <CardTitle className="neo-text-medium text-black flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            SHARE YOUR SUCCESS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔥</div>
            <h3 className="neo-text-big text-black mb-4">KEEP GOING!</h3>
            <p className="neo-text-medium text-black mb-4">
              Build a 3-day streak to unlock social sharing and celebrate your achievements!
            </p>
            <div className="text-center">
              <span className="neo-text-medium text-black">Current highest streak: </span>
              <Badge className="bg-orange-500 text-white border-2 border-black">
                {highestStreak} {highestStreak === 1 ? 'day' : 'days'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="neo-card-green">
      <CardHeader>
        <CardTitle className="neo-text-medium text-black flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          SHARE YOUR SUCCESS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Achievement Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white border-4 border-black">
            <div className="text-3xl font-black text-black">{highestStreak}</div>
            <div className="neo-text-medium text-black">LONGEST STREAK</div>
          </div>
          <div className="text-center p-4 bg-white border-4 border-black">
            <div className="text-3xl font-black text-black">{activeStreaks.length}</div>
            <div className="neo-text-medium text-black">ACTIVE HABITS</div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-4">
          <h4 className="neo-text-medium text-black">SHARE YOUR ACHIEVEMENT:</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleShare('twitter')}
              className="neo-button flex items-center justify-center space-x-2"
            >
              <Twitter className="h-4 w-4" />
              <span>TWITTER</span>
            </Button>
            
            <Button
              onClick={() => handleShare('linkedin')}
              className="neo-button flex items-center justify-center space-x-2"
            >
              <Linkedin className="h-4 w-4" />
              <span>LINKEDIN</span>
            </Button>
            
            <Button
              onClick={() => handleShare('facebook')}
              className="neo-button flex items-center justify-center space-x-2"
            >
              <Facebook className="h-4 w-4" />
              <span>FACEBOOK</span>
            </Button>
            
            <Button
              onClick={() => handleShare('copy')}
              className="neo-button flex items-center justify-center space-x-2"
            >
              {copiedText ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedText ? 'COPIED!' : 'COPY TEXT'}</span>
            </Button>
          </div>
        </div>

        {/* Share Individual Habits */}
        {activeStreaks.length > 0 && (
          <div className="space-y-3">
            <h4 className="neo-text-medium text-black">SHARE SPECIFIC HABITS:</h4>
            {activeStreaks.map((habit) => (
              <div key={habit.name} className="flex items-center justify-between p-3 bg-white border-4 border-black">
                <div>
                  <span className="neo-text-medium text-black">{habit.name}</span>
                  <Badge className="ml-2 bg-green-500 text-white border-2 border-black">
                    {habit.currentStreak} days
                  </Badge>
                </div>
                <Button
                  onClick={() => handleShare('twitter', habit.name)}
                  size="sm"
                  className="neo-button-small"
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {copiedText && (
          <div className="p-3 bg-green-100 border-4 border-black rounded">
            <p className="text-sm text-black font-bold">Copied to clipboard:</p>
            <p className="text-xs text-black mt-1">{copiedText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
