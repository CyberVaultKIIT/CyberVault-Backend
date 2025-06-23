// MongoDB shell commands
db.forms.insertMany([
  {
    "infoObject": {
      "title": "Cybersecurity Summit 2024 Registration",
      "description": "Registration form for the premier cybersecurity conference",
      "category": "cybersecurity",
      "priority": "high"
    },
    "controllerObject": {
      "formType": "event_registration",
      "maxSubmissions": 300,
      "autoConfirmation": true,
      "emailNotifications": true
    },
    "topicObject": {
      "mainTopic": "Cybersecurity",
      "subTopics": ["Threat Intelligence", "Incident Response", "Security Architecture"]
    },
    "sections": [
      {
        "sectionId": "personal_info",
        "title": "Personal Information",
        "fields": [
          {"fieldId": "fullName", "type": "text", "label": "Full Name", "required": true},
          {"fieldId": "email", "type": "email", "label": "Email Address", "required": true},
          {"fieldId": "phone", "type": "tel", "label": "Phone Number", "required": true},
          {"fieldId": "organization", "type": "text", "label": "Organization", "required": true}
        ]
      },
      {
        "sectionId": "professional_info",
        "title": "Professional Background",
        "fields": [
          {"fieldId": "jobTitle", "type": "text", "label": "Job Title", "required": true},
          {"fieldId": "experience", "type": "select", "label": "Years of Experience", "options": ["0-2", "3-5", "6-10", "10+"], "required": true},
          {"fieldId": "specialization", "type": "multiselect", "label": "Security Specialization", "options": ["Network Security", "Application Security", "Cloud Security", "Incident Response"], "required": false}
        ]
      }
    ],
    "requiredSection": ["personal_info"],
    "optional": {
      "isEventForm": true,
      "eventInfo": {
        "title": "Cybersecurity Summit 2024",
        "description": "Join industry leaders and cybersecurity experts for a comprehensive summit covering the latest threats, defense strategies, and emerging technologies in cybersecurity. Features keynote speakers, hands-on workshops, and networking opportunities.",
        "date": "2024-07-15T09:00:00Z",
        "location": "Tech Convention Center, San Francisco",
        "registrationDeadline": "2024-07-10T23:59:59Z",
        "maxParticipants": 300,
        "isActive": true,
        "images": [
          {
            "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/cybersecurity-summit.jpg",
            "publicId": "cybersecurity_summit_2024"
          }
        ],
        "tags": ["cybersecurity", "security", "enterprise", "networking"],
        "ticketPrice": 299,
        "venue": {
          "name": "Tech Convention Center",
          "address": "123 Innovation Drive, San Francisco, CA 94105",
          "capacity": 300
        }
      }
    },
    "createdAt": new Date("2024-01-15T10:00:00Z"),
    "updatedAt": new Date("2024-01-15T10:00:00Z")
  },
  
  {
    "infoObject": {
      "title": "Full Stack Web Development Bootcamp Registration",
      "description": "Registration for intensive web development training program",
      "category": "web_development",
      "priority": "high"
    },
    "controllerObject": {
      "formType": "event_registration",
      "maxSubmissions": 50,
      "autoConfirmation": true,
      "emailNotifications": true
    },
    "topicObject": {
      "mainTopic": "Web Development",
      "subTopics": ["Frontend", "Backend", "Database", "DevOps"]
    },
    "sections": [
      {
        "sectionId": "basic_info",
        "title": "Basic Information",
        "fields": [
          {"fieldId": "fullName", "type": "text", "label": "Full Name", "required": true},
          {"fieldId": "email", "type": "email", "label": "Email", "required": true},
          {"fieldId": "phone", "type": "tel", "label": "Phone", "required": true},
          {"fieldId": "age", "type": "number", "label": "Age", "required": true}
        ]
      },
      {
        "sectionId": "technical_background",
        "title": "Technical Background",
        "fields": [
          {"fieldId": "programmingExperience", "type": "select", "label": "Programming Experience", "options": ["Beginner", "Intermediate", "Advanced"], "required": true},
          {"fieldId": "knownLanguages", "type": "multiselect", "label": "Known Programming Languages", "options": ["JavaScript", "Python", "Java", "C++", "HTML/CSS"], "required": false},
          {"fieldId": "motivation", "type": "textarea", "label": "Why do you want to join this bootcamp?", "required": true}
        ]
      }
    ],
    "requiredSection": ["basic_info", "technical_background"],
    "optional": {
      "isEventForm": true,
      "eventInfo": {
        "title": "Full Stack Web Development Bootcamp",
        "description": "An intensive 12-week bootcamp covering modern web development technologies including React, Node.js, MongoDB, and deployment strategies. Perfect for beginners and those looking to transition into tech careers.",
        "date": "2024-08-01T09:00:00Z",
        "location": "Code Academy Campus, Austin, TX",
        "registrationDeadline": "2024-07-25T23:59:59Z",
        "maxParticipants": 50,
        "isActive": true,
        "images": [
          {
            "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/web-dev-bootcamp.jpg",
            "publicId": "web_dev_bootcamp_2024"
          }
        ],
        "tags": ["web development", "bootcamp", "full stack", "career change"],
        "ticketPrice": 2499,
        "venue": {
          "name": "Code Academy Campus",
          "address": "456 Tech Street, Austin, TX 78701",
          "capacity": 50
        },
        "duration": "12 weeks",
        "schedule": "Monday to Friday, 9 AM - 5 PM"
      }
    },
    "createdAt": new Date("2024-01-20T14:30:00Z"),
    "updatedAt": new Date("2024-01-20T14:30:00Z")
  },
  
  {
    "infoObject": {
      "title": "Ethical Hacking Workshop Registration",
      "description": "Hands-on workshop for cybersecurity professionals",
      "category": "cybersecurity",
      "priority": "medium"
    },
    "controllerObject": {
      "formType": "event_registration",
      "maxSubmissions": 75,
      "autoConfirmation": true,
      "emailNotifications": true
    },
    "topicObject": {
      "mainTopic": "Ethical Hacking",
      "subTopics": ["Penetration Testing", "Vulnerability Assessment", "Social Engineering"]
    },
    "sections": [
      {
        "sectionId": "participant_info",
        "title": "Participant Information",
        "fields": [
          {"fieldId": "fullName", "type": "text", "label": "Full Name", "required": true},
          {"fieldId": "email", "type": "email", "label": "Email", "required": true},
          {"fieldId": "company", "type": "text", "label": "Company/Organization", "required": true},
          {"fieldId": "certifications", "type": "text", "label": "Security Certifications (if any)", "required": false}
        ]
      }
    ],
    "requiredSection": ["participant_info"],
    "optional": {
      "isEventForm": true,
      "eventInfo": {
        "title": "Ethical Hacking Workshop: Penetration Testing Fundamentals",
        "description": "Learn the fundamentals of ethical hacking and penetration testing in this hands-on workshop. Covers reconnaissance, vulnerability scanning, exploitation techniques, and reporting. Ideal for security professionals and IT administrators.",
        "date": "2024-06-20T10:00:00Z",
        "location": "CyberLab Training Center, Seattle, WA",
        "registrationDeadline": "2024-06-15T23:59:59Z",
        "maxParticipants": 75,
        "isActive": true,
        "images": [
          {
            "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/ethical-hacking-workshop.jpg",
            "publicId": "ethical_hacking_workshop_2024"
          }
        ],
        "tags": ["ethical hacking", "penetration testing", "cybersecurity", "workshop"],
        "ticketPrice": 199,
        "venue": {
          "name": "CyberLab Training Center",
          "address": "789 Security Blvd, Seattle, WA 98101",
          "capacity": 75
        },
        "duration": "1 day",
        "prerequisites": "Basic networking knowledge recommended"
      }
    },
    "createdAt": new Date("2024-02-01T11:15:00Z"),
    "updatedAt": new Date("2024-02-01T11:15:00Z")
  },
]);