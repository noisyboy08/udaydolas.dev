import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "vois-tech",
    companyName:
      "VOIS for Tech University Engagement Program – Vodafone Idea Foundation x AICTE",
    positions: [
      {
        id: "vois-llm",
        title: "Conversational Data Analysis with LLMs Intern",
        employmentPeriod: {
          start: "09.2025",
          end: "10.2025",
        },
        employmentType: "Virtual Internship",
        icon: "code",
        description: `- Completed the VOIS for Tech University Engagement Program focusing on conversational data analysis with LLMs.
- Explored prompt engineering, AI safety, and enterprise-ready LLM workflows guided by Vodafone Idea Foundation mentors.
- Collaborated with AICTE and Edunet facilitators to build prototypes that translate user intents into actionable business insights.`,
        skills: [
          "Large Language Models",
          "Prompt Engineering",
          "Conversational AI",
          "Python",
          "Data Storytelling",
          "Remote Collaboration",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "edunet-green-skills",
    companyName: "Edunet Foundation x AICTE x Shell – Skills4Future",
    positions: [
      {
        id: "skills4future-march-2025",
        title: "AI & Data Analytics Intern – Green Skills Cohort",
        employmentPeriod: {
          start: "02.2025",
          end: "03.2025",
        },
        employmentType: "Virtual Internship",
        icon: "code",
        description: `- Completed a 4-week internship covering AI fundamentals, data analytics pipelines, and sustainable tech applications.
- Applied regression and time-series techniques to environmental datasets with mentorship from Shell India and AICTE experts.
- Delivered a capstone presentation highlighting data-backed sustainability recommendations.`,
        skills: [
          "Python",
          "Data Analytics",
          "Sustainability",
          "Time-series Forecasting",
          "Storytelling",
        ],
      },
      {
        id: "skills4future-sept-2025",
        title: "AI & Data Analytics Intern – Green Skills Cohort",
        employmentPeriod: {
          start: "08.2025",
          end: "09.2025",
        },
        employmentType: "Virtual Internship",
        icon: "code",
        description: `- Advanced cohort with deeper focus on AI for climate resilience and resource optimization.
- Built dashboards to monitor carbon metrics and presented findings to Edunet mentors.
- Recognized for high engagement and peer mentoring during the cohort.`,
        skills: [
          "Machine Learning",
          "Dashboarding",
          "Climate Tech",
          "Peer Mentoring",
          "Presentation",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "edunet-ibm",
    companyName:
      "Edunet Foundation x IBM SkillsBuild – IBM SkillsBuild Internship",
    positions: [
      {
        id: "ibm-skillsbuild-frontend",
        title: "Front-End Web Development Intern",
        employmentPeriod: {
          start: "08.2025",
          end: "09.2025",
        },
        employmentType: "Virtual Internship",
        icon: "code",
        description: `- Completed a 6-week internship focused on building responsive web apps with IBM SkillsBuild resources.
- Worked on component-driven UI development, accessibility reviews, and performance optimization.
- Demonstrated agile teamwork by shipping weekly increments and showcasing demos to IBM mentors.`,
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Accessibility",
          "Agile",
          "Collaboration",
        ],
        isExpanded: true,
      },
    ],
  },
];
