# Rootly: An AI-Powered Companion for Multi-Grade Classrooms

## Empowering Educators in Under-Resourced Schools

### Introduction

In numerous under-resourced schools across India, a single teacher often shoulders the immense responsibility of managing multiple grades within a single classroom. This challenging environment leaves educators stretched thin, struggling to find the time and resources to create localized teaching aids, cater to diverse learning levels, and personalize education for every child. **Rootly** aims to address this critical need by providing a true AI companion that lessens this burden and significantly amplifies their impact.

### The Challenge

The core challenge lies in the disproportionate teacher-to-student ratio and the multi-grade classroom model prevalent in many Indian schools. Teachers lack:

- **Time and Tools:** Insufficient resources to develop customized, culturally relevant teaching materials.
- **Differentiation:** Difficulty in addressing the varied learning paces and levels of students across different grades simultaneously.
- **Personalization:** The inability to provide individual attention and tailored learning experiences for each child.

### The Objective

Our objective is to build an AI-powered teaching assistant, named "Rootly" (suggesting getting to the 'root' of learning and support), that empowers teachers in multi-grade, low-resource environments. Rootly will be a versatile tool supporting teachers in:

- **Preparation:** Streamlining lesson planning and content ideation.
- **Content Creation:** Generating relevant and adaptable educational materials.
- **Differentiation:** Tailoring content to suit diverse student needs and grade levels.

### The Core: Rootly's AI Agent Architecture

Rootly's intelligence and adaptability are powered by a sophisticated multi-agent system. This system comprises a central **Master Planner Agent** that orchestrates the overall teaching workflow, supported by three specialized sub-agents, each providing critical context and functionality. This agent-based approach ensures a highly personalized, dynamic, and responsive teaching assistant.

#### Master Planner Agent (The Orchestrator)

- **Role:** The central brain of Rootly, responsible for planning and adapting the teacher's weekly timetable and overall instructional activities. It acts as the primary interface for generating and refining lesson plans.
- **Functionality:**
  - **Intelligent Planning:** Generates an initial personalized weekly plan by dynamically consulting and integrating information from the three specialized sub-agents.
  - **Adaptive Scheduling:** Has the ability to dynamically edit and adjust the weekly plan based on previous day's results, teacher feedback, unexpected classroom events, or evolving student needs.
  - **Accountability & Progress Tracking:** Implements a locking mechanism: if a teacher does not submit the report for a certain day's activities, the plans for subsequent days will be locked until the report is provided, ensuring consistent progress tracking and feedback loops.
  - **Decision Making:** Leverages inputs from the sub-agents to make informed decisions about pacing, resource allocation, and differentiated instruction.

#### Sub-Agent 1: Teacher Context Agent (Understanding the Educator)

- **Role:** Maintains a comprehensive and evolving profile of the teacher, ensuring that generated plans and resources align with their unique strengths, preferences, and limitations.
- **Context & Data Points (Examples):**
  - Teacher's subject specializations, pedagogical strengths, and areas for professional development.
  - Preferred teaching methodologies, classroom management styles, and comfort level with different technological tools.
  - Available preparation time, daily schedule constraints, and overall workload.
  - Access to school facilities (e.g., projector, computer lab, library, blackboard availability).
  - Past performance feedback or any specific training received.
  - Local language proficiency for content generation and interaction.

#### Sub-Agent 2: Grades & Syllabus Context Agent (Mastering the Curriculum)

- **Role:** Possesses in-depth knowledge of the academic structure, curriculum, and learning objectives for all grades the teacher is responsible for. This agent is crucial for ensuring curriculum alignment and grade-appropriate content.
- **Context & Data Points (Examples):**
  - All grades assigned to the teacher (e.g., Grade 1, Grade 2, Grade 3, Grade 4).
  - Complete syllabus and curriculum for each assigned grade, meticulously broken down by subject, topic, sub-topic, and learning outcomes.
  - Detailed learning objectives, expected competencies, and assessment criteria for each topic per grade level.
  - Information on standardized testing schedules, national educational guidelines, and local curricular nuances.
  - Availability of approved textbooks, supplementary materials, and digital resources for each subject and grade.
  - Identification of inter-grade topic overlaps and opportunities for integrated or spiraling curriculum approaches.

#### Sub-Agent 3: Student Context Agent (Personalizing Learning)

- **Role:** Holds individual, dynamic profiles for each student in the multi-grade classroom, enabling highly differentiated instruction and personalized learning paths.
- **Context & Data Points (Examples):**
  - Individual student skill levels and proficiency across various subjects (e.g., reading comprehension, mathematical reasoning, scientific inquiry).
  - Identified learning styles (visual, auditory, kinesthetic) and preferred modes of instruction.
  - Specific academic strengths, areas needing improvement, and common misconceptions.
  - Historical assessment scores, progress tracking data, and growth trajectories.
  - Known learning disabilities, special educational needs, or accommodations required (if applicable, with appropriate privacy safeguards).
  - Student engagement levels, participation history, and motivation indicators.
  - Cultural background, home language, and any specific learning preferences that can inform content adaptation.
  - Attendance records and any other relevant behavioral or socio-emotional data affecting learning.

### Key Features (Agent-Driven Capabilities)

Leveraging the collective intelligence of its agents, Rootly will offer the following core functionalities:

1.  **Generate Hyper-Local Content:**

    - **Description:** Allows teachers to make requests in their local language, enabling the **Teacher Context Agent** to facilitate culturally and linguistically appropriate content generation.
    - **Example:** "Create a story in Marathi about farmers to explain different soil types."
    - **Outcome:** Simple, culturally relevant, and context-specific educational content generated by Gemini, informed by local nuances.

2.  **Create Differentiated Materials:**

    - **Description:** Enables teachers to upload a photo of a textbook page. The **Grades & Syllabus Context Agent** and **Student Context Agent** provide the necessary understanding of curriculum levels and student needs.
    - **Process:** Utilizes a multimodal Gemini model to analyze the content and the agents' context.
    - **Outcome:** Instantly generates multiple versions of a worksheet or activity tailored to different grade levels and even individual student needs present in the classroom.

3.  **Act as an Instant Knowledge Base:**

    - **Description:** Provides simple, accurate explanations for complex student questions ("Why is the sky blue?") by drawing on the vast knowledge informed by the **Grades & Syllabus Context Agent** (for appropriate complexity) and **Teacher Context Agent** (for local language and analogy preferences).
    - **Outcome:** Explanations delivered in the local language, complete with easy-to-understand analogies.

4.  **Design Visual Aids:**

    - **Description:** Generates simple line drawings or charts based on a teacher's description. The **Teacher Context Agent** understands the teacher's need for blackboard-replicable visuals.
    - **Purpose:** These visuals are designed to be easily replicated on a blackboard, aiding in explaining concepts like the water cycle, human anatomy, or geographical features.

5.  **Go Beyond (Innovations Driven by Agent Data):**
    - **Audio-Based Reading Assessments:** Using Vertex AI Speech-to-Text, with assessment metrics informed by the **Student Context Agent**'s understanding of individual reading levels.
    - **On-the-Fly Educational Game Generation:** Creating interactive and engaging learning games tailored to specific topics or grade levels, dynamically generated based on **Student Context Agent**'s engagement data and **Grades & Syllabus Context Agent**'s curriculum mapping.
    - **AI-Powered Weekly Lesson Planners:** The **Master Planner Agent** leverages insights from all sub-agents to structure activities, suggest resources, and optimize teacher time management more effectively than ever before.

### Tech Stack

The development of Rootly will strictly adhere to the following technology stack:

- **Google AI Technologies:** Mandatory use of Google's cutting-edge AI services, including but not limited to Gemini (for multimodal content generation), Vertex AI Speech-to-Text (for audio processing), and other relevant Google AI APIs (for agent intelligence and orchestration).
- **Frontend:** React (for building dynamic, intuitive, and responsive user interfaces that facilitate seamless teacher interaction with the agents).
- **Backend:** Node.js (for robust server-side logic, API development, and efficient communication between the frontend and the AI agents).
- **Database:** Firestore (Google Cloud's highly scalable, flexible NoSQL document database for storing agent contexts, student profiles, curriculum data, and daily reports).

### Development Approach

We aim to achieve these functionalities by either designing the agents through custom code leveraging the chosen tech stack or, if suitable, utilizing an Agent Development Kit (ADK) provided by Google, to streamline the agent orchestration and management. This decision will be based on project complexity, performance requirements, and the availability of Google's agent development tools.

```

```
