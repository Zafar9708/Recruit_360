import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Search, Download, Check, MapPin, Clock, Eye,
  List, Table as TableIcon, FilterIcon, ChevronDown,
  Star, Shield, Zap, UserCheck, UserX, XCircle, Award,
  Plus, CheckCircle, Building,
  UserCircle,
} from 'lucide-react';
import VendorSidebar from '../components/VendorSidebar';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   ALL CANDIDATES — 15 records
───────────────────────────────────────────────────────────── */
const ALL_CANDIDATES = [
  {
    id: 'c1', name: 'John Smith', title: 'Senior Java Developer',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
    experience: 8, location: 'San Francisco, CA', rate: '$95/hr',
    availability: 'Immediate', lastUpdated: '2024-12-20',
    status: 'Available', isVerified: true, isActive: true, rating: 4.8,
    email: 'john.smith@email.com', phone: '+1 (415) 555-0101',
    linkedin: 'linkedin.com/in/johnsmith', summary: 'Experienced Java developer with 8+ years building scalable microservices and cloud-native applications. Strong background in fintech and healthcare domains.',
    education: 'B.S. Computer Science, Stanford University',
    certifications: ['AWS Solutions Architect', 'Oracle Java SE 11'],
    totalProjects: 24, successRate: 96,
  },
  {
    id: 'c2', name: 'Emily Rodriguez', title: 'React Developer',
    skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL'],
    experience: 5, location: 'Austin, TX', rate: '$85/hr',
    availability: '2 weeks', lastUpdated: '2024-12-18',
    status: 'Available', isVerified: false, isActive: true, rating: 4.5,
    email: 'emily.r@email.com', phone: '+1 (512) 555-0202',
    linkedin: 'linkedin.com/in/emilyrodriguez', summary: 'Passionate frontend engineer specializing in React ecosystems. Delivered 15+ production applications across e-commerce and SaaS verticals.',
    education: 'B.S. Software Engineering, UT Austin',
    certifications: ['Meta Frontend Developer'],
    totalProjects: 15, successRate: 93,
  },
  {
    id: 'c3', name: 'Michael Chang', title: 'DevOps Engineer',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'AWS'],
    experience: 6, location: 'Seattle, WA', rate: '$90/hr',
    availability: 'Immediate', lastUpdated: '2024-12-15',
    status: 'In Process', isVerified: true, isActive: false, rating: 4.9,
    email: 'mchang@email.com', phone: '+1 (206) 555-0303',
    linkedin: 'linkedin.com/in/michaelchang', summary: 'DevOps specialist with deep expertise in Kubernetes and cloud infrastructure. Reduced deployment times by 70% at previous engagements.',
    education: 'M.S. Computer Engineering, UW Seattle',
    certifications: ['CKA', 'AWS DevOps Professional'],
    totalProjects: 18, successRate: 98,
  },
  {
    id: 'c4', name: 'Sarah Johnson', title: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'PyTorch'],
    experience: 7, location: 'Boston, MA', rate: '$100/hr',
    availability: '1 month', lastUpdated: '2024-12-12',
    status: 'Available', isVerified: true, isActive: true, rating: 4.7,
    email: 'sjohnson@email.com', phone: '+1 (617) 555-0404',
    linkedin: 'linkedin.com/in/sarahjohnson', summary: 'Data scientist with expertise in NLP and computer vision. Published 3 ML research papers and led AI transformation projects at Fortune 500 companies.',
    education: 'Ph.D. Data Science, MIT',
    certifications: ['Google Professional ML Engineer', 'TensorFlow Developer'],
    totalProjects: 21, successRate: 95,
  },
  {
    id: 'c5', name: 'David Kumar', title: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'PostgreSQL'],
    experience: 4, location: 'New York, NY', rate: '$80/hr',
    availability: 'Immediate', lastUpdated: '2024-12-10',
    status: 'Placed', isVerified: false, isActive: false, rating: 4.3,
    email: 'dkumar@email.com', phone: '+1 (212) 555-0505',
    linkedin: 'linkedin.com/in/davidkumar', summary: 'Full-stack developer comfortable across the entire MERN stack. Specializes in building performant web applications with great UX.',
    education: 'B.S. Information Technology, NYU',
    certifications: ['MongoDB Developer'],
    totalProjects: 12, successRate: 91,
  },
  {
    id: 'c6', name: 'Lisa Wang', title: 'Mobile Developer',
    skills: ['React Native', 'iOS', 'Android', 'Firebase', 'Swift'],
    experience: 5, location: 'Chicago, IL', rate: '$88/hr',
    availability: '3 weeks', lastUpdated: '2024-12-08',
    status: 'Available', isVerified: true, isActive: true, rating: 4.6,
    email: 'lwang@email.com', phone: '+1 (312) 555-0606',
    linkedin: 'linkedin.com/in/lisawang', summary: 'Cross-platform mobile developer with 5 apps in the App Store and Play Store. Expert in React Native performance optimization.',
    education: 'B.S. Computer Science, DePaul University',
    certifications: ['Apple Developer', 'Google Associate Android Developer'],
    totalProjects: 16, successRate: 94,
  },
  {
    id: 'c7', name: 'Robert Chen', title: 'Cloud Architect',
    skills: ['AWS', 'Azure', 'GCP', 'DevOps', 'Terraform'],
    experience: 10, location: 'Remote', rate: '$120/hr',
    availability: '1 week', lastUpdated: '2024-12-05',
    status: 'In Process', isVerified: true, isActive: true, rating: 4.9,
    email: 'rchen@email.com', phone: '+1 (650) 555-0707',
    linkedin: 'linkedin.com/in/robertchen', summary: 'Multi-cloud architect with 10 years designing highly available systems. Led cloud migrations for 30+ enterprise clients with zero downtime.',
    education: 'M.S. Computer Science, Carnegie Mellon',
    certifications: ['AWS Solutions Architect Pro', 'Azure Expert', 'GCP Professional'],
    totalProjects: 31, successRate: 99,
  },
  {
    id: 'c8', name: 'Jessica Martinez', title: 'UX Designer',
    skills: ['Figma', 'Sketch', 'UI/UX', 'Prototyping', 'User Research'],
    experience: 6, location: 'Los Angeles, CA', rate: '$92/hr',
    availability: 'Immediate', lastUpdated: '2024-12-03',
    status: 'Available', isVerified: false, isActive: true, rating: 4.4,
    email: 'jmartinez@email.com', phone: '+1 (310) 555-0808',
    linkedin: 'linkedin.com/in/jessicamartinez', summary: 'UX designer focused on data-driven design decisions. Increased conversion rates by 40% through user research and iterative design at multiple startups.',
    education: 'B.A. Interaction Design, Art Center College',
    certifications: ['Nielsen Norman UX'],
    totalProjects: 19, successRate: 92,
  },
  {
    id: 'c9', name: 'Kevin Patel', title: 'Android Developer',
    skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'MVVM', 'Firebase'],
    experience: 4, location: 'Atlanta, GA', rate: '$82/hr',
    availability: 'Immediate', lastUpdated: '2024-12-01',
    status: 'Available', isVerified: true, isActive: true, rating: 4.4,
    email: 'kpatel@email.com', phone: '+1 (404) 555-0909',
    linkedin: 'linkedin.com/in/kevinpatel', summary: 'Android specialist building modern apps with Jetpack Compose. 4 years of experience delivering consumer apps with 4.5+ star ratings.',
    education: 'B.S. Computer Science, Georgia Tech',
    certifications: ['Google Associate Android Developer'],
    totalProjects: 11, successRate: 90,
  },
  {
    id: 'c10', name: 'Priya Sharma', title: 'ML Engineer',
    skills: ['Python', 'PyTorch', 'Transformers', 'MLOps', 'LLMs'],
    experience: 5, location: 'San Jose, CA', rate: '$105/hr',
    availability: '2 weeks', lastUpdated: '2024-11-28',
    status: 'In Process', isVerified: true, isActive: true, rating: 4.8,
    email: 'psharma@email.com', phone: '+1 (408) 555-1010',
    linkedin: 'linkedin.com/in/priyasharma', summary: 'ML engineer specializing in LLM fine-tuning and deployment. Reduced inference latency by 60% using custom quantization techniques.',
    education: 'M.S. Artificial Intelligence, UC Berkeley',
    certifications: ['Deep Learning Specialization', 'HuggingFace Expert'],
    totalProjects: 14, successRate: 97,
  },
  {
    id: 'c11', name: 'Tom Harris', title: 'Salesforce Developer',
    skills: ['Salesforce', 'Apex', 'LWC', 'SOQL', 'Visualforce'],
    experience: 6, location: 'Denver, CO', rate: '$88/hr',
    availability: '1 month', lastUpdated: '2024-11-25',
    status: 'Available', isVerified: false, isActive: true, rating: 4.2,
    email: 'tharris@email.com', phone: '+1 (720) 555-1111',
    linkedin: 'linkedin.com/in/tomharris', summary: 'Salesforce developer with deep CRM customization experience. Implemented CPQ solutions saving clients $2M+ annually in operational costs.',
    education: 'B.S. Business Information Systems, CU Denver',
    certifications: ['Salesforce Platform Developer I', 'Salesforce Admin'],
    totalProjects: 17, successRate: 89,
  },
  {
    id: 'c12', name: 'Anita Desai', title: 'QA Automation Engineer',
    skills: ['Selenium', 'Cypress', 'Jest', 'Postman', 'CI/CD'],
    experience: 4, location: 'Phoenix, AZ', rate: '$72/hr',
    availability: 'Immediate', lastUpdated: '2024-11-22',
    status: 'Available', isVerified: true, isActive: false, rating: 4.5,
    email: 'adesai@email.com', phone: '+1 (602) 555-1212',
    linkedin: 'linkedin.com/in/anitadesai', summary: 'QA engineer passionate about shift-left testing. Built automation frameworks from scratch reducing regression time from 3 days to 4 hours.',
    education: 'B.S. Computer Science, Arizona State',
    certifications: ['ISTQB Advanced Level', 'Cypress Certified'],
    totalProjects: 13, successRate: 93,
  },
  {
    id: 'c13', name: 'Carlos Rivera', title: 'Backend Go Developer',
    skills: ['Go', 'gRPC', 'Microservices', 'Docker', 'Kubernetes'],
    experience: 5, location: 'Miami, FL', rate: '$95/hr',
    availability: '1 week', lastUpdated: '2024-11-20',
    status: 'Placed', isVerified: true, isActive: false, rating: 4.6,
    email: 'crivera@email.com', phone: '+1 (305) 555-1313',
    linkedin: 'linkedin.com/in/carlosrivera', summary: 'Go developer building high-throughput microservices. Designed APIs handling 100k+ RPS for real-time payment platforms.',
    education: 'B.S. Computer Engineering, FIU',
    certifications: ['CKAD', 'HashiCorp Vault'],
    totalProjects: 15, successRate: 95,
  },
  {
    id: 'c14', name: 'Nina Volkov', title: 'Data Engineer',
    skills: ['Spark', 'Kafka', 'Airflow', 'Python', 'Snowflake'],
    experience: 6, location: 'Seattle, WA', rate: '$98/hr',
    availability: '2 weeks', lastUpdated: '2024-11-18',
    status: 'Available', isVerified: false, isActive: true, rating: 4.3,
    email: 'nvolkov@email.com', phone: '+1 (206) 555-1414',
    linkedin: 'linkedin.com/in/ninavolkov', summary: 'Data pipeline engineer building petabyte-scale ETL systems. Reduced data processing costs by 45% through Spark optimization at a major e-commerce firm.',
    education: 'M.S. Data Engineering, University of Washington',
    certifications: ['Databricks Engineer', 'Snowflake SnowPro Core'],
    totalProjects: 18, successRate: 91,
  },
  {
    id: 'c15', name: 'Omar Farooq', title: 'Cybersecurity Analyst',
    skills: ['SIEM', 'Penetration Testing', 'SOC', 'CISSP', 'Incident Response'],
    experience: 7, location: 'Washington, DC', rate: '$102/hr',
    availability: 'Immediate', lastUpdated: '2024-11-15',
    status: 'In Process', isVerified: true, isActive: true, rating: 4.7,
    email: 'ofarooq@email.com', phone: '+1 (202) 555-1515',
    linkedin: 'linkedin.com/in/omarfarooq', summary: 'Cybersecurity analyst with government clearance. Led SOC operations protecting critical infrastructure and managing zero-day incident responses.',
    education: 'M.S. Cybersecurity, George Washington University',
    certifications: ['CISSP', 'CEH', 'CompTIA Security+'],
    totalProjects: 22, successRate: 97,
  },
];

/* ─────────────────────────────────────────────────────────────
   SHORTLISTED CANDIDATES — 15 records (with client who shortlisted)
───────────────────────────────────────────────────────────── */
const SHORTLISTED_CANDIDATES = [
  {
    id: 's1', name: 'Arjun Mehta', title: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    experience: 4, location: 'Remote', rate: '$78/hr',
    availability: 'Immediate', lastUpdated: '2024-12-19',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.6,
    shortlistedBy: 'Tech Solutions Inc.', shortlistedDate: 'Dec 18, 2024', jobTitle: 'Full Stack Engineer',
    email: 'arjun.mehta@email.com', phone: '+91 98200 11001',
    linkedin: 'linkedin.com/in/arjunmehta', summary: 'Full-stack developer with expertise in modern JS frameworks and cloud-native architectures.',
    education: 'B.E. Computer Science, IIT Bombay',
    certifications: ['AWS Cloud Practitioner'],
    totalProjects: 10, successRate: 93,
  },
  {
    id: 's2', name: 'Priya Sharma', title: 'Python Backend Developer',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis'],
    experience: 5, location: 'Bengaluru, India', rate: '$82/hr',
    availability: '2 weeks', lastUpdated: '2024-12-17',
    status: 'Shortlisted', isVerified: false, isActive: true, rating: 4.4,
    shortlistedBy: 'Digital Ventures', shortlistedDate: 'Dec 16, 2024', jobTitle: 'Senior Python Engineer',
    email: 'priya.sharma@email.com', phone: '+91 98200 11002',
    linkedin: 'linkedin.com/in/priyasharma', summary: 'Backend engineer specializing in high-performance Python APIs and database optimization.',
    education: 'B.Tech Software Engineering, NIT Trichy',
    certifications: ['Django Certified Developer'],
    totalProjects: 13, successRate: 91,
  },
  {
    id: 's3', name: 'Rohan Verma', title: 'Cloud Infrastructure Engineer',
    skills: ['AWS', 'Terraform', 'Ansible', 'Linux', 'Networking'],
    experience: 7, location: 'Hyderabad, India', rate: '$98/hr',
    availability: 'Immediate', lastUpdated: '2024-12-14',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.8,
    shortlistedBy: 'Cloud Systems Corp', shortlistedDate: 'Dec 13, 2024', jobTitle: 'Cloud Infrastructure Lead',
    email: 'rohan.verma@email.com', phone: '+91 98200 11003',
    linkedin: 'linkedin.com/in/rohanverma', summary: 'Infrastructure engineer with 7 years automating cloud environments using IaC best practices.',
    education: 'B.Tech Computer Engineering, BITS Pilani',
    certifications: ['AWS SysOps Admin', 'HashiCorp Terraform'],
    totalProjects: 20, successRate: 96,
  },
  {
    id: 's4', name: 'Meera Nair', title: 'Data Engineer',
    skills: ['Spark', 'Kafka', 'Airflow', 'Python', 'Snowflake'],
    experience: 5, location: 'Pune, India', rate: '$92/hr',
    availability: '1 month', lastUpdated: '2024-12-11',
    status: 'Shortlisted', isVerified: true, isActive: false, rating: 4.5,
    shortlistedBy: 'Analytics Pro', shortlistedDate: 'Dec 10, 2024', jobTitle: 'Senior Data Engineer',
    email: 'meera.nair@email.com', phone: '+91 98200 11004',
    linkedin: 'linkedin.com/in/meeranair', summary: 'Data pipeline specialist focused on real-time streaming architectures using Kafka and Spark.',
    education: 'M.Tech Data Science, IIT Madras',
    certifications: ['Databricks Spark Developer'],
    totalProjects: 14, successRate: 92,
  },
  {
    id: 's5', name: 'Karan Patel', title: 'Angular Developer',
    skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'REST APIs'],
    experience: 4, location: 'Ahmedabad, India', rate: '$80/hr',
    availability: 'Immediate', lastUpdated: '2024-12-09',
    status: 'Shortlisted', isVerified: false, isActive: false, rating: 4.2,
    shortlistedBy: 'Innovate Labs', shortlistedDate: 'Dec 08, 2024', jobTitle: 'Frontend Angular Developer',
    email: 'karan.patel@email.com', phone: '+91 98200 11005',
    linkedin: 'linkedin.com/in/karanpatel', summary: 'Angular developer with strong RxJS and state management patterns. Delivered complex enterprise dashboards.',
    education: 'B.E. Computer Science, Nirma University',
    certifications: ['Angular Certified Developer'],
    totalProjects: 11, successRate: 89,
  },
  {
    id: 's6', name: 'Ananya Krishnan', title: 'iOS Developer',
    skills: ['Swift', 'Xcode', 'UIKit', 'SwiftUI', 'CoreData'],
    experience: 5, location: 'Chennai, India', rate: '$88/hr',
    availability: '3 weeks', lastUpdated: '2024-12-06',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.7,
    shortlistedBy: 'MobileFirst Co.', shortlistedDate: 'Dec 05, 2024', jobTitle: 'Senior iOS Engineer',
    email: 'ananya.krishnan@email.com', phone: '+91 98200 11006',
    linkedin: 'linkedin.com/in/ananyakrishnan', summary: 'iOS engineer with 5 published apps and expertise in SwiftUI transitions and CoreData sync.',
    education: 'B.Tech Computer Science, Anna University',
    certifications: ['Apple Certified Developer'],
    totalProjects: 16, successRate: 95,
  },
  {
    id: 's7', name: 'Rajesh Kumar', title: 'Site Reliability Engineer',
    skills: ['SRE', 'Prometheus', 'Grafana', 'Kubernetes', 'Python'],
    experience: 8, location: 'Bengaluru, India', rate: '$110/hr',
    availability: '1 week', lastUpdated: '2024-12-04',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.9,
    shortlistedBy: 'Enterprise Corp', shortlistedDate: 'Dec 03, 2024', jobTitle: 'Lead SRE',
    email: 'rajesh.kumar@email.com', phone: '+91 98200 11007',
    linkedin: 'linkedin.com/in/rajeshkumar', summary: 'SRE with 8 years maintaining 99.99% uptime SLAs at scale. Designed on-call rotation and incident management playbooks.',
    education: 'M.Tech Systems Engineering, IIT Delhi',
    certifications: ['CKA', 'Google SRE Fundamentals'],
    totalProjects: 25, successRate: 99,
  },
  {
    id: 's8', name: 'Sneha Iyer', title: 'UX Researcher',
    skills: ['User Research', 'Figma', 'Usability Testing', 'Miro', 'Prototyping'],
    experience: 5, location: 'Mumbai, India', rate: '$85/hr',
    availability: 'Immediate', lastUpdated: '2024-12-02',
    status: 'Shortlisted', isVerified: false, isActive: true, rating: 4.3,
    shortlistedBy: 'Creative Agency', shortlistedDate: 'Dec 01, 2024', jobTitle: 'UX Researcher',
    email: 'sneha.iyer@email.com', phone: '+91 98200 11008',
    linkedin: 'linkedin.com/in/snehaiyer', summary: 'UX researcher combining qualitative and quantitative methods to drive product decisions at consumer tech firms.',
    education: 'M.Des Human-Computer Interaction, IDC IIT Bombay',
    certifications: ['Nielsen Norman UX Research'],
    totalProjects: 14, successRate: 90,
  },
  {
    id: 's9', name: 'Amit Desai', title: 'Network Engineer',
    skills: ['Cisco', 'BGP', 'OSPF', 'Firewalls', 'SD-WAN'],
    experience: 6, location: 'Pune, India', rate: '$86/hr',
    availability: '2 weeks', lastUpdated: '2024-11-29',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.5,
    shortlistedBy: 'SecureIT Solutions', shortlistedDate: 'Nov 28, 2024', jobTitle: 'Network Infrastructure Engineer',
    email: 'amit.desai@email.com', phone: '+91 98200 11009',
    linkedin: 'linkedin.com/in/amitdesai', summary: 'Network engineer designing and managing enterprise-grade WAN and LAN environments for Fortune 500 clients.',
    education: 'B.Tech Electronics, Pune University',
    certifications: ['CCNP', 'Cisco SD-WAN Specialist'],
    totalProjects: 17, successRate: 94,
  },
  {
    id: 's10', name: 'Neha Gupta', title: 'Tableau Developer',
    skills: ['Tableau', 'Power BI', 'SQL', 'Data Visualization', 'Excel'],
    experience: 4, location: 'New Delhi, India', rate: '$74/hr',
    availability: 'Immediate', lastUpdated: '2024-11-27',
    status: 'Shortlisted', isVerified: false, isActive: true, rating: 4.1,
    shortlistedBy: 'Analytics Pro', shortlistedDate: 'Nov 26, 2024', jobTitle: 'BI Developer',
    email: 'neha.gupta@email.com', phone: '+91 98200 11010',
    linkedin: 'linkedin.com/in/nehagupta', summary: 'BI developer transforming complex datasets into compelling executive dashboards and self-service analytics tools.',
    education: 'B.Sc Information Systems, Delhi University',
    certifications: ['Tableau Desktop Specialist'],
    totalProjects: 12, successRate: 88,
  },
  {
    id: 's11', name: 'Vikram Rao', title: 'Embedded Systems Engineer',
    skills: ['C', 'C++', 'RTOS', 'CAN Bus', 'AUTOSAR'],
    experience: 7, location: 'Hyderabad, India', rate: '$94/hr',
    availability: '1 month', lastUpdated: '2024-11-24',
    status: 'Shortlisted', isVerified: true, isActive: false, rating: 4.6,
    shortlistedBy: 'AutoTech Corp', shortlistedDate: 'Nov 23, 2024', jobTitle: 'Senior Embedded Engineer',
    email: 'vikram.rao@email.com', phone: '+91 98200 11011',
    linkedin: 'linkedin.com/in/vikramrao', summary: 'Embedded systems engineer with automotive domain expertise in AUTOSAR and functional safety (ISO 26262).',
    education: 'M.Tech Electrical Engineering, IIT Kharagpur',
    certifications: ['AUTOSAR Certified', 'ISO 26262 Functional Safety'],
    totalProjects: 19, successRate: 95,
  },
  {
    id: 's12', name: 'Pooja Menon', title: 'Scrum Master',
    skills: ['Scrum', 'Kanban', 'JIRA', 'SAFe', 'Confluence'],
    experience: 5, location: 'Bengaluru, India', rate: '$82/hr',
    availability: 'Immediate', lastUpdated: '2024-11-21',
    status: 'Shortlisted', isVerified: true, isActive: false, rating: 4.4,
    shortlistedBy: 'Innovate Labs', shortlistedDate: 'Nov 20, 2024', jobTitle: 'Agile Scrum Master',
    email: 'pooja.menon@email.com', phone: '+91 98200 11012',
    linkedin: 'linkedin.com/in/poojamenon', summary: 'Certified Scrum Master fostering agile culture across distributed teams. Improved sprint velocity by 35% through process refinements.',
    education: 'MBA, IIM Bangalore',
    certifications: ['CSM', 'SAFe 5.0 Agilist'],
    totalProjects: 15, successRate: 93,
  },
  {
    id: 's13', name: 'Suresh Pillai', title: 'Blockchain Developer',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'DeFi', 'Hardhat'],
    experience: 4, location: 'Kochi, India', rate: '$96/hr',
    availability: '2 weeks', lastUpdated: '2024-11-19',
    status: 'Shortlisted', isVerified: false, isActive: true, rating: 4.3,
    shortlistedBy: 'FinTech Startup', shortlistedDate: 'Nov 18, 2024', jobTitle: 'Smart Contract Developer',
    email: 'suresh.pillai@email.com', phone: '+91 98200 11013',
    linkedin: 'linkedin.com/in/sureshpillai', summary: 'Blockchain developer with hands-on DeFi and NFT protocol experience. Audited $50M+ in smart contracts.',
    education: 'B.Tech Computer Science, Kerala University',
    certifications: ['Ethereum Developer', 'Certified Blockchain Expert'],
    totalProjects: 10, successRate: 90,
  },
  {
    id: 's14', name: 'Divya Joshi', title: 'Technical Writer',
    skills: ['Technical Writing', 'API Docs', 'Markdown', 'Confluence', 'DITA'],
    experience: 3, location: 'Noida, India', rate: '$68/hr',
    availability: 'Immediate', lastUpdated: '2024-11-17',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.5,
    shortlistedBy: 'Cloud Systems Corp', shortlistedDate: 'Nov 16, 2024', jobTitle: 'Technical Documentation Specialist',
    email: 'divya.joshi@email.com', phone: '+91 98200 11014',
    linkedin: 'linkedin.com/in/divyajoshi', summary: 'Technical writer crafting developer-first documentation for APIs and SDKs. Reduced support tickets by 30% through clearer docs.',
    education: 'B.A. English & Computer Science, Jawaharlal Nehru University',
    certifications: ['DITA Specialist'],
    totalProjects: 9, successRate: 95,
  },
  {
    id: 's15', name: 'Sanjay Chauhan', title: 'SAP ABAP Developer',
    skills: ['SAP', 'ABAP', 'S/4HANA', 'BAPI', 'ALV Reports'],
    experience: 8, location: 'Gurugram, India', rate: '$90/hr',
    availability: '1 week', lastUpdated: '2024-11-14',
    status: 'Shortlisted', isVerified: true, isActive: true, rating: 4.7,
    shortlistedBy: 'Enterprise Corp', shortlistedDate: 'Nov 13, 2024', jobTitle: 'SAP ABAP Lead Developer',
    email: 'sanjay.chauhan@email.com', phone: '+91 98200 11015',
    linkedin: 'linkedin.com/in/sanjaychauhan', summary: 'SAP ABAP developer specializing in S/4HANA migrations and custom development. Delivered 20+ SAP implementations globally.',
    education: 'B.Tech Information Systems, Manipal University',
    certifications: ['SAP Certified Development Associate', 'SAP S/4HANA'],
    totalProjects: 22, successRate: 96,
  },
];
export default function ConsultantPage() {
  const navigate = useNavigate();
  const [searchTerm,    setSearchTerm]    = useState('');
  const [activeFilter,  setActiveFilter]  = useState('all');
  const [viewMode,      setViewMode]      = useState('list');
  const [showFilters,   setShowFilters]   = useState(false);
  const [activeSection, setActiveSection] = useState('allCandidates'); // 'allCandidates' | 'shortlisted'

  const currentCandidates = activeSection === 'shortlisted' ? SHORTLISTED_CANDIDATES : ALL_CANDIDATES;

  const accent = activeSection === 'shortlisted' ? {
    headerGrad: 'from-teal-600 to-teal-800',
    headerText: 'text-teal-100',
    activeStat: 'border-teal-500 ring-teal-100',
    activeStatText: 'text-teal-700',
    activeStatBg: 'bg-teal-100',
    badge: 'bg-teal-100 text-teal-700',
    viewActive: 'text-teal-600',
    btn: 'bg-teal-600 hover:bg-teal-700',
    rateText: 'text-teal-700',
    pagination: 'bg-teal-600',
    toggleActive: 'text-teal-700',
    resultBadge: 'bg-teal-50 border-teal-200 text-teal-600',
  } : {
    headerGrad: 'from-blue-600 to-blue-800',
    headerText: 'text-blue-100',
    activeStat: 'border-blue-500 ring-blue-100',
    activeStatText: 'text-blue-700',
    activeStatBg: 'bg-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    viewActive: 'text-blue-600',
    btn: 'bg-blue-600 hover:bg-blue-700',
    rateText: 'text-blue-700',
    pagination: 'bg-blue-600',
    toggleActive: 'text-blue-700',
    resultBadge: 'bg-blue-50 border-blue-200 text-blue-600',
  };

  const stats = useMemo(() => {
    const parseRate = r => parseFloat((r || '$0').replace(/[^0-9.]/g, '')) || 0;
    return {
      total:     currentCandidates.length,
      verified:  currentCandidates.filter(c => c.isVerified).length,
      unverified:currentCandidates.filter(c => !c.isVerified).length,
      active:    currentCandidates.filter(c => c.isActive).length,
      inactive:  currentCandidates.filter(c => !c.isActive).length,
      available: currentCandidates.filter(c => c.status === 'Available' || c.status === 'Shortlisted').length,
      inProcess: currentCandidates.filter(c => c.status === 'In Process').length,
      placed:    currentCandidates.filter(c => c.status === 'Placed').length,
      avgRate:   currentCandidates.length
        ? `$${Math.round(currentCandidates.reduce((a, c) => a + parseRate(c.rate), 0) / currentCandidates.length)}/hr`
        : '$0/hr',
    };
  }, [currentCandidates]);

  const FILTER_TABS = activeSection === 'shortlisted'
    ? [
        { id: 'all',       label: 'All',        count: stats.total,      icon: Users,     color: 'blue'   },
        { id: 'verified',  label: 'Verified',   count: stats.verified,   icon: Shield,    color: 'green'  },
        { id: 'unverified',label: 'Unverified', count: stats.unverified, icon: XCircle,   color: 'red'    },
        { id: 'active',    label: 'Active',     count: stats.active,     icon: Zap,       color: 'amber'  },
        { id: 'inactive',  label: 'Inactive',   count: stats.inactive,   icon: UserX,     color: 'gray'   },
      ]
    : [
        { id: 'all',        label: 'All',        count: stats.total,     icon: Users,     color: 'blue'   },
        { id: 'verified',   label: 'Verified',   count: stats.verified,  icon: Shield,    color: 'green'  },
        { id: 'available',  label: 'Available',  count: stats.available, icon: UserCheck, color: 'emerald'},
        { id: 'active',     label: 'Active',     count: stats.active,    icon: Zap,       color: 'amber'  },
        { id: 'inProcess',  label: 'In Process', count: stats.inProcess, icon: Clock,     color: 'orange' },
        { id: 'placed',     label: 'Placed',     count: stats.placed,    icon: Award,     color: 'purple' },
        { id: 'unverified', label: 'Unverified', count: stats.unverified,icon: XCircle,   color: 'red'    },
        { id: 'inactive',   label: 'Inactive',   count: stats.inactive,  icon: UserX,     color: 'gray'   },
      ];

  const filtered = currentCandidates
    .filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.skills || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.shortlistedBy || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(c => {
      if (activeFilter === 'verified')   return c.isVerified;
      if (activeFilter === 'unverified') return !c.isVerified;
      if (activeFilter === 'active')     return c.isActive;
      if (activeFilter === 'inactive')   return !c.isActive;
      if (activeFilter === 'available')  return c.status === 'Available';
      if (activeFilter === 'inProcess')  return c.status === 'In Process';
      if (activeFilter === 'placed')     return c.status === 'Placed';
      return true;
    });

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveFilter('all');
    setSearchTerm('');
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      'Available':   'bg-green-50 text-green-700 border border-green-200',
      'In Process':  'bg-amber-50 text-amber-700 border border-amber-200',
      'Placed':      'bg-blue-50 text-blue-700 border border-blue-200',
      'Shortlisted': 'bg-purple-50 text-purple-700 border border-purple-200',
    };
    return <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${styles[status] || 'bg-gray-50 text-gray-600'}`}>{status}</span>;
  };

  const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
      <span className="text-xs font-semibold text-gray-700">{rating || '—'}</span>
    </div>
  );

  /* ── LIST VIEW ── */
  const ListView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {filtered.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="group bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-200 overflow-hidden cursor-pointer"
          onClick={() => navigate(`/vendor/consultant/candidate/${c.id}`)}
        >
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base uppercase bg-gradient-to-br ${
                    activeSection === 'shortlisted' ? 'from-teal-600 to-teal-800' : 'from-blue-600 to-blue-800'
                  }`}>
                    {c.name.substring(0, 2)}
                  </div>
                  {c.isVerified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-gray-900 text-sm">{c.name}</h3>
                    <RatingStars rating={c.rating} />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{c.title}</p>
                  {activeSection === 'shortlisted' && c.shortlistedBy && (
                    <div className="flex items-center gap-1 mb-1">
                      <Building className="w-3 h-3 text-teal-600" />
                      <span className="text-xs text-teal-700 font-semibold">{c.shortlistedBy}</span>
                      {c.jobTitle && <span className="text-xs text-gray-400">· {c.jobTitle}</span>}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.experience}y</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-base font-bold ${accent.rateText} mb-1`}>{c.rate}</div>
                <StatusBadge status={c.status} />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(c.skills || []).map((sk, i) => (
                <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200">{sk}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                {activeSection === 'shortlisted' && c.shortlistedDate
                  ? `Shortlisted ${c.shortlistedDate}`
                  : `Updated ${c.lastUpdated}`
                }
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/vendor/consultant/candidate/${c.id}`); }}
                className={`px-3 py-1.5 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${accent.btn}`}
              >
                <Eye className="w-3.5 h-3.5" />
                View Profile
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  /* ── TABLE VIEW ── */
  const TableView = () => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <tr>
              {['Candidate', ...(activeSection === 'shortlisted' ? ['Shortlisted By', 'Job Title'] : []), 'Status', 'Skills', 'Exp', 'Rate', 'Location', 'Actions'].map(h => (
                <th key={h} className="py-4 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50/60 transition-colors cursor-pointer" onClick={() => navigate(`/vendor/consultant/candidate/${c.id}`)}>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase bg-gradient-to-br flex-shrink-0 ${
                      activeSection === 'shortlisted' ? 'from-teal-600 to-teal-800' : 'from-blue-600 to-blue-800'
                    }`}>
                      {c.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                        {c.isVerified && <Shield className="w-3.5 h-3.5 text-green-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{c.title}</p>
                    </div>
                  </div>
                </td>
                {activeSection === 'shortlisted' && (
                  <>
                    <td className="py-4 px-5">
                      <span className="text-sm font-semibold text-teal-700">{c.shortlistedBy || '—'}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs text-gray-600">{c.jobTitle || '—'}</span>
                    </td>
                  </>
                )}
                <td className="py-4 px-5"><StatusBadge status={c.status} /></td>
                <td className="py-4 px-5">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {(c.skills || []).slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-700 text-xs rounded border border-gray-200">{s}</span>
                    ))}
                    {(c.skills || []).length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">+{c.skills.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-5 text-center"><span className="font-semibold text-gray-900 text-sm">{c.experience}y</span></td>
                <td className="py-4 px-5"><span className={`font-bold text-sm ${accent.rateText}`}>{c.rate}</span></td>
                <td className="py-4 px-5 text-sm text-gray-600 whitespace-nowrap">{c.location}</td>
                <td className="py-4 px-5">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/vendor/consultant/candidate/${c.id}`); }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === 'shortlisted'
                        ? 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />

      <main className="flex-1 overflow-y-auto">

        {/* ── HEADER ── */}
        <div className={`bg-gradient-to-r ${accent.headerGrad} text-white`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">Consultants</h1>
                  <span className="bg-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
                    {stats.total} Candidates
                  </span>
                </div>
                <p className={`text-sm ${accent.headerText}`}>
                  Manage and track all consultant candidates
                </p>

                {/* Section Toggle */}
                <div className="flex items-center gap-1 mt-4 bg-white/10 p-1 rounded-xl w-fit">
                  <button
                    onClick={() => handleSectionChange('allCandidates')}
                    className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeSection === 'allCandidates'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    All Candidates
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeSection === 'allCandidates' ? 'bg-blue-100 text-blue-700' : 'bg-white/20 text-white'
                    }`}>
                      {ALL_CANDIDATES.length}
                    </span>
                  </button>
                  <button
                    onClick={() => handleSectionChange('shortlisted')}
                    className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeSection === 'shortlisted'
                        ? 'bg-white text-teal-700 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Shortlisted
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeSection === 'shortlisted' ? 'bg-teal-100 text-teal-700' : 'bg-white/20 text-white'
                    }`}>
                      {SHORTLISTED_CANDIDATES.length}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white rounded-lg transition-colors text-gray-800 hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg shadow-lg transition-all">
                  <Plus className="w-5 h-5" />
                  Add Candidate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* ── STATS ── */}
          <div className={`grid gap-3 mb-6 ${FILTER_TABS.length <= 5 ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8'}`}>
            {FILTER_TABS.map(stat => {
              const isActive = activeFilter === stat.id;
              return (
                <button key={stat.id} onClick={() => setActiveFilter(stat.id)}
                  className={`p-3 rounded-xl border transition-all bg-white ${isActive
                    ? `border-${stat.color}-500 shadow-md ring-2 ring-${stat.color}-100`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${isActive ? `bg-${stat.color}-100 text-${stat.color}-700` : 'bg-gray-100 text-gray-500'}`}>
                      <stat.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-xs font-semibold ${isActive ? `text-${stat.color}-700` : 'text-gray-500'}`}>{stat.label}</span>
                  </div>
                  <div className={`text-xl font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{stat.count}</div>
                </button>
              );
            })}
          </div>

          {/* ── SEARCH + VIEW BAR ── */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={activeSection === 'shortlisted'
                    ? "Search by name, skills, or client..."
                    : "Search candidates by name, skills, or title..."}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200"
                >
                  <FilterIcon className="w-4 h-4" />
                  Filters
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
                  {[
                    { id: 'list',  icon: List,      label: 'List'  },
                    { id: 'table', icon: TableIcon, label: 'Table' },
                  ].map(mode => (
                    <button key={mode.id} onClick={() => setViewMode(mode.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === mode.id
                          ? `bg-white ${accent.viewActive} shadow-sm border border-gray-200`
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}>
                      <mode.icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Range</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate Range</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Min $" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <input type="text" placeholder="Max $" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option value="">Any Availability</option>
                      <option value="immediate">Immediate</option>
                      <option value="2weeks">Within 2 Weeks</option>
                      <option value="1month">Within 1 Month</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Clear All</button>
                  <button className={`px-4 py-2 text-white text-sm font-medium rounded-lg ${accent.btn}`}>Apply Filters</button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RESULTS COUNT ── */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">{filtered.length} Candidates</h2>
              {activeSection === 'shortlisted' && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${accent.resultBadge}`}>
                  Shortlisted
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Avg. Rate: <span className={`font-semibold ${accent.rateText}`}>{stats.avgRate}</span>
            </div>
          </div>

          {/* ── CONTENT ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode + activeFilter + activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-8"
            >
              {viewMode === 'list'  && <ListView />}
              {viewMode === 'table' && <TableView />}

              {filtered.length === 0 && (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                    className={`px-6 py-3 text-white font-medium rounded-lg ${accent.btn}`}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── PAGINATION ── */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold">1–{filtered.length}</span> of{' '}
                <span className="font-semibold">{filtered.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
                <button className={`px-3 py-2 text-white text-sm font-medium rounded-lg ${accent.pagination}`}>1</button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}