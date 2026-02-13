import React from "react";
import { motion } from "framer-motion";
import { Check, Lightbulb, Shield, Eye, Users, Target, Award, TrendingUp } from "lucide-react";
import Navbar from "../components/Home/Navbar";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">RecruitX360</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing recruitment with AI-powered solutions for modern businesses
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                To accelerate careers and transform hiring through intelligent, 
                human-centric technology that connects exceptional talent with 
                outstanding opportunities.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered candidate matching",
                  "Seamless interview scheduling",
                  "Data-driven hiring decisions",
                  "Diverse talent acquisition"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center mb-6">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become the world's most trusted recruitment ecosystem, 
                  where every career move is accelerated and every hire is a 
                  perfect match.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Companies" },
              { number: "50K+", label: "Candidates" },
              { number: "98%", label: "Satisfaction" },
              { number: "24/7", label: "Support" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
                title: "Innovation",
                description: "Constantly pushing boundaries to create better recruitment solutions"
              },
              {
                icon: <Users className="w-8 h-8 text-sky-500" />,
                title: "Human-Centric",
                description: "Putting people first in everything we build and do"
              },
              {
                icon: <Shield className="w-8 h-8 text-orange-500" />,
                title: "Trust",
                description: "Building reliable, transparent, and secure platforms"
              },
              {
                icon: <Eye className="w-8 h-8 text-purple-500" />,
                title: "Clarity",
                description: "Making recruitment processes clear and understandable"
              },
              {
                icon: <Award className="w-8 h-8 text-indigo-500" />,
                title: "Excellence",
                description: "Delivering the highest quality in every interaction"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-green-500" />,
                title: "Growth",
                description: "Fostering continuous improvement and development"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to transform your recruitment?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already using RecruitX360 to find their perfect candidates
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow-lg">
              Request a Demo
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}