import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Code, Target, BarChart } from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
  current: boolean;
}

interface AssessmentProgressProps {
  currentSection: string;
  progress: number;
}

export const AssessmentProgress = ({ currentSection, progress }: AssessmentProgressProps) => {
  const steps: ProgressStep[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: BookOpen,
      completed: currentSection !== 'introduction',
      current: currentSection === 'introduction'
    },
    {
      id: 'psychological-fit',
      title: 'Psychological Fit',
      icon: Brain,
      completed: ['technical-aptitude', 'wiscar-analysis', 'results'].includes(currentSection),
      current: currentSection === 'psychological-fit'
    },
    {
      id: 'technical-aptitude',
      title: 'Technical Aptitude',
      icon: Code,
      completed: ['wiscar-analysis', 'results'].includes(currentSection),
      current: currentSection === 'technical-aptitude'
    },
    {
      id: 'wiscar-analysis',
      title: 'WISCAR Analysis',
      icon: Target,
      completed: currentSection === 'results',
      current: currentSection === 'wiscar-analysis'
    },
    {
      id: 'results',
      title: 'Your Results',
      icon: BarChart,
      completed: false,
      current: currentSection === 'results'
    }
  ];

  return (
    <div className="w-full bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Should I Learn Data Science?
          </h2>
          <Badge variant="secondary" className="bg-progress-bg text-muted-foreground">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-progress-bg rounded-full h-2 mb-6">
          <div 
            className="bg-progress-fill h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${step.current 
                      ? 'bg-step-active border-step-active text-white' 
                      : step.completed 
                        ? 'bg-step-active border-step-active text-white'
                        : 'bg-card border-step-inactive text-step-inactive'
                    }
                  `}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`
                    text-xs mt-2 font-medium text-center max-w-20
                    ${step.current ? 'text-step-active' : 'text-step-inactive'}
                  `}>
                    {step.title}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-all duration-200
                    ${step.completed ? 'bg-step-active' : 'bg-step-inactive'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};