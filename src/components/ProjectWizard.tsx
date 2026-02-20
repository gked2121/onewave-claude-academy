"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Target,
  Users,
  Clock,
  Zap,
  Smartphone,
  Globe,
  BookOpen,
  Palette,
  BarChart3,
  ShoppingBag,
  Plus,
  Loader2,
  Star,
  User
} from 'lucide-react';
import Link from 'next/link';

const projectTemplates = [
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    icon: User,
    description: 'Showcase your skills and projects professionally',
    tags: ['Personal', 'Professional', 'Showcase'],
    difficulty: 'Beginner',
    timeFrame: '1-2 weeks',
    features: ['About section', 'Project gallery', 'Contact form', 'Responsive design']
  },
  {
    id: 'recipe-app',
    name: 'Recipe Collection',
    icon: BookOpen,
    description: 'Create and organize your favorite recipes',
    tags: ['Personal', 'Lifestyle', 'Organization'],
    difficulty: 'Beginner',
    timeFrame: '1-2 weeks',
    features: ['Recipe storage', 'Search functionality', 'Categories', 'Shopping lists']
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    icon: Globe,
    description: 'Share your thoughts and expertise with the world',
    tags: ['Content', 'Publishing', 'Personal'],
    difficulty: 'Intermediate',
    timeFrame: '2-3 weeks',
    features: ['Article creation', 'Comment system', 'Categories', 'SEO optimization']
  },
  {
    id: 'creative-showcase',
    name: 'Creative Portfolio',
    icon: Palette,
    description: 'Display your art, photography, or creative work',
    tags: ['Creative', 'Visual', 'Portfolio'],
    difficulty: 'Beginner',
    timeFrame: '1-2 weeks',
    features: ['Image galleries', 'Lightbox view', 'Portfolio categories', 'Client testimonials']
  },
  {
    id: 'dashboard',
    name: 'Personal Dashboard',
    icon: BarChart3,
    description: 'Track habits, goals, or personal metrics',
    tags: ['Productivity', 'Analytics', 'Personal'],
    difficulty: 'Intermediate',
    timeFrame: '2-4 weeks',
    features: ['Data visualization', 'Progress tracking', 'Goal setting', 'Analytics']
  },
  {
    id: 'landing-page',
    name: 'Product Landing Page',
    icon: ShoppingBag,
    description: 'Promote and sell your product or service',
    tags: ['Business', 'Marketing', 'Sales'],
    difficulty: 'Beginner',
    timeFrame: '1-2 weeks',
    features: ['Hero section', 'Feature highlights', 'Pricing', 'Contact forms']
  },
  {
    id: 'custom',
    name: 'Custom Project',
    icon: Plus,
    description: 'Build something unique - tell us your idea!',
    tags: ['Custom', 'Unique', 'Your Vision'],
    difficulty: 'Adaptive',
    timeFrame: 'Varies',
    features: ['AI-powered planning', 'Custom features', 'Personalized guidance', 'Flexible scope']
  }
];

const audienceOptions = [
  { id: 'personal', label: 'Personal Use', description: 'Just for me and my needs' },
  { id: 'friends', label: 'Friends & Family', description: 'Share with people I know' },
  { id: 'professional', label: 'Professional Network', description: 'Showcase to employers/clients' },
  { id: 'public', label: 'General Public', description: 'Anyone on the internet' }
];

const timelineOptions = [
  { id: 'weekend', label: 'Weekend Project', description: '2-3 days of focused work', hours: '8-12 hours' },
  { id: 'week', label: 'One Week', description: 'Work on it for a week', hours: '15-25 hours' },
  { id: 'month', label: 'Over a Month', description: 'Build it gradually', hours: '30-50 hours' },
  { id: 'no-rush', label: 'No Rush', description: 'Learn at my own pace', hours: 'Flexible' }
];

interface ProjectData {
  template?: string;
  customIdea?: string;
  audience?: string;
  timeline?: string;
  features?: string[];
  aiValidation?: {
    isValid: boolean;
    suggestions: string[];
    complexity: string;
    estimatedTime: string;
  };
}

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({});
  const [isValidating, setIsValidating] = useState(false);
  const [customIdea, setCustomIdea] = useState('');
  const { setSelectedAiCli } = useProgress();

  const totalSteps = 4;

  // AI Validation using GROQ
  const validateProjectWithAI = async (idea: string) => {
    setIsValidating(true);
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.3,
          messages: [
            {
              role: 'system',
              content: `You are a project validation assistant for beginner developers. Analyze project ideas and provide structured feedback in this exact JSON format:
{
  "isValid": boolean,
  "complexity": "beginner|intermediate|advanced",
  "estimatedTime": "X-Y weeks",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "features": ["feature1", "feature2", "feature3"]
}

Guidelines:
- Focus on web development projects
- Consider beginner skill level
- Suggest realistic scope
- Recommend starting features
- Keep suggestions encouraging and actionable`
            },
            {
              role: 'user',
              content: `Please validate this project idea for a beginner developer: "${idea}"`
            }
          ]
        })
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fullResponse += decoder.decode(value);
          }
        }

        try {
          const validation = JSON.parse(fullResponse);
          setProjectData(prev => ({
            ...prev,
            aiValidation: validation
          }));
        } catch (e) {
          // Fallback validation
          setProjectData(prev => ({
            ...prev,
            aiValidation: {
              isValid: true,
              suggestions: ['Start with a simple version', 'Focus on core features first', 'Add advanced features later'],
              complexity: 'beginner',
              estimatedTime: '2-3 weeks'
            }
          }));
        }
      }
    } catch (error) {
      console.error('AI validation error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleTemplateSelect = (template: any) => {
    setProjectData(prev => ({
      ...prev,
      template: template.id,
      customIdea: template.id === 'custom' ? '' : undefined
    }));
  };

  const handleCustomIdeaSubmit = async () => {
    if (customIdea.trim()) {
      setProjectData(prev => ({
        ...prev,
        customIdea: customIdea.trim()
      }));
      await validateProjectWithAI(customIdea.trim());
    }
  };

  const selectedTemplate = projectTemplates.find(t => t.id === projectData.template);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i + 1 <= currentStep
                      ? 'bg-emerald-500 text-white'
                      : i + 1 === currentStep + 1
                      ? 'bg-purple-500/30 text-purple-300 ring-2 ring-purple-500'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {i + 1 <= currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-all ${
                      i + 1 < currentStep ? 'bg-emerald-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Project Creation Wizard</h1>
          <p className="text-gray-300">Let's build something amazing together!</p>
        </motion.div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">What would you like to build?</h2>
                  <p className="text-gray-300 text-lg">Choose a project type or tell us your custom idea</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectTemplates.map((template) => {
                    const Icon = template.icon;
                    const isSelected = projectData.template === template.id;

                    return (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTemplateSelect(template)}
                        className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                          isSelected
                            ? 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-400/30'
                            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="font-semibold text-white">{template.name}</h3>
                        </div>

                        <p className="text-gray-300 text-sm mb-4">{template.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {template.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-xs text-gray-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span>{template.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{template.timeFrame}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4"
                          >
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Custom Idea Input */}
                {projectData.template === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      Tell us your custom idea
                    </h3>
                    <div className="space-y-4">
                      <textarea
                        value={customIdea}
                        onChange={(e) => setCustomIdea(e.target.value)}
                        placeholder="Describe what you want to build... (e.g., 'A music player for my band', 'A workout tracker for my gym routine')"
                        className="w-full p-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder:text-gray-500 resize-none"
                        rows={4}
                      />
                      <button
                        onClick={handleCustomIdeaSubmit}
                        disabled={!customIdea.trim() || isValidating}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                      >
                        {isValidating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            AI is analyzing your idea...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Validate with AI
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI Validation Results */}
                    {projectData.aiValidation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl"
                      >
                        <h4 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          AI Analysis Results
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Complexity:</span>
                            <span className="text-white capitalize">{projectData.aiValidation.complexity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Estimated Time:</span>
                            <span className="text-white">{projectData.aiValidation.estimatedTime}</span>
                          </div>
                          <div>
                            <span className="text-gray-300 block mb-2">AI Suggestions:</span>
                            <ul className="space-y-1">
                              {projectData.aiValidation.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="text-gray-200 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Additional steps would go here... */}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!projectData.template || (projectData.template === 'custom' && !projectData.aiValidation)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/character-selection"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
              >
                Start Building
                <Sparkles className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}