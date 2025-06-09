
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function OnboardingProgress({ currentStep, totalSteps, steps }: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="w-full bg-white border-4 border-black h-6 neo-shadow-medium">
          <div 
            className="h-full transition-all duration-500 ease-out border-r-4 border-black"
            style={{ 
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              background: 'hsl(var(--neon-green))'
            }}
          />
        </div>
        <div className="absolute top-0 right-0 mt-8">
          <div className="neo-card-charcoal inline-block">
            <span className="neo-text-medium text-white">
              STEP {currentStep} OF {totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="hidden md:flex justify-between items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className={`flex items-center justify-center w-12 h-12 border-4 border-black transition-all duration-300 ${
                isCompleted 
                  ? 'neo-card-green'
                  : isCurrent
                  ? 'neo-card-pink'
                  : 'neo-card'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-black" strokeWidth={3} />
                ) : (
                  <Circle className="h-6 w-6 text-black" strokeWidth={3} />
                )}
              </div>
              <span className={`text-sm text-center max-w-20 font-black uppercase ${
                isCurrent ? 'text-black' : isCompleted ? 'text-black' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
