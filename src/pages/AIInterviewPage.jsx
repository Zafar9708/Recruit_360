import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    Clock,
    ChevronRight,
    CheckCircle,
    XCircle,
    Code,
    MessageSquare,
    Brain,
    Flag,
    AlertCircle,
    Send,
    Pause,
    Play,
    Square,
    Camera,
    Star,
    TrendingUp,
    Target,
    Zap,
    Shield,
    Award,
    Users,
    BookOpen,
    LogOut,
    Home,
    AlertTriangle,
    Trophy,
    BarChart3,
    Sparkles,
    Lock,
    Unlock,
    Crown,
    Rocket,
    Target as TargetIcon,
    Zap as ZapIcon,
    Flame
} from 'lucide-react';

export default function AIInterviewPage() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const [interviewState, setInterviewState] = useState('levelSelect'); // levelSelect, intro, inProgress, completed
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [answers, setAnswers] = useState({});
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [stream, setStream] = useState(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Interview level configurations with enhanced UI
    const interviewLevels = [
        {
            id: 'beginner',
            name: 'Beginner',
            tagline: 'Start Your Journey',
            description: 'Perfect for those starting their tech career',
            icon: BookOpen,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            duration: 30, // minutes
            questionCount: 12,
            difficulty: 'Easy',
            difficultyColor: 'bg-emerald-100 text-emerald-700',
            recommendedFor: 'Students & Entry level (0-2 years)',
            features: [
                'Basic programming concepts',
                'Simple algorithms',
                'Fundamental data structures',
                'Entry-level questions'
            ],
            badge: '🎯 Foundation'
        },
        {
            id: 'intermediate',
            name: 'Intermediate',
            tagline: 'Level Up Your Skills',
            description: 'For developers with some experience',
            icon: Target,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
            borderColor: 'border-purple-200',
            textColor: 'text-purple-700',
            duration: 45,
            questionCount: 18,
            difficulty: 'Medium',
            difficultyColor: 'bg-amber-100 text-amber-700',
            recommendedFor: 'Mid-level positions (2-5 years)',
            features: [
                'Advanced algorithms',
                'System design basics',
                'Optimization techniques',
                'Real-world scenarios'
            ],
            badge: '⚡ Pro Challenge'
        },
        {
            id: 'advanced',
            name: 'Advanced',
            tagline: 'Master the Craft',
            description: 'For senior engineers and architects',
            icon: Crown,
            color: 'from-rose-600 to-orange-500',
            bgColor: 'bg-gradient-to-br from-rose-50 to-orange-50',
            borderColor: 'border-rose-200',
            textColor: 'text-rose-700',
            duration: 60,
            questionCount: 24,
            difficulty: 'Hard',
            difficultyColor: 'bg-rose-100 text-rose-700',
            recommendedFor: 'Senior positions (5+ years)',
            features: [
                'Complex system design',
                'Scalability patterns',
                'Performance optimization',
                'Architectural decisions'
            ],
            badge: '🏆 Expert Level'
        }
    ];

    // Questions based on levels
    const getQuestionsByLevel = (level) => {
        const baseQuestions = {
            beginner: [
                {
                    id: 1,
                    type: 'mcq',
                    question: 'What is the time complexity of binary search?',
                    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
                    correctAnswer: 'O(log n)',
                    timeLimit: 60,
                    points: 10,
                    explanation: 'Binary search halves the search space each iteration'
                },
                {
                    id: 2,
                    type: 'mcq',
                    question: 'Which data structure uses LIFO (Last In First Out) principle?',
                    options: ['Queue', 'Stack', 'Array', 'Linked List'],
                    correctAnswer: 'Stack',
                    timeLimit: 45,
                    points: 10
                },
                {
                    id: 3,
                    type: 'subjective',
                    question: 'Explain the difference between synchronous and asynchronous programming.',
                    timeLimit: 120,
                    points: 20,
                    minWords: 30
                },
                {
                    id: 4,
                    type: 'coding',
                    question: 'Write a function to reverse a string.',
                    language: 'javascript',
                    starterCode: `function reverseString(str) {
  // Your code here
}`,
                    timeLimit: 300,
                    points: 25
                }
            ],
            intermediate: [
                {
                    id: 1,
                    type: 'mcq',
                    question: 'What is the time complexity of merge sort?',
                    options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'],
                    correctAnswer: 'O(n log n)',
                    timeLimit: 45,
                    points: 15
                },
                {
                    id: 2,
                    type: 'mcq',
                    question: 'Which of the following is NOT a NoSQL database?',
                    options: ['MongoDB', 'Cassandra', 'PostgreSQL', 'Redis'],
                    correctAnswer: 'PostgreSQL',
                    timeLimit: 45,
                    points: 15
                },
                {
                    id: 3,
                    type: 'subjective',
                    question: 'Explain the concept of memoization with an example.',
                    timeLimit: 150,
                    points: 25,
                    minWords: 50
                },
                {
                    id: 4,
                    type: 'coding',
                    question: 'Implement a function to find the longest palindromic substring.',
                    language: 'javascript',
                    starterCode: `function longestPalindrome(s) {
  // Your code here
}`,
                    timeLimit: 450,
                    points: 35,
                    testCases: [
                        { input: '"babad"', output: '"bab"' },
                        { input: '"cbbd"', output: '"bb"' }
                    ]
                }
            ],
            advanced: [
                {
                    id: 1,
                    type: 'mcq',
                    question: 'What is the time complexity of Dijkstra\'s algorithm using a binary heap?',
                    options: ['O((V + E) log V)', 'O(V²)', 'O(V log V)', 'O(E log V)'],
                    correctAnswer: 'O((V + E) log V)',
                    timeLimit: 60,
                    points: 20
                },
                {
                    id: 2,
                    type: 'mcq',
                    question: 'In a distributed system, what does the CAP theorem state?',
                    options: [
                        'Consistency, Availability, Partition tolerance - pick two',
                        'Consistency, Accuracy, Performance',
                        'Capacity, Availability, Partitioning',
                        'Consistency, Accessibility, Performance'
                    ],
                    correctAnswer: 'Consistency, Availability, Partition tolerance - pick two',
                    timeLimit: 60,
                    points: 20
                },
                {
                    id: 3,
                    type: 'subjective',
                    question: 'Design a URL shortening service like bit.ly. Discuss architecture, scalability, and trade-offs.',
                    timeLimit: 300,
                    points: 40,
                    minWords: 100
                },
                {
                    id: 4,
                    type: 'coding',
                    question: 'Implement a function to merge k sorted linked lists.',
                    language: 'javascript',
                    starterCode: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
  // Your code here
}`,
                    timeLimit: 600,
                    points: 40,
                    testCases: [
                        { input: '[[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }
                    ]
                }
            ]
        };

        return baseQuestions[level] || baseQuestions.beginner;
    };

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const initVideo = async () => {
            try {
                const constraints = {
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: "user"
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                };

                const userStream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(userStream);

                if (videoRef.current) {
                    videoRef.current.srcObject = userStream;
                    videoRef.current.play().catch(console.error);
                }

                // Setup media recorder
                try {
                    const mediaRecorder = new MediaRecorder(userStream, {
                        mimeType: 'video/webm;codecs=vp9',
                        videoBitsPerSecond: 2500000
                    });

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            chunksRef.current.push(event.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                        const url = URL.createObjectURL(blob);
                        console.log('Recording saved:', url);
                        chunksRef.current = [];
                    };

                    mediaRecorderRef.current = mediaRecorder;
                } catch (recorderError) {
                    console.error('MediaRecorder error:', recorderError);
                }

            } catch (err) {
                console.error('Error accessing media devices:', err);
                alert('Unable to access camera/microphone. Please check permissions.');
            }
        };

        if (interviewState === 'inProgress') {
            initVideo();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
        };
    }, [interviewState]);

    useEffect(() => {
        let timer;
        if (interviewState === 'inProgress' && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmitInterview();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [interviewState, timeRemaining]);

    useEffect(() => {
        let recordingTimer;
        if (isRecording) {
            recordingTimer = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(recordingTimer);
    }, [isRecording]);

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
        setQuestions(getQuestionsByLevel(level.id));
        const durationInSeconds = level.duration * 60;
        setTimeRemaining(durationInSeconds);
        setInterviewState('intro');
    };

    const handleStartInterview = () => {
        setInterviewState('inProgress');
        if (selectedLevel) {
            const durationInSeconds = selectedLevel.duration * 60;
            setTimeRemaining(durationInSeconds);
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmitInterview = () => {
        const score = calculateScore();
        const interviewData = {
            level: selectedLevel?.id,
            levelName: selectedLevel?.name,
            overallScore: score,
            skillBreakdown: [
                {
                    skill: 'Technical Knowledge',
                    score: Math.min(100, score + (selectedLevel?.id === 'beginner' ? 20 : selectedLevel?.id === 'intermediate' ? 15 : 10)),
                    level: getLevelFromScore(score, selectedLevel?.id),
                    color: 'bg-blue-500'
                },
                {
                    skill: 'Problem Solving',
                    score: Math.min(100, score + (selectedLevel?.id === 'beginner' ? 15 : selectedLevel?.id === 'intermediate' ? 20 : 25)),
                    level: getLevelFromScore(score, selectedLevel?.id),
                    color: 'bg-purple-500'
                },
                {
                    skill: 'Communication',
                    score: Math.min(100, score + (selectedLevel?.id === 'beginner' ? 10 : selectedLevel?.id === 'intermediate' ? 15 : 20)),
                    level: getLevelFromScore(score, selectedLevel?.id),
                    color: 'bg-emerald-500'
                },
                {
                    skill: 'Code Quality',
                    score: Math.min(100, score + (selectedLevel?.id === 'beginner' ? 5 : selectedLevel?.id === 'intermediate' ? 10 : 15)),
                    level: getLevelFromScore(score, selectedLevel?.id),
                    color: 'bg-amber-500'
                }
            ],
            strengths: getStrengths(score, selectedLevel?.id),
            improvements: getImprovements(score, selectedLevel?.id),
            submittedAt: new Date().toISOString(),
            duration: selectedLevel?.duration,
            totalQuestions: questions.length
        };

        localStorage.setItem('aiInterviewData', JSON.stringify(interviewData));

        if (isRecording) {
            toggleRecording();
        }

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        setInterviewState('completed');
    };

    const handleExitInterview = () => {
        setShowExitConfirm(true);
    };

    const confirmExit = () => {
        // Save partial progress if needed
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        if (isRecording) {
            toggleRecording();
        }

        navigate('/dashboard');
    };

    const getLevelFromScore = (score, level) => {
        if (level === 'beginner') {
            if (score >= 80) return 'Advanced Beginner';
            if (score >= 60) return 'Proficient';
            return 'Beginner';
        } else if (level === 'intermediate') {
            if (score >= 75) return 'Advanced';
            if (score >= 50) return 'Intermediate';
            return 'Beginner';
        } else {
            if (score >= 70) return 'Expert';
            if (score >= 45) return 'Advanced';
            return 'Intermediate';
        }
    };

    const getStrengths = (score, level) => {
        if (score >= 70) {
            return ['Strong Technical Foundation', 'Good Problem Solving'];
        } else if (score >= 50) {
            return ['Basic Concepts Clear', 'Average Problem Solving'];
        }
        return ['Willingness to Learn', 'Basic Understanding'];
    };

    const getImprovements = (score, level) => {
        if (level === 'beginner') {
            return ['Data Structures', 'Algorithm Complexity', 'Practice More Problems'];
        } else if (level === 'intermediate') {
            return ['System Design', 'Advanced Algorithms', 'Optimization Techniques'];
        } else {
            return ['Complex System Design', 'Performance Optimization', 'Scalability Patterns'];
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        let maxScore = 0;

        questions.forEach(q => {
            maxScore += q.points;
            if (answers[q.id]) {
                if (q.type === 'mcq' && answers[q.id] === q.correctAnswer) {
                    totalScore += q.points;
                } else if (q.type === 'subjective' && answers[q.id].length >= (q.minWords || 0)) {
                    totalScore += q.points * 0.8;
                } else if (q.type === 'coding' && answers[q.id]?.includes('function')) {
                    totalScore += q.points * 0.7;
                }
            }
        });

        return Math.round((totalScore / maxScore) * 100);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleVideo = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !isVideoOn;
                setIsVideoOn(!isVideoOn);
            }
        }
    };

    const toggleAudio = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !isAudioOn;
                setIsAudioOn(!isAudioOn);
            }
        }
    };

    const toggleRecording = () => {
        if (!mediaRecorderRef.current) return;

        if (!isRecording) {
            try {
                mediaRecorderRef.current.start();
                setIsRecording(true);
                setRecordingTime(0);
                console.log('Recording started');
            } catch (error) {
                console.error('Error starting recording:', error);
            }
        } else {
            try {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
                console.log('Recording stopped');
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (interviewState === 'levelSelect') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl flex items-center justify-center shadow-lg">
                                <Brain className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">AI Interview Assessment</h1>
                                <p className="text-gray-600">Choose your challenge level</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium shadow-sm"
                        >
                            <Home className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                    </div>

                    {/* Level Cards */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {interviewLevels.map((level, index) => {
                            const Icon = level.icon;
                            return (
                                <motion.div
                                    key={level.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    onClick={() => handleLevelSelect(level)}
                                    className={`${level.bgColor} rounded-2xl border-2 ${level.borderColor} p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-opacity-100 relative overflow-hidden group`}
                                >
                                    {/* Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${level.difficultyColor}`}>
                                            {level.badge}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-20 h-20 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>

                                    {/* Level Info */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-gray-900">{level.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${level.difficultyColor}`}>
                                                {level.difficulty}
                                            </span>
                                        </div>
                                        <h4 className={`text-lg font-semibold ${level.textColor} mb-2`}>{level.tagline}</h4>
                                        <p className="text-gray-600">{level.description}</p>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 mb-8">
                                        {level.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${level.textColor.replace('text-', 'bg-')}`}></div>
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 rounded-xl border border-white/50">
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-gray-900">{level.duration} min</div>
                                            <div className="text-xs text-gray-500">Duration</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-gray-900">{level.questionCount}</div>
                                            <div className="text-xs text-gray-500">Questions</div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full mt-6 py-4 bg-gradient-to-r ${level.color} text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg`}
                                    >
                                        Select {level.name}
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <BarChart3 className="w-8 h-8 text-blue-900" />
                            <h2 className="text-2xl font-bold text-gray-900">Level Comparison</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 text-left text-sm font-semibold text-gray-600">Features</th>
                                        {interviewLevels.map(level => (
                                            <th key={level.id} className="py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="font-bold text-gray-900">{level.name}</span>
                                                    <span className={`text-xs ${level.textColor}`}>{level.difficulty}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 text-sm font-medium text-gray-700">Recommended Experience</td>
                                        {interviewLevels.map(level => (
                                            <td key={level.id} className="py-4 text-center text-sm text-gray-600">
                                                {level.recommendedFor}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 text-sm font-medium text-gray-700">Question Types</td>
                                        {interviewLevels.map(level => (
                                            <td key={level.id} className="py-4 text-center text-sm text-gray-600">
                                                MCQs + Coding + Subjective
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 text-sm font-medium text-gray-700">Video Recording</td>
                                        {interviewLevels.map(level => (
                                            <td key={level.id} className="py-4 text-center">
                                                <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 text-sm font-medium text-gray-700">Detailed Analytics</td>
                                        {interviewLevels.map(level => (
                                            <td key={level.id} className="py-4 text-center">
                                                <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (interviewState === 'intro') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header with Exit Button */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setInterviewState('levelSelect')}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" />
                                Change Level
                            </button>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">AI Interview Assessment</h1>
                                    <p className="text-gray-600">{selectedLevel?.name} Level Interview</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium shadow-sm"
                        >
                            <Home className="w-5 h-5" />
                            Exit to Dashboard
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Interview Overview</h2>

                                <div className="space-y-6">
                                    <div className={`p-6 rounded-xl border-2 ${selectedLevel?.borderColor} ${selectedLevel?.bgColor}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${selectedLevel?.color} rounded-xl flex items-center justify-center`}>
                                                {selectedLevel?.icon && (() => {
                                                    const IconComponent = selectedLevel.icon;
                                                    return <IconComponent className="w-6 h-6 text-white" />;
                                                })()}                      </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">{selectedLevel?.name} Level</h3>
                                                <p className="text-gray-600">{selectedLevel?.description}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">Duration</p>
                                                <p className="font-bold text-gray-900">{selectedLevel?.duration} minutes</p>
                                            </div>
                                            <div className="bg-white/50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">Questions</p>
                                                <p className="font-bold text-gray-900">{selectedLevel?.questionCount}</p>
                                            </div>
                                            <div className="bg-white/50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">Difficulty</p>
                                                <p className="font-bold text-gray-900">{selectedLevel?.difficulty}</p>
                                            </div>
                                            <div className="bg-white/50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">Recording</p>
                                                <p className="font-bold text-gray-900">Required</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <CheckCircle className="w-6 h-6 text-emerald-900" />
                                            <h3 className="font-semibold text-gray-900">What you'll be assessed on</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                Technical knowledge (MCQ questions)
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                Problem-solving abilities (Coding challenges)
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                Communication skills (Subjective answers)
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                Code quality and efficiency
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <AlertCircle className="w-6 h-6 text-amber-900" />
                                            <h3 className="font-semibold text-gray-900">Important Notes</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                                                Ensure stable internet connection throughout the interview
                                            </li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                                                Use a quiet environment with good lighting
                                            </li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                                                Keep your webcam and microphone enabled
                                            </li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                                                Do not refresh or navigate away during the interview
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                            >
                                <h3 className="font-bold text-gray-900 mb-4">Question Types</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                        <MessageSquare className="w-5 h-5 text-blue-900" />
                                        <div>
                                            <p className="font-medium text-gray-900">Multiple Choice</p>
                                            <p className="text-xs text-gray-500">Test theoretical knowledge</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                        <Code className="w-5 h-5 text-purple-900" />
                                        <div>
                                            <p className="font-medium text-gray-900">Coding Challenges</p>
                                            <p className="text-xs text-gray-500">Practical problem solving</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                                        <Brain className="w-5 h-5 text-emerald-900" />
                                        <div>
                                            <p className="font-medium text-gray-900">Subjective Questions</p>
                                            <p className="text-xs text-gray-500">Communication assessment</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 text-white shadow-lg"
                            >
                                <h3 className="font-bold text-xl mb-4">Ready to begin?</h3>
                                <p className="text-blue-100 mb-6">
                                    Click start when you're ready. You'll have {selectedLevel?.duration} minutes to complete all questions.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleStartInterview}
                                    className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Play className="w-5 h-5" />
                                    Start Interview
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (interviewState === 'completed') {
        const score = calculateScore();
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg"
                    >
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Completed!</h1>
                            <div className="flex items-center justify-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedLevel?.difficultyColor}`}>
                                    {selectedLevel?.name} Level
                                </span>
                                <span className="text-gray-600">• {selectedLevel?.duration} minutes</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="text-center mb-8">
                                <div className={`text-6xl font-bold ${score >= 80 ? 'text-emerald-600' :
                                        score >= 60 ? 'text-amber-600' : 'text-red-600'
                                    }`}>
                                    {score}/100
                                </div>
                                <p className="text-gray-600 mt-2">Overall Score</p>
                                <div className="mt-4">
                                    <span className={`px-4 py-2 rounded-full text-lg font-semibold ${score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                            score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {score >= 80 ? 'Excellent Performance!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                                    <div className="text-3xl font-bold text-blue-900 mb-2">{questions.length}</div>
                                    <p className="text-gray-600">Total Questions</p>
                                </div>
                                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                                    <div className="text-3xl font-bold text-emerald-900 mb-2">{formatTime(selectedLevel?.duration * 60 - timeRemaining)}</div>
                                    <p className="text-gray-600">Time Taken</p>
                                </div>
                                <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                                    <div className="text-3xl font-bold text-purple-900 mb-2">
                                        {Object.keys(answers).length}/{questions.length}
                                    </div>
                                    <p className="text-gray-600">Questions Answered</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg"
                            >
                                View Dashboard
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setInterviewState('levelSelect')}
                                className="flex-1 py-4 border-2 border-blue-900 text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all"
                            >
                                Take Another Interview
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Exit Confirmation Modal
    if (showExitConfirm) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 max-w-md w-full"
                >
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Exit Interview?</h3>
                        <p className="text-gray-600">
                            Your progress will be saved partially. Are you sure you want to leave the interview?
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowExitConfirm(false)}
                            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Continue Interview
                        </button>
                        <button
                            onClick={confirmExit}
                            className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                        >
                            Exit Anyway
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900">{selectedLevel?.name} Level AI Interview</h1>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>Time remaining: {formatTime(timeRemaining)}</span>
                                    <span className="mx-2">•</span>
                                    <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleVideo}
                                    className={`p-2 rounded-lg ${isVideoOn ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={toggleAudio}
                                    className={`p-2 rounded-lg ${isAudioOn ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={toggleRecording}
                                    className={`p-2 rounded-lg ${isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    {isRecording ? <Square className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="h-6 w-px bg-gray-300"></div>

                            <button
                                onClick={handleExitInterview}
                                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Exit Interview
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 p-6">
                {/* Question Panel */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
                                        Q{currentQuestionIndex + 1}/{questions.length}
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentQuestion?.type === 'mcq' ? 'bg-purple-100 text-purple-900' :
                                            currentQuestion?.type === 'coding' ? 'bg-amber-100 text-amber-900' :
                                                'bg-emerald-100 text-emerald-900'
                                        }`}>
                                        {currentQuestion?.type?.charAt(0).toUpperCase() + currentQuestion?.type?.slice(1)}
                                    </div>
                                    <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                        {currentQuestion?.timeLimit}s
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{currentQuestion?.question}</h2>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-900">{currentQuestion?.points} pts</div>
                                <div className="text-sm text-gray-600">Points</div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {currentQuestion?.type === 'mcq' && (
                                <motion.div
                                    key="mcq"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-3"
                                >
                                    {currentQuestion?.options?.map((option, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAnswerChange(currentQuestion.id, option)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all ${answers[currentQuestion.id] === option
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${answers[currentQuestion.id] === option
                                                        ? 'border-blue-500 bg-blue-500'
                                                        : 'border-gray-300'
                                                    }`}>
                                                    {answers[currentQuestion.id] === option && (
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-900">{option}</span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}

                            {currentQuestion?.type === 'subjective' && (
                                <motion.div
                                    key="subjective"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <textarea
                                        value={answers[currentQuestion.id] || ''}
                                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                        placeholder="Type your answer here..."
                                        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                                    />
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="text-sm text-gray-500">
                                            Minimum {currentQuestion.minWords || 0} words
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {answers[currentQuestion.id]?.split(/\s+/).filter(word => word.length > 0).length || 0} words
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentQuestion?.type === 'coding' && (
                                <motion.div
                                    key="coding"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className="mb-4 p-4 bg-gray-900 rounded-lg">
                                        <pre className="text-gray-300 text-sm">
                                            {currentQuestion.starterCode}
                                        </pre>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Code className="w-5 h-5 text-blue-900" />
                                            <h4 className="font-semibold text-gray-900">Write your solution:</h4>
                                        </div>
                                        <textarea
                                            value={answers[currentQuestion.id] || currentQuestion.starterCode}
                                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                            className="w-full h-48 p-4 border border-gray-300 rounded-xl font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                                            spellCheck="false"
                                        />
                                    </div>

                                    {currentQuestion.testCases && (
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <h4 className="font-semibold text-gray-900 mb-2">Test Cases:</h4>
                                            <div className="space-y-2">
                                                {currentQuestion.testCases.map((testCase, index) => (
                                                    <div key={index} className="text-sm">
                                                        <span className="text-gray-600">Input: </span>
                                                        <code className="bg-gray-100 px-2 py-1 rounded">{testCase.input}</code>
                                                        <span className="text-gray-600 ml-3">Output: </span>
                                                        <code className="bg-gray-100 px-2 py-1 rounded">{testCase.output}</code>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${currentQuestionIndex === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                            Previous
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    if (currentQuestion?.id) {
                                        handleAnswerChange(currentQuestion.id, '');
                                    }
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Clear Answer
                            </button>

                            {currentQuestionIndex === questions.length - 1 ? (
                                <button
                                    onClick={handleSubmitInterview}
                                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Submit Interview
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    Next Question
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Video Preview */}
                    <div className="bg-gray-900 rounded-xl overflow-hidden relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-48 object-cover"
                        />
                        {!isVideoOn && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <VideoOff className="w-12 h-12 text-white/50" />
                            </div>
                        )}
                        {isRecording && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-sm font-medium">Recording</span>
                                <span className="text-white text-sm font-mono">{formatTime(recordingTime)}</span>
                            </div>
                        )}
                    </div>

                    {/* Question Progress */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900">Questions Progress</h3>
                            <span className="text-sm text-gray-600">
                                {Object.keys(answers).length}/{questions.length} answered
                            </span>
                        </div>
                        <div className="space-y-2">
                            {questions.map((q, index) => (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${currentQuestionIndex === index
                                            ? 'bg-blue-50 border-2 border-blue-500'
                                            : answers[q.id]
                                                ? 'bg-emerald-50 border border-emerald-200'
                                                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentQuestionIndex === index
                                                ? 'bg-blue-100 text-blue-900 font-bold'
                                                : answers[q.id]
                                                    ? 'bg-emerald-100 text-emerald-900'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-gray-900">
                                                {q.type?.charAt(0).toUpperCase() + q.type?.slice(1)}
                                            </p>
                                            <p className="text-xs text-gray-500">{q.timeLimit}s</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${answers[q.id] ? 'bg-emerald-500' : 'bg-gray-300'
                                            }`}></div>
                                        <span className="text-xs font-semibold text-blue-900">{q.points} pts</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Timer & Level Info */}
                    <div className={`rounded-xl p-5 text-white shadow-lg bg-gradient-to-br ${selectedLevel?.color}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <h3 className="font-bold">Time Remaining</h3>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">{formatTime(timeRemaining)}</div>
                                <p className="text-white/80 text-sm">Total: {selectedLevel?.duration}:00</p>
                            </div>
                        </div>
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-white transition-all duration-1000"
                                style={{ width: `${(timeRemaining / (selectedLevel?.duration * 60)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                                {selectedLevel?.icon && (() => {
                                    const IconComponent = selectedLevel.icon;
                                    return <IconComponent className="w-6 h-6 text-white" />;
                                })()}                <span>{selectedLevel?.name}</span>
                            </div>
                            <span className="bg-white/20 px-2 py-1 rounded text-xs">
                                {selectedLevel?.difficulty}
                            </span>
                        </div>
                    </div>

                    {/* Quick Submit */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
                        <div className="space-y-2">
                            <button
                                onClick={handleSubmitInterview}
                                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Submit Interview Now
                            </button>
                            <button
                                onClick={handleExitInterview}
                                className="w-full py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
                            >
                                Exit Interview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}