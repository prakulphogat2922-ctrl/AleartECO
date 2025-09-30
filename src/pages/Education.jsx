import React, { useState } from 'react'
import { 
  BookOpen, 
  Play, 
  Award, 
  CheckCircle, 
  Clock,
  Star,
  Download,
  ExternalLink
} from 'lucide-react'

const Education = () => {
  const [userProgress, setUserProgress] = useState({
    totalPoints: 340,
    level: 'Climate Guardian',
    completedCourses: 3,
    currentStreak: 7
  })

  const [activeTab, setActiveTab] = useState('courses')

  const courses = [
    {
      id: 1,
      title: 'Climate Change Fundamentals',
      description: 'Understanding the science behind climate change, global warming, and greenhouse effects',
      duration: '45 min',
      level: 'Beginner',
      progress: 100,
      points: 50,
      completed: true,
      modules: 6,
      topics: ['Greenhouse Effect', 'Carbon Cycle', 'Global Temperature Trends', 'Climate vs Weather', 'IPCC Reports', 'Climate Tipping Points'],
      url: 'https://www.youtube.com/watch?v=G4H1N_yXBiA'
    },
    {
      id: 2,
      title: 'Heat Wave Safety & Preparedness',
      description: 'Essential skills for surviving extreme heat events and protecting vulnerable populations',
      duration: '1 hour',
      level: 'Beginner',
      progress: 80,
      points: 60,
      completed: false,
      modules: 5,
      topics: ['Heat Stress Recognition', 'Cooling Strategies', 'Emergency Hydration', 'Vulnerable Groups Protection', 'Heat Index Understanding'],
      url: 'https://www.youtube.com/watch?v=5ZTM8RrSMeE'
    },
    {
      id: 3,
      title: 'Flood Response & Water Safety',
      description: 'Comprehensive guide to flood preparedness, response, and recovery protocols',
      duration: '1.5 hours',
      level: 'Intermediate',
      progress: 60,
      points: 75,
      completed: false,
      modules: 8,
      topics: ['Flood Risk Assessment', 'Evacuation Planning', 'Water Contamination', 'Emergency Equipment', 'Insurance Claims', 'Recovery Planning', 'Sandbagging Techniques', 'Swift Water Safety'],
      url: 'https://www.youtube.com/watch?v=7gCaJNT0X4Q'
    },
    {
      id: 4,
      title: 'Wildfire Evacuation & Defense',
      description: 'Critical skills for wildfire preparedness, evacuation procedures, and property defense',
      duration: '2 hours',
      level: 'Intermediate',
      progress: 25,
      points: 85,
      completed: false,
      modules: 9,
      topics: ['Fire Behavior', 'Defensible Space', 'Evacuation Routes', 'Go-Bag Preparation', 'Ember Protection', 'Air Quality Monitoring', 'Animal Evacuation', 'Insurance Documentation', 'Recovery Resources'],
      url: 'https://www.youtube.com/watch?v=xaYqURmlWEU'
    },
    {
      id: 5,
      title: 'Severe Weather Preparedness',
      description: 'Preparing for hurricanes, tornadoes, severe storms, and extreme weather events',
      duration: '1.5 hours',
      level: 'Intermediate',
      progress: 0,
      points: 80,
      completed: false,
      modules: 7,
      topics: ['Storm Tracking', 'Shelter Preparation', 'Wind Damage Prevention', 'Power Outage Planning', 'Emergency Communications', 'Debris Safety', 'Post-Storm Assessment'],
      url: 'https://www.youtube.com/watch?v=Sz_1tkcU0Co'
    },
    {
      id: 6,
      title: 'Community Emergency Response Team (CERT)',
      description: 'Advanced training for organizing and leading community disaster response efforts',
      duration: '3 hours',
      level: 'Advanced',
      progress: 0,
      points: 120,
      completed: false,
      modules: 12,
      topics: ['Incident Command System', 'Search & Rescue Basics', 'Medical Triage', 'Fire Suppression', 'Team Organization', 'Resource Management', 'Communication Protocols', 'Psychological First Aid', 'Damage Assessment', 'Evacuation Coordination', 'Supply Distribution', 'Recovery Planning'],
      url: 'https://www.youtube.com/watch?v=2Q5z8p8yzgE'
    },
    {
      id: 7,
      title: 'Climate Adaptation Strategies',
      description: 'Long-term strategies for adapting homes, communities, and lifestyles to climate change',
      duration: '2.5 hours',
      level: 'Advanced',
      progress: 0,
      points: 100,
      completed: false,
      modules: 10,
      topics: ['Home Weatherization', 'Sustainable Energy', 'Water Conservation', 'Food Security', 'Green Infrastructure', 'Resilient Landscaping', 'Carbon Footprint Reduction', 'Climate Finance', 'Policy Advocacy', 'Community Planning'],
      url: 'https://www.youtube.com/watch?v=w_TgaB2rBDU'
    },
    {
      id: 8,
      title: 'Mental Health & Crisis Support',
      description: 'Understanding and addressing the psychological impacts of climate emergencies',
      duration: '1.5 hours',
      level: 'Intermediate',
      progress: 0,
      points: 70,
      completed: false,
      modules: 6,
      topics: ['Climate Anxiety', 'Trauma Response', 'Stress Management', 'Support Networks', 'Resilience Building', 'Professional Resources'],
      url: 'https://www.youtube.com/watch?v=dohXti-WtEI'
    },
    {
      id: 9,
      title: 'Emergency Communications',
      description: 'Essential communication methods and protocols during climate emergencies',
      duration: '1 hour',
      level: 'Beginner',
      progress: 0,
      points: 55,
      completed: false,
      modules: 5,
      topics: ['Emergency Radio', 'Cell Tower Backup', 'Satellite Communication', 'Alert Systems', 'Family Communication Plans'],
      url: 'https://www.youtube.com/watch?v=1mBB8SEOQxY'
    },
    {
      id: 10,
      title: 'First Aid for Climate Emergencies',
      description: 'Specialized first aid techniques for heat-related, flood, and weather-related injuries',
      duration: '2 hours',
      level: 'Intermediate',
      progress: 0,
      points: 90,
      completed: false,
      modules: 8,
      topics: ['Heat Exhaustion Treatment', 'Hypothermia Care', 'Wound Care in Emergencies', 'CPR & AED', 'Shock Management', 'Burn Treatment', 'Fracture Stabilization', 'Emergency Medications'],
      url: 'https://www.youtube.com/watch?v=iRNsU-w8QrU'
    }
  ]

  const quizzes = [
    {
      id: 1,
      title: 'Heat Wave Safety Quiz',
      questions: 10,
      timeLimit: '5 min',
      points: 25,
      difficulty: 'Easy',
      completed: true,
      score: 8,
      description: 'Test your knowledge of heat safety protocols and prevention strategies',
      url: 'https://www.cdc.gov/disasters/extremeheat/quiz.html'
    },
    {
      id: 2,
      title: 'Flood Response Knowledge Test',
      questions: 15,
      timeLimit: '10 min',
      points: 40,
      difficulty: 'Medium',
      completed: false,
      score: null,
      description: 'Comprehensive assessment of flood preparedness and response procedures',
      url: 'https://www.ready.gov/floods'
    },
    {
      id: 3,
      title: 'Wildfire Preparedness Challenge',
      questions: 20,
      timeLimit: '15 min',
      points: 60,
      difficulty: 'Hard',
      completed: false,
      score: null,
      description: 'Advanced scenarios testing wildfire evacuation and defense strategies',
      url: 'https://www.nfpa.org/Public-Education/Fire-causes-and-risks/Wildfire/Firewise-USA'
    },
    {
      id: 4,
      title: 'Climate Science Fundamentals',
      questions: 12,
      timeLimit: '8 min',
      points: 30,
      difficulty: 'Easy',
      completed: true,
      score: 11,
      description: 'Basic understanding of climate change science and impacts',
      url: 'https://climate.nasa.gov/quiz/'
    },
    {
      id: 5,
      title: 'Emergency Communications Quiz',
      questions: 8,
      timeLimit: '6 min',
      points: 20,
      difficulty: 'Easy',
      completed: false,
      score: null,
      description: 'Essential communication methods during emergencies',
      url: 'https://www.ready.gov/make-a-plan'
    },
    {
      id: 6,
      title: 'Severe Weather Response',
      questions: 18,
      timeLimit: '12 min',
      points: 45,
      difficulty: 'Medium',
      completed: false,
      score: null,
      description: 'Multi-hazard approach to severe weather preparedness',
      url: 'https://www.weather.gov/safety/'
    },
    {
      id: 7,
      title: 'Community Response Coordination',
      questions: 25,
      timeLimit: '20 min',
      points: 75,
      difficulty: 'Hard',
      completed: false,
      score: null,
      description: 'Advanced leadership and coordination in emergency situations',
      url: 'https://www.ready.gov/community-emergency-response-team'
    },
    {
      id: 8,
      title: 'First Aid Scenarios',
      questions: 16,
      timeLimit: '10 min',
      points: 50,
      difficulty: 'Medium',
      completed: false,
      score: null,
      description: 'Practical first aid applications in climate emergency contexts',
      url: 'https://www.redcross.org/take-a-class/first-aid/first-aid-steps'
    }
  ]

  const resources = [
    {
      id: 1,
      title: 'Emergency Kit Checklist',
      type: 'PDF Download',
      description: 'Complete checklist for building your emergency preparedness kit with seasonal considerations',
      size: '2.3 MB',
      category: 'Preparedness',
      url: 'https://www.ready.gov/sites/default/files/2021-03/ready_checklist.pdf'
    },
    {
      id: 2,
      title: 'Climate Action Guide',
      type: 'Interactive Guide',
      description: 'Step-by-step guide to reducing your carbon footprint and building resilience',
      size: 'Web Resource',
      category: 'Adaptation',
      url: 'https://www.epa.gov/climate-change/what-you-can-do-about-climate-change'
    },
    {
      id: 3,
      title: 'Local Climate Data Portal',
      type: 'Data Portal',
      description: 'Access historical and current climate data, projections, and risk maps for your region',
      size: 'External Link',
      category: 'Data & Monitoring',
      url: 'https://www.climate.gov/data'
    },
    {
      id: 4,
      title: 'Heat Wave Response Plan Template',
      type: 'PDF Download',
      description: 'Customizable family and community heat wave response plan template',
      size: '1.8 MB',
      category: 'Preparedness',
      url: 'https://www.cdc.gov/disasters/extremeheat/heat_guide.html'
    },
    {
      id: 5,
      title: 'Flood Risk Assessment Tool',
      type: 'Interactive Tool',
      description: 'Assess your property\'s flood risk and get personalized preparedness recommendations',
      size: 'Web Tool',
      category: 'Risk Assessment',
      url: 'https://www.floodsmart.gov/flood-map-service-center'
    },
    {
      id: 6,
      title: 'Wildfire Evacuation Checklist',
      type: 'PDF Download',
      description: 'Critical actions checklist for wildfire evacuation with timeline guidance',
      size: '1.2 MB',
      category: 'Preparedness',
      url: 'https://www.ready.gov/sites/default/files/2020-03/wildfire-evacuation-checklist.pdf'
    },
    {
      id: 7,
      title: 'Community Resource Directory',
      type: 'Database',
      description: 'Searchable directory of local emergency services, shelters, and support organizations',
      size: 'Web Database',
      category: 'Community Resources',
      url: 'https://www.ready.gov/community-emergency-response-team'
    },
    {
      id: 8,
      title: 'Climate Emergency Alert Systems',
      type: 'Guide',
      description: 'How to sign up for and interpret various emergency alert systems in your area',
      size: 'Web Guide',
      category: 'Communication',
      url: 'https://www.weather.gov/wrn/wea'
    },
    {
      id: 9,
      title: 'Mental Health Resources',
      type: 'Resource List',
      description: 'Comprehensive list of mental health support resources for climate anxiety and trauma',
      size: 'Web Resource',
      category: 'Mental Health',
      url: 'https://www.apa.org/science/about/publications/climate-change'
    },
    {
      id: 10,
      title: 'Insurance and Recovery Guide',
      type: 'PDF Download',
      description: 'Navigate insurance claims and recovery processes after climate-related disasters',
      size: '3.1 MB',
      category: 'Recovery',
      url: 'https://www.fema.gov/individual-disaster-assistance'
    },
    {
      id: 11,
      title: 'Home Weatherization Manual',
      type: 'PDF Download',
      description: 'Comprehensive guide to making your home more resilient to extreme weather',
      size: '4.5 MB',
      category: 'Adaptation',
      url: 'https://www.energy.gov/energysaver/weatherize-your-home'
    },
    {
      id: 12,
      title: 'Emergency Communication Card',
      type: 'Printable Card',
      description: 'Wallet-sized emergency contact and information card template',
      size: '500 KB',
      category: 'Communication',
      url: 'https://www.ready.gov/sites/default/files/2019-06/ready_wallet-card.pdf'
    }
  ]

  const achievements = [
    { name: 'First Steps', description: 'Completed your first course', unlocked: true, icon: '🎯' },
    { name: 'Knowledge Seeker', description: 'Completed 3 courses', unlocked: true, icon: '📚' },
    { name: 'Climate Scholar', description: 'Completed 5 courses', unlocked: false, icon: '🌍' },
    { name: 'Quiz Master', description: 'Scored 100% on a quiz', unlocked: false, icon: '🏆' },
    { name: 'Perfect Score', description: 'Scored 100% on 3 different quizzes', unlocked: false, icon: '⭐' },
    { name: 'Streak Champion', description: 'Maintained a 7-day learning streak', unlocked: true, icon: '🔥' },
    { name: 'Marathon Learner', description: 'Maintained a 30-day learning streak', unlocked: false, icon: '🏃' },
    { name: 'Emergency Expert', description: 'Completed all emergency preparedness courses', unlocked: false, icon: '🚨' },
    { name: 'Community Helper', description: 'Shared knowledge with 10 people', unlocked: false, icon: '🤝' },
    { name: 'Climate Champion', description: 'Completed the Climate Adaptation Strategies course', unlocked: false, icon: '🌱' },
    { name: 'First Responder', description: 'Completed CERT and First Aid courses', unlocked: false, icon: '🚑' },
    { name: 'Resource Collector', description: 'Downloaded 5 educational resources', unlocked: false, icon: '📋' },
    { name: 'Points Master', description: 'Earned 500 total points', unlocked: false, icon: '💎' },
    { name: 'Learning Machine', description: 'Completed 10 courses', unlocked: false, icon: '🎓' }
  ]

  const handleStartCourse = (courseId) => {
    console.log('Course button clicked:', courseId)
    const course = courses.find(c => c.id === courseId)
    console.log('Found course:', course)
    
    if (course && course.url) {
      try {
        console.log('Opening URL directly:', course.url)
        // Open the course URL directly in the same tab
        window.location.href = course.url
      } catch (error) {
        console.error('Error opening course URL:', error)
        alert(`Error opening course. Please check your browser settings.`)
      }
    } else {
      console.log('No URL found for course:', course?.title)
      alert(`Course content coming soon for: ${course?.title || 'Unknown Course'}`)
    }
  }

  const handleTakeQuiz = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId)
    if (quiz && quiz.url) {
      // Open the quiz URL in a new tab
      window.open(quiz.url, '_blank', 'noopener,noreferrer')
      console.log(`Starting quiz: ${quiz.title}`)
    } else {
      alert(`Quiz coming soon for: ${quiz?.title || 'Unknown Quiz'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Center</h1>
          <p className="text-gray-600">
            Expand your knowledge about climate change, emergency preparedness, and community response
          </p>
        </div>

        {/* Progress Dashboard */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{userProgress.totalPoints}</div>
              <div className="text-gray-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{userProgress.completedCourses}</div>
              <div className="text-gray-600">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{userProgress.currentStreak}</div>
              <div className="text-gray-600">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary-600 mb-2">{userProgress.level}</div>
              <div className="text-gray-600">Current Level</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'courses', name: 'Courses', icon: BookOpen },
                { id: 'quizzes', name: 'Quizzes', icon: Award },
                { id: 'resources', name: 'Resources', icon: Download },
                { id: 'achievements', name: 'Achievements', icon: Star }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level}
                    </span>
                    {course.completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div>{course.modules} modules</div>
                  </div>

                  {/* Course Topics */}
                  {course.topics && (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                        {course.topics.length > 3 && (
                          <span className="text-xs text-gray-500">+{course.topics.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${course.progress}%`}}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                    <span className="text-sm font-medium text-primary-600">{course.points} points</span>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Button clicked for course:', course.id)
                      handleStartCourse(course.id)
                    }}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                      course.completed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{course.completed ? 'Review Course' : course.progress > 0 ? 'Continue' : 'Start Course'}</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {quiz.difficulty}
                  </span>
                  {quiz.completed && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{quiz.score}/{quiz.questions}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{quiz.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-medium">{quiz.timeLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-medium text-primary-600">{quiz.points}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleTakeQuiz(quiz.id)}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    quiz.completed
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {quiz.completed ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        resource.category === 'Preparedness' ? 'bg-blue-100 text-blue-700' :
                        resource.category === 'Adaptation' ? 'bg-green-100 text-green-700' :
                        resource.category === 'Risk Assessment' ? 'bg-orange-100 text-orange-700' :
                        resource.category === 'Community Resources' ? 'bg-purple-100 text-purple-700' :
                        resource.category === 'Communication' ? 'bg-indigo-100 text-indigo-700' :
                        resource.category === 'Mental Health' ? 'bg-pink-100 text-pink-700' :
                        resource.category === 'Recovery' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-medium">{resource.type}</span>
                      <span>•</span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                    className="btn-primary flex items-center space-x-2 ml-4 hover:bg-primary-700 transition-colors"
                  >
                    {resource.type === 'PDF Download' || resource.type === 'Printable Card' ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    <span>
                      {resource.type === 'PDF Download' || resource.type === 'Printable Card' ? 'Download' : 'Access'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md p-6 transition-all ${
                  achievement.unlocked ? 'border-l-4 border-l-primary-500 hover:shadow-lg' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    achievement.unlocked ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.icon || <Award className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{achievement.description}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      achievement.unlocked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Education