
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Settings, Shield, Bell } from 'lucide-react';
import { UserStats } from '@/components/profile/UserStats';
import { SocialSharing } from '@/components/profile/SocialSharing';

const Profile = () => {
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
            <div className="neo-card-green inline-block">
              <span className="neo-text-medium text-black">👤 YOUR PROFILE</span>
            </div>
            
            <h1 className="neo-text-huge text-black">
              YOUR HABIT
              <span className="block" style={{
                color: 'hsl(var(--neon-green))'
              }}>
                JOURNEY
              </span>
            </h1>
          </div>

          {/* User Stats */}
          <div className="mb-16">
            <h2 className="neo-text-big text-black mb-8 text-center">YOUR ACHIEVEMENTS</h2>
            <UserStats />
          </div>

          {/* Social Sharing Section */}
          <div className="mb-16">
            <SocialSharing />
          </div>

          {/* Profile Management Options */}
          <div className="neo-grid">
            <div className="neo-card">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <User className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">PERSONAL INFO</h3>
                <p className="neo-text-medium text-black leading-relaxed mb-6">
                  UPDATE YOUR NAME, EMAIL, AND BASIC INFORMATION
                </p>
                <Button className="neo-button w-full">
                  EDIT PROFILE
                </Button>
              </div>
            </div>

            <div className="neo-card-pink">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Settings className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">PREFERENCES</h3>
                <p className="neo-text-medium text-black leading-relaxed mb-6">
                  CUSTOMIZE YOUR EXPERIENCE AND APP SETTINGS
                </p>
                <Button className="neo-button w-full">
                  SETTINGS
                </Button>
              </div>
            </div>

            <div className="neo-card-green">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Shield className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-black mb-4">SECURITY</h3>
                <p className="neo-text-medium text-black leading-relaxed mb-6">
                  MANAGE PASSWORD AND SECURITY SETTINGS
                </p>
                <Button className="neo-button w-full">
                  SECURITY
                </Button>
              </div>
            </div>

            <div className="neo-card-charcoal">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-4 border-black mb-6">
                  <Bell className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="neo-text-big text-white mb-4">NOTIFICATIONS</h3>
                <p className="neo-text-medium text-white leading-relaxed mb-6">
                  CONTROL HOW AND WHEN YOU GET NOTIFIED
                </p>
                <Button className="neo-button w-full">
                  NOTIFICATIONS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
