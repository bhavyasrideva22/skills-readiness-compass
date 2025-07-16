import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, BarChart3, Target, User, Briefcase } from 'lucide-react';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const AssessmentResults = ({ result, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes':
        return <CheckCircle className="h-8 w-8 text-success" />;
      case 'maybe':
        return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'no':
        return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'maybe':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'no':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
    }
  };

  const getRecommendationTitle = () => {
    switch (result.recommendation) {
      case 'yes':
        return 'Yes, You Should Learn Data Science!';
      case 'maybe':
        return 'Maybe - With Some Preparation';
      case 'no':
        return 'Consider Alternative Paths';
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Recommendation */}
      <Card className={`${getRecommendationColor()}`}>
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-4">
            {getRecommendationIcon()}
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {getRecommendationTitle()}
              </h2>
              <Badge variant="secondary" className="mt-2">
                {result.confidence_score}% Confidence
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {result.reason}
          </p>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-assessment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Psychological Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-semibold">{result.psychological_fit}/100</span>
              </div>
              <Progress value={result.psychological_fit} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-assessment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Score</span>
                <span className="font-semibold">{result.technical_readiness}/100</span>
              </div>
              <Progress value={result.technical_readiness} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Analysis */}
      <Card className="bg-assessment-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            WISCAR Framework Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(result.wiscar_scores).filter(([key]) => key !== 'overall_confidence_score').map(([key, score]) => {
              const labels = {
                W: 'Will',
                I: 'Interest', 
                S: 'Skill',
                C: 'Cognitive Readiness',
                A: 'Ability to Learn',
                R: 'Real-World Fit'
              };
              
              return (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{score}</div>
                  <div className="text-sm font-medium text-foreground">{labels[key as keyof typeof labels]}</div>
                  <Progress value={score} className="h-2 mt-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-assessment-card">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.next_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card className="bg-assessment-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Career Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {result.career_recommendations.map((career, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{career.role}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{career.skill_level}</Badge>
                    <span className="text-sm text-primary font-medium">
                      {career.alignment_score}% match
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {career.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <Button 
          onClick={onRestart}
          variant="outline"
          className="px-8 py-3"
        >
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
};