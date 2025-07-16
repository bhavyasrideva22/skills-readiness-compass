import { useState } from 'react';
import { AssessmentCard } from '@/components/AssessmentCard';
import { Assessment } from '@/components/Assessment';
import { dataScienceAssessment } from '@/data/dataScienceAssessment';

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleBackToList = () => {
    setShowAssessment(false);
  };

  if (showAssessment) {
    return (
      <Assessment 
        assessment={dataScienceAssessment}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="min-h-screen bg-assessment-bg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Skills Readiness Assessment
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive Career Assessment & Guidance
          </p>
        </div>

        <AssessmentCard
          title={dataScienceAssessment.title}
          subtitle={dataScienceAssessment.subtitle}
          description={dataScienceAssessment.description}
          duration={dataScienceAssessment.duration}
          onStartAssessment={handleStartAssessment}
        />
      </div>
    </div>
  );
};

export default Index;
