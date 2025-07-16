import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Assessment } from '@/types/assessment';
import { Zap, Users, CheckCircle } from 'lucide-react';

interface AssessmentIntroductionProps {
  assessment: Assessment;
  onContinue: () => void;
}

export const AssessmentIntroduction = ({ assessment, onContinue }: AssessmentIntroductionProps) => {
  return (
    <div className="space-y-8">
      {/* What is Data Science */}
      <Card className="bg-assessment-card">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">What is Data Science?</h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            {assessment.what_is_description}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Cloud Platform</h3>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                Scalable, secure, and accessible from anywhere
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Statistical Analysis</h3>
              <p className="text-sm text-green-800 dark:text-green-400">
                Extract insights and reduce manual work
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Enterprise Scale</h3>
              <p className="text-sm text-purple-800 dark:text-purple-400">
                Used by Fortune 500 companies worldwide
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card className="bg-assessment-card">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Career Opportunities</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Data Scientist',
                description: 'Build workflows and automation',
                level: 'Advanced'
              },
              {
                title: 'Data Analyst',
                description: 'Manage platform and users',
                level: 'Intermediate'
              },
              {
                title: 'ML Engineer',
                description: 'Design enterprise processes',
                level: 'Advanced'
              }
            ].map((career, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{career.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {career.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {career.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Who Should Consider */}
      <Card className="bg-assessment-card">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Who Should Consider Data Science?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {assessment.who_should_consider.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium"
        >
          Continue to Assessment →
        </Button>
      </div>
    </div>
  );
};