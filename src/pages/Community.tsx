import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MessageCircle, Trophy, Heart } from 'lucide-react';

const Community = () => {
  const navigate = useNavigate();

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

            {/* Empty middle section */}
            <div></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32 no-gradients">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center space-y-12 mb-16">
            <div className="neo-card-pink inline-block">
              <span className="neo-text-medium text-black">🤝 COMING SOON</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              CONNECT WITH
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                FELLOW CHAMPIONS
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className="neo-text-medium text-black leading-relaxed">
                SOON YOU'LL BE ABLE TO CONNECT WITH LIKE-MINDED INDIVIDUALS, SHARE YOUR PROGRESS, AND BUILD ACCOUNTABILITY PARTNERSHIPS.
              </p>
            </div>
          </div>

          {/* Community Features Grid */}
          <div className="neo-grid">
            <div className="neo-card-green">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Users className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">ACCOUNTABILITY GROUPS</h3>
                <p className="neo-text-medium text-black leading-relaxed">
                  JOIN SMALL GROUPS FOR MUTUAL SUPPORT AND ACCOUNTABILITY
                </p>
              </div>
            </div>

            <div className="neo-card-pink">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <MessageCircle className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">DISCUSSION FORUMS</h3>
                <p className="neo-text-medium text-black leading-relaxed">
                  SHARE INSIGHTS, ASK QUESTIONS, AND LEARN FROM OTHERS
                </p>
              </div>
            </div>

            <div className="neo-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Trophy className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">LEADERBOARDS</h3>
                <p className="neo-text-medium text-black leading-relaxed">
                  COMPETE FRIENDLY WITH OTHERS AND CELEBRATE ACHIEVEMENTS
                </p>
              </div>
            </div>

            <div className="neo-card-charcoal">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Heart className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">SUPPORT NETWORK</h3>
                <p className="neo-text-medium text-white leading-relaxed">
                  GET MOTIVATION AND SUPPORT WHEN YOU NEED IT MOST
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button onClick={() => navigate('/signup')} className="neo-button-primary text-xl px-12 py-6">
              GET NOTIFIED WHEN AVAILABLE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
