import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Question, AssessmentAnswer } from '@/types/assessment';

interface QuestionCardProps {
  question: Question;
  answer?: AssessmentAnswer;
  onAnswerChange: (answer: AssessmentAnswer) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({ 
  question, 
  answer, 
  onAnswerChange,
  questionNumber,
  totalQuestions 
}: QuestionCardProps) => {
  const handleMultipleChoiceChange = (value: string) => {
    const optionIndex = question.options?.indexOf(value) ?? -1;
    onAnswerChange({
      questionId: question.id,
      value: optionIndex + 1 // 1-based scoring
    });
  };

  const handleScaleChange = (value: number[]) => {
    onAnswerChange({
      questionId: question.id,
      value: value[0]
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-assessment-card">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Question {questionNumber} of {totalQuestions}
              </span>
              <span className="text-sm text-muted-foreground capitalize">
                {question.category.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground leading-relaxed">
              {question.question}
            </h3>
          </div>

          {question.type === 'multiple-choice' && question.options && (
            <RadioGroup 
              value={answer?.value ? question.options[Number(answer.value) - 1] : ''}
              onValueChange={handleMultipleChoiceChange}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="border-2 border-border"
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="text-base font-normal cursor-pointer leading-relaxed flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'scale' && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Strongly Disagree</span>
                <span>Neutral</span>
                <span>Strongly Agree</span>
              </div>
              <Slider
                value={[Number(answer?.value) || 3]}
                onValueChange={handleScaleChange}
                min={question.min || 1}
                max={question.max || 5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {Array.from({ length: (question.max || 5) - (question.min || 1) + 1 }, (_, i) => (
                  <span key={i}>{(question.min || 1) + i}</span>
                ))}
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-primary">
                  {answer?.value || 3}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};