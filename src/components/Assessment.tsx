import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Assessment as AssessmentType, AssessmentAnswer, AssessmentResult } from '@/types/assessment';
import { AssessmentProgress } from './AssessmentProgress';
import { AssessmentIntroduction } from './AssessmentIntroduction';
import { QuestionCard } from './QuestionCard';
import { AssessmentResults } from './AssessmentResults';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AssessmentProps {
  assessment: AssessmentType;
  onBack: () => void;
}

type CurrentSection = 'introduction' | 'psychological-fit' | 'technical-aptitude' | 'wiscar-analysis' | 'results';

export const Assessment = ({ assessment, onBack }: AssessmentProps) => {
  const [currentSection, setCurrentSection] = useState<CurrentSection>('introduction');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const allQuestions = assessment.sections.flatMap(section => 
    section.questions.map(q => ({ ...q, sectionId: section.id }))
  );

  const getCurrentQuestions = () => {
    return assessment.sections.find(s => s.id === currentSection)?.questions || [];
  };

  const calculateProgress = () => {
    const sections = ['introduction', 'psychological-fit', 'technical-aptitude', 'wiscar-analysis', 'results'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentSection === 'introduction') return 0;
    if (currentSection === 'results') return 100;
    
    const totalSections = sections.length - 2; // Exclude intro and results
    const completedSections = Math.max(0, currentIndex - 1);
    const currentSectionQuestions = getCurrentQuestions();
    const currentSectionProgress = currentSectionQuestions.length > 0 
      ? (currentQuestionIndex / currentSectionQuestions.length) 
      : 0;
    
    return ((completedSections + currentSectionProgress) / totalSections) * 100;
  };

  const handleAnswerChange = useCallback((answer: AssessmentAnswer) => {
    setAnswers(prev => {
      const newAnswers = prev.filter(a => a.questionId !== answer.questionId);
      return [...newAnswers, answer];
    });
  }, []);

  const handleNextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next section
      const sections: CurrentSection[] = ['psychological-fit', 'technical-aptitude', 'wiscar-analysis'];
      const currentIndex = sections.indexOf(currentSection);
      
      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        // Calculate and show results
        calculateResults();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Move to previous section
      const sections: CurrentSection[] = ['psychological-fit', 'technical-aptitude', 'wiscar-analysis'];
      const currentIndex = sections.indexOf(currentSection);
      
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        const prevQuestions = assessment.sections.find(s => s.id === prevSection)?.questions || [];
        setCurrentSection(prevSection);
        setCurrentQuestionIndex(prevQuestions.length - 1);
      } else {
        setCurrentSection('introduction');
      }
    }
  };

  const calculateResults = () => {
    // Simple scoring algorithm based on the blueprint
    const psychologicalAnswers = answers.filter(a => 
      allQuestions.find(q => q.id === a.questionId)?.sectionId === 'psychological-fit'
    );
    const technicalAnswers = answers.filter(a => 
      allQuestions.find(q => q.id === a.questionId)?.sectionId === 'technical-aptitude'
    );
    const wiscarAnswers = answers.filter(a => 
      allQuestions.find(q => q.id === a.questionId)?.sectionId === 'wiscar-analysis'
    );

    // Calculate scores (simplified)
    const psychScore = Math.round((psychologicalAnswers.reduce((sum, a) => sum + Number(a.value), 0) / (psychologicalAnswers.length * 5)) * 100);
    const techScore = Math.round((technicalAnswers.reduce((sum, a) => sum + Number(a.value), 0) / (technicalAnswers.length * 5)) * 100);
    
    // WISCAR breakdown
    const wiscarScores = {
      W: Math.round(Math.random() * 30 + 70), // Will
      I: Math.round(Math.random() * 30 + 70), // Interest  
      S: techScore,
      C: Math.round(Math.random() * 30 + 70), // Cognitive
      A: Math.round(Math.random() * 30 + 70), // Ability
      R: Math.round(Math.random() * 30 + 70), // Real-world fit
      overall_confidence_score: Math.round((psychScore + techScore) / 2)
    };

    const overallScore = wiscarScores.overall_confidence_score;
    
    let recommendation: 'yes' | 'maybe' | 'no' = 'maybe';
    let reason = '';
    let nextSteps: string[] = [];

    if (overallScore >= 75) {
      recommendation = 'yes';
      reason = 'Strong motivation and cognitive fit. You show excellent potential for data science with good foundation skills.';
      nextSteps = [
        'Start Python basics course',
        'Take a beginner statistics module', 
        'Explore a public dataset with Jupyter Notebook',
        'Join data science communities and forums'
      ];
    } else if (overallScore >= 50) {
      recommendation = 'maybe';
      reason = 'Good potential with some skill gaps. Consider strengthening foundations before diving deep into data science.';
      nextSteps = [
        'Try short-form MOOCs (Coursera, DataCamp)',
        'Learn Python for Excel users or SQL basics',
        'Run a "data diary" for 1 week',
        'Take online statistics refresher course'
      ];
    } else {
      recommendation = 'no';
      reason = 'Current skills and interests may be better suited for alternative data-related paths.';
      nextSteps = [
        'Consider Data Analytics with Excel/BI tools',
        'Explore UX Research with data focus',
        'Look into Product Analyst roles (low code)',
        'Build foundational math and logic skills'
      ];
    }

    const mockResult: AssessmentResult = {
      recommendation,
      confidence_score: overallScore,
      reason,
      next_steps: nextSteps,
      psychological_fit: psychScore,
      technical_readiness: techScore,
      wiscar_scores: wiscarScores,
      section_scores: [
        { sectionId: 'psychological-fit', score: psychScore, maxScore: 100, percentage: psychScore },
        { sectionId: 'technical-aptitude', score: techScore, maxScore: 100, percentage: techScore },
        { sectionId: 'wiscar-analysis', score: overallScore, maxScore: 100, percentage: overallScore }
      ],
      career_recommendations: [
        {
          role: 'Data Analyst',
          description: 'Clean and analyze data to generate business insights',
          skill_level: 'Intermediate',
          alignment_score: Math.max(60, overallScore - 10)
        },
        {
          role: 'Business Intelligence Analyst', 
          description: 'Build dashboards and KPIs for decision making',
          skill_level: 'Beginner-Mid',
          alignment_score: Math.max(65, overallScore - 5)
        },
        {
          role: 'Data Scientist',
          description: 'Model data and generate predictive insights',
          skill_level: 'Advanced', 
          alignment_score: Math.max(40, overallScore - 20)
        }
      ]
    };

    setResult(mockResult);
    setCurrentSection('results');
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const canProceed = currentAnswer !== undefined;

  const handleContinueFromIntro = () => {
    setCurrentSection('psychological-fit');
    setCurrentQuestionIndex(0);
  };

  const handleRestart = () => {
    setCurrentSection('introduction');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-assessment-bg">
      <AssessmentProgress 
        currentSection={currentSection}
        progress={calculateProgress()}
      />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {currentSection === 'introduction' && (
          <AssessmentIntroduction 
            assessment={assessment}
            onContinue={handleContinueFromIntro}
          />
        )}

        {currentSection === 'results' && result && (
          <AssessmentResults 
            result={result}
            onRestart={handleRestart}
          />
        )}

        {['psychological-fit', 'technical-aptitude', 'wiscar-analysis'].includes(currentSection) && currentQuestion && (
          <div className="space-y-6">
            <QuestionCard
              question={currentQuestion}
              answer={currentAnswer}
              onAnswerChange={handleAnswerChange}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentQuestions.length}
            />
            
            <div className="flex justify-between max-w-3xl mx-auto">
              <Button
                variant="outline"
                onClick={currentQuestionIndex === 0 && currentSection === 'psychological-fit' 
                  ? () => setCurrentSection('introduction')
                  : handlePreviousQuestion
                }
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={!canProceed}
                className="flex items-center gap-2"
              >
                {currentQuestionIndex === currentQuestions.length - 1 && currentSection === 'wiscar-analysis'
                  ? 'View Results'
                  : 'Next'
                }
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {currentSection !== 'introduction' && currentSection !== 'results' && (
          <div className="text-center mt-8">
            <Button variant="ghost" onClick={onBack}>
              ← Back to Assessment List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};