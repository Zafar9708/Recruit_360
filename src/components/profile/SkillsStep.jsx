import { useState } from 'react';
import { Star, Plus, X } from 'lucide-react';

export default function SkillsStep({ data, updateData }) {
  // All skills from CV
  const allSkills = data.skills || [];

  // Skill categories with their options
  const skillCategories = {
    Database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'Redis', 'Elasticsearch', 'Cassandra', 'MariaDB', 'SQLite', 'Firebase'],
    Framework: ['React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', '.NET Core', 'Laravel', 'Ruby on Rails'],
    'Coding Language': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin'],
    Hosting: ['AWS', 'Azure', 'Google Cloud', 'Heroku', 'Netlify', 'Vercel', 'DigitalOcean', 'Firebase Hosting', 'GitHub Pages'],
    Tools: ['Jira', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'Docker', 'Kubernetes', 'VS Code', 'Postman', 'Figma', 'Slack']
  };

  // Primary skills (editable)
  const [primarySkills, setPrimarySkills] = useState(data.primarySkills || []);
  
  // State for selected category and skill
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showSkillOptions, setShowSkillOptions] = useState(false);

  // Additional skills (editable)
  const [additionalSkills, setAdditionalSkills] = useState(data.additionalSkills || []);
  const [newSkill, setNewSkill] = useState("");

  // Add a new primary skill
  const addPrimarySkill = () => {
    if (primarySkills.length < 5) {
      setSelectedCategory('');
      setSelectedSkill('');
      setShowSkillOptions(true);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSkill('');
  };

  const handleSkillSelect = (skillName) => {
    if (primarySkills.length < 5) {
      const updated = [...primarySkills, { name: skillName, rating: 3, category: selectedCategory }];
      setPrimarySkills(updated);
      updateData({ primarySkills: updated });
      setSelectedCategory('');
      setSelectedSkill('');
      setShowSkillOptions(false);
    }
  };

  const updatePrimarySkill = (index, field, value) => {
    const updated = [...primarySkills];
    updated[index] = { ...updated[index], [field]: value };
    setPrimarySkills(updated);
    updateData({ primarySkills: updated });
  };

  const removePrimarySkill = (index) => {
    const updated = primarySkills.filter((_, i) => i !== index);
    setPrimarySkills(updated);
    updateData({ primarySkills: updated });
  };

  // Additional skills handlers
  const addAdditionalSkill = () => {
    if (!newSkill.trim()) return;
    const updated = [...additionalSkills, newSkill.trim()];
    setAdditionalSkills(updated);
    updateData({ additionalSkills: updated });
    setNewSkill("");
  };

  const removeAdditionalSkill = (index) => {
    const updated = additionalSkills.filter((_, i) => i !== index);
    setAdditionalSkills(updated);
    updateData({ additionalSkills: updated });
  };

  return (
    <div className="space-y-6">
      {/* OVERALL SKILLS FROM CV */}
      {allSkills.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-semibold text-gray-700 mb-3">Overall Skills from CV</h4>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* PRIMARY SKILLS */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Primary Skills (up to 5)</h4>
        <div className="space-y-3">
          {primarySkills.map((skill, index) => (
            <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl">
              <div className="flex-1">
                <div className="text-xs text-blue-600 mb-1">{skill.category}</div>
                <input
                  value={skill.name}
                  onChange={(e) => updatePrimarySkill(index, "name", e.target.value)}
                  placeholder="Skill name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <Star
                    key={r}
                    className={`w-5 h-5 cursor-pointer transition ${
                      r <= skill.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-200"
                    }`}
                    onClick={() => updatePrimarySkill(index, "rating", r)}
                  />
                ))}
              </div>
              <button 
                onClick={() => removePrimarySkill(index)}
                className="p-1 hover:bg-red-50 rounded-full transition"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}

          {primarySkills.length < 5 && !showSkillOptions && (
            <button
              onClick={addPrimarySkill}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <Plus size={16} /> Add Primary Skill
            </button>
          )}

          {/* Category Selection Dropdown */}
          {showSkillOptions && (
            <div className="bg-gray-50 p-4 rounded-xl border border-blue-200">
              {!selectedCategory ? (
                <>
                  <p className="text-sm font-medium text-gray-700 mb-3">Select Skill Category:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.keys(skillCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 text-sm font-medium transition-all"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">
                      Select {selectedCategory} Skill:
                    </p>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      ← Back to Categories
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                    {skillCategories[selectedCategory].map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSkillSelect(skill)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 text-sm transition-all text-left"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {/* Cancel button */}
              <button
                onClick={() => {
                  setShowSkillOptions(false);
                  setSelectedCategory('');
                  setSelectedSkill('');
                }}
                className="mt-3 text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADDITIONAL SKILLS */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Additional Skills</h4>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyPress={(e) => e.key === 'Enter' && addAdditionalSkill()}
          />
          <button 
            onClick={addAdditionalSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {additionalSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full flex items-center gap-2 text-sm"
            >
              {skill}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500 transition"
                onClick={() => removeAdditionalSkill(index)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}