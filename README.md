# NECTO

> **Connect. Collaborate. Grow.**

---

## 📌 Project Overview

**NECTO** is an AI-powered Content Creator and Marketing Marketplace designed to seamlessly bridge the gap between business owners and content creators. The platform streamlines influencer and content marketing campaigns by enabling data-driven creator discovery, automated campaign matching, transparent collaboration workflows, and campaign performance tracking.

---

## ❗ Problem Statement

Small to medium enterprises (SMEs) and brands often struggle with:
- **Inefficient Discovery:** Finding the right creators manually across fragmented social media platforms is tedious and time-consuming.
- **Mismatched Collaborations:** Lack of verified metrics leads to campaigns with low return on investment (ROI) and mismatched audience demographics.
- **Unstructured Workflows:** Managing contracts, deliverables, communication, and tracking across emails and DMs is chaotic and error-prone.
- **Barriers for Creators:** Talented and niche creators frequently miss out on relevant commercial sponsorship opportunities due to discovery friction.

---

## 💡 Proposed Solution

NECTO provides a centralized, intelligent ecosystem that simplifies creator marketing:
- **Intelligent Matching:** An algorithmic engine evaluates niche, target audience, budget, engagement rates, platform affinity, and availability to match brands with the ideal creators.
- **End-to-End Collaboration Hub:** Integrated workspace for campaign publishing, creator applications, deliverable tracking, and milestone reviews.
- **Multi-Platform Support:** Seamless integration covering major promotional channels including Instagram, YouTube, Facebook, and LinkedIn.

---

## 👥 Main User Roles

1. **Business Owner (Brand / Advertiser):**
   - Posts marketing campaigns and sponsorship requirements.
   - Discovers and evaluates creators using AI recommendations and filtering.
   - Reviews applications, negotiates terms, and manages campaign deliverables.
   - Assesses campaign performance analytics and leaves creator reviews.

2. **Content Creator (Influencer / Creative Professional):**
   - Builds a verified creator profile showcasing niches, channels, audience metrics, and rates.
   - Explores relevant business campaigns and submits proposals/applications.
   - Manages collaboration milestones, submits content drafts, and tracks approvals.
   - Builds a professional reputation through verified campaign reviews.

---

## 🛠️ Planned Technology Stack

| Domain | Technology / Tools | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS | Modern, responsive, type-safe web application |
| **Backend** | Java, Spring Boot | Enterprise-grade RESTful APIs, authentication, and marketplace services |
| **Database** | PostgreSQL | Relational schema, transactional integrity, and data migrations |
| **AI / ML** | Python | Creator recommendation engine (rule-based matcher for v1, ML ranking in later phases) |
| **Deployment** | Firebase Hosting | Hosting for the static Vite frontend assets |

---

## 🚀 Getting Started & Setup

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- Java 17+ & Maven (For backend)
- Python 3.9+ (For AI/ML services)
- PostgreSQL (For the database)

### Running the Frontend Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy the example environment file and configure your local variables.
   ```bash
   cp .env.example .env
   ```
   *(Update `VITE_API_BASE_URL` if your backend is running on a different port than `8000`)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Deployment (Frontend)
The frontend is configured to be deployed to **Firebase Hosting**.
1. Build the production assets: `npm run build`
2. Authenticate the CLI: `npx firebase-tools login`
3. Deploy: `npx firebase-tools deploy --only hosting`

---

## 📂 Project Structure

```text
NECTO/
├── frontend/       # React, TypeScript, and Tailwind CSS user interface
├── backend/        # Java Spring Boot REST APIs, authentication, and marketplace services
├── ai-ml/          # AI-based creator recommendations, campaign matching, and ranking
├── database/       # PostgreSQL database schema and migrations
├── tests/          # Frontend, backend, API, and AI matching tests
├── docs/           # Project documentation, architecture, API specifications
├── README.md       # Root project documentation and overview
└── .gitignore      # Root Git ignore rules
```

---

## 📋 Core Features

- [x] **Frontend Architecture Setup:** Vite + React + TypeScript + Tailwind.
- [x] **Global State Management:** Context API implemented for App Data and Authentication.
- [ ] **Business and Creator Registration:** Role-based onboarding and secure authentication.
- [ ] **User Profile Management:** Rich profiles for businesses and creators.
- [ ] **Campaign Creation:** Wizard for defining deliverables, niches, deadlines, and budgets.
- [ ] **AI-Powered Creator Matching:** Intelligent recommendation engine based on niche, budget, and metrics.
- [ ] **Collaboration Management:** In-platform application flow, negotiation, and deliverable tracking.

---

## 🗺️ Development Roadmap

### Phase 1: Foundation & Architecture Setup (Current)
- [x] Initialize Git repository.
- [x] Initialize React + TypeScript + Tailwind CSS frontend boilerplate with basic layouts and state.
- [ ] Set up PostgreSQL database schema and migration tools.
- [ ] Initialize Spring Boot backend boilerplate with authentication.
- [ ] Set up initial Python rule-based matching script and API contracts.

### Phase 2: Core Platform MVP
- Implement user registration, login, and profile management.
- Build campaign creation and listing modules.
- Implement search and filtering.
- Connect the rule-based matching engine.

### Phase 3: Collaboration & Workflow Management
- Implement application submission, deliverable tracking, and notification systems.

### Phase 4: Advanced AI, Analytics & Scaling
- Upgrade matching engine to ML-based models.
- Deep social analytics integration and performance tracking.
