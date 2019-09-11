const categories = [
  {
    name: "Academics",
    levels: [
      {
        name: "Nursery",
        classes: ["Nursery 1", "Nursery 2"],
        questions: [
          {
            id: 1,
            type: "YesNo",
            name: "Do you have any Montessori Experience?"
          },
          {
            id: 2,
            type: "SingleChoice",
            name: "How long have you been teaching Nursery level Children?",
            options: ["Select", "Just Starting", 10, "year"]
          }
        ]
      },
      {
        name: "Primary",
        classes: [
          "Primary 1",
          "Primary 2",
          "Primary 3",
          "Primary 4",
          "Primary 5",
          "Primary 6"
        ],
        questions: [
          {
            id: 1,
            type: "YesNo",
            name: "Have you prepared candidate for Common Entrance?"
          },
          {
            id: 2,
            type: "Text",
            name: "Into which scools?",
            extra: {
              autocomplete: true,
              saved_list: []
            },
            depended_on: 1
          }
        ]
      },
      {
        name: "JSS",
        classes: ["JSS 1", "JSS 2", "JSS 3"],
        questions: [
          {
            id: 1,
            type: "MultiChoice",
            name:
              "Which of these exams have you prepared students for, in this subject?",
            options: ["JSCE", "BECE", "Checkpoints"],
            extra: {
              empty: true,
              levelDisplay: "(JSS)"
            }
          }
        ]
      },
      {
        name: "SSS",
        classes: ["SSS 1", "SSS 2", "SSS 3"],
        questions: [
          {
            id: 1,
            type: "MultiChoice",
            name:
              "Which of these exams have you prepared students for, in this subject?",
            options: [
              "WAEC/GCE",
              "NECO",
              "UTME",
              "IGCSE/A-LEVELS",
              "ACT",
              "IB"
            ],
            extra: {
              empty: true,
              levelDisplay: "(SSS)"
            }
          },
          {
            id: 2,
            type: "YesNo",
            name: "Have you won any awards in this subject?",
            fields: ["Name of Award", "Name of Awarding Body", "Year"]
          }
        ]
      },
      {
        name: "Undergraduate",
        classes: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
      }
    ],
    curriculum: ["British", "American", "Nigerian", "Canadian", "Turkish"],
    curriculum_exclude: ["Undergraduate"]
  },
  {
    name: "Vocational Skill",
    levels: [
      {
        name: "Beginner"
      },
      {
        name: "Intermediate"
      },
      {
        name: "Advanced"
      }
    ],
    questions: [
      {
        id: 1,
        type: "SingleChoice",
        name: "How long have you been into [Skill] professionally?",
        options: ["Select", "Just starting", 10, "year"]
      },
      {
        id: 2,
        type: "MultiChoice",
        name: "What skill level can you teach?",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
      {
        id: 3,
        type: "MultiChoice",
        name: "What age-group do you teach?",
        extra: {
          direction: "column"
        },
        options: [
          "Kids(1-5)",
          "Children (6-12)",
          "Teenagers (13-19)",
          "Adults (20-50)",
          "Seniors (51+)"
        ]
      },
      {
        id: 4,
        type: "YesNo",
        name: "Do you own a business in [skill]?"
      }
    ]
  },
  {
    name: "Music",
    levels: [
      {
        name: "Beginner"
      },
      {
        name: "Intermediate"
      },
      {
        name: "Advanced"
      }
    ],
    questions: [
      {
        id: 1,
        type: "SingleChoice",
        name: "How long have you practiced Music professionally?",
        options: ["Select", "Just starting", 20, "year"]
      },
      {
        id: 2,
        type: "MultiChoice",
        name: "What skill level can you teach?",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
      {
        id: 3,
        type: "MultiChoice",
        name: "What age-group do you teach?",
        options: [
          "Kids(1-5)",
          "Children (6-12)",
          "Teenagers (13-19)",
          "Adults (20-50)",
          "Seniors (51+)"
        ]
      },
      {
        id: 4,
        type: "YesNo",
        name: "Can you sight read?",
        extra: ["Kinda"]
      }
    ]
  },
  {
    name: "Sports",
    levels: [
      {
        name: "Beginner"
      },
      {
        name: "Intermediate"
      },
      {
        name: "Advanced"
      }
    ],
    questions: [
      {
        id: 1,
        type: "SingleChoice",
        name: "How long have you been into [Skill] professionally?",
        options: ["Select", "Just starting", 10, "year"]
      },
      {
        id: 2,
        type: "MultiChoice",
        name: "What skill level can you teach?",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
      {
        id: 3,
        type: "MultiChoice",
        name: "What age-group do you teach?",
        extra: {
          direction: "column"
        },
        options: [
          "Kids(1-5)",
          "Children (6-12)",
          "Teenagers (13-19)",
          "Adults (20-50)",
          "Seniors (51+)"
        ]
      }
    ]
  },
  {
    name: "Languages",
    levels: [
      {
        name: "Beginner"
      },
      {
        name: "Intermediate"
      },
      {
        name: "Advanced"
      }
    ],
    questions: [
      {
        id: 0,
        type: "YesNo",
        name: "Is [Language] your native language?"
      },
      {
        id: 1,
        type: "SingleChoice",
        name: "How long have you spoken [Language]?",
        options: ["Select", "Just starting", 10, "year"]
      },
      {
        id: 2.5,
        type: "MultiChoice",
        name: "For what purpose can you teach [Language]?",
        options: ["Business", "Conversational", "Academic"]
      },
      {
        id: 2,
        type: "MultiChoice",
        name: "What skill level can you teach?",
        options: [
          "Beginner (has no knowledge OR can say a few words)",
          "Intermediate (slightly conversational but NOT fluent)",
          "Advanced (fluent but needs to increase proficiency)"
        ]
      },
      {
        id: 3,
        type: "MultiChoice",
        name: "What age-group do you teach?",
        options: [
          "Kids(1-5)",
          "Children (6-12)",
          "Teenagers (13-19)",
          "Adults (20-50)",
          "Seniors (51+)"
        ]
      }
    ]
  },
  {
    name: "Professional Examinations",
    questions: [
      {
        id: 1,
        type: "YesNo",
        name: "Have you written and passed [Exam]?",
        extra: ["Still in progress"]
      }
    ]
  },
  {
    name: "Foreign Examinations",
    questions: [
      {
        id: 1,
        type: "YesNo",
        name: "Have you taken the official [Exam] exam?"
      },
      {
        id: 2,
        type: "Text",
        name: "{If yes} What was your [exam] score?",
        depended_on: 1
      }
    ]
  },
  {
    name: "Special needs",
    questions: [
      {
        id: 1,
        type: "YesNo",
        name: "Do you have any professional training in Special Needs?",
        fields: ["Name of Training", "Name of organization", "Year"]
      },
      {
        id: 3,
        type: "MultiChoice",
        name: "What age-group do you teach?",
        options: [
          "Kids(1-5)",
          "Children (6-12)",
          "Teenagers (13-19)",
          "Adults (20-50)",
          "Seniors (51+)"
        ]
      }
    ]
  },
  {
    name: "Computer and Software",
    levels: [
      {
        name: "Beginner"
      },
      {
        name: "Intermediate"
      },
      {
        name: "Advanced"
      }
    ],
    questions: [
      {
        id: 2,
        type: "MultiChoice",
        name: "What skill level can you teach?",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
      {
        id: 3,
        type: "MultiChoice",
        name: "What age-group do you teach?",
        options: [
          "Kids(1-5)",
          "Children (6-12)",
          "Teenagers (13-19)",
          "Adults (20-50)",
          "Seniors (51+)"
        ]
      }
    ]
  },
  {
    name: "Programming",
    questions: [
      {
        id: 1,
        type: "MultiChoice",
        name: "Which of the following do you consider your strong point?",
        extra: {
          direction: "column"
        },
        options: [
          { text: "Writing Functions", level: "Beginner" },
          { text: "Classes & Objects", level: "Beginner" },
          { text: "Designing Websites", level: "Intermediate" },
          { text: "Creating APIs", level: "Intermediate" },
          { text: "Building Mobile Apps", level: "Advanced" },
          { text: "Building Web Apps", level: "Intermediate" },
          { text: "Building Command Line Apps", level: "Beginner" },
          { text: "Designing Enterprise Software", level: "Advanced" },
          { text: "Game Development", level: "Advanced" }
        ]
      },
      {
        id: 2,
        type: "MultiChoice",
        name: "What operating systems are you comfortable coding with?",
        options: ["Linux", "MacOS", "Windows"]
      }
    ],
    portfolio: {
      type: "Portfolio",
      heading: "Projects you have done using [Skills]?",
      fields: [
        "Name of Project",
        "A little Description of what you did?",
        "Screenshot"
      ]
    }
  },
  {
    name: "Graphic Design",
    questions: [
      {
        id: 1,
        type: "MultiChoice",
        name: "Which of the following do you consider your strong point?",
        options: [
          { text: "Writing Functions", level: "Beginner" },
          { text: "Classes & Objects", level: "Beginner" },
          { text: "Designing Websites", level: "Intermediate" },
          { text: "Creating APIs", level: "Intermediate" },
          { text: "Building Mobile Apps", level: "Advanced" },
          { text: "Building Web Apps", level: "Intermediate" },
          { text: "Building Command Line Apps", level: "Beginner" },
          { text: "Designing Enterprise Software", level: "Advanced" },
          { text: "Game Development", level: "Advanced" }
        ]
      }
    ],
    portfolio: {
      type: "Portfolio",
      heading: "Projects you have done using [Skills]?",
      fields: [
        "Name of Project?",
        "A little description of what you did?",
        "Upload Portfolio"
      ]
    }
  },
  {
    name: "Engineering",
    questions: [
      {
        id: 1,
        type: "SingleChoice",
        name: "How many years of experience do you have in [Skill]?",
        options: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          "20+"
        ]
      },
      {
        id: 2,
        type: "MultiChoice",
        name: "What kind of project have you used [skill] for?",
        options: [
          "School or Personal Projects",
          "Business or Company-related Projects",
          "High-end Industrial Design Projects",
          "I haven’t done any project yet"
        ]
      },
      {
        id: 3,
        type: "Description",
        name: "What have you done with [Skill]?",
        extra: { placeholder: "Tell us a bit more about Project" }
      }
    ]
  },
  {
    name: "Video and Animation",
    questions: [],
    portfolio: {
      type: "Exhibition",
      kind: "video"
    }
  }
];
export default {
  categories,
  skills: [
    {
      subject: "Basic Mathematics",
      levels: ["Primary"]
    },
    {
      subject: "Quantitative Reasoning",
      levels: ["Primary"]
    },
    { subject: "Verbal Reasoning", levels: ["Primary"] },
    { subject: "Literacy & Numeracy", levels: ["Nursery"] },
    { subject: "Fine Art & Nature", levels: ["Nursery"] },
    { subject: "Picture Reading", levels: ["Nursery"] },
    { subject: "Business Studies", levels: ["JSS"] },
    { subject: "Home Economics", levels: ["JSS"] },
    { subject: "General Mathematics", levels: ["JSS", "SSS"] },
    { subject: "Arithmetic", levels: ["JSS", "SSS"] },
    { subject: "Statistics & Probability", levels: ["JSS", "SSS"] },
    { subject: "Geometry", levels: ["JSS", "SSS"] },
    { subject: "Phonetics", levels: ["JSS", "SSS", "Undergraduate"] },
    { subject: "Biology", levels: ["JSS", "SSS", "Undergraduate"] },
    { subject: "Geography", levels: ["JSS", "SSS", "Undergraduate"] },
    {
      subject: "Agricultural Science",
      levels: ["JSS", "SSS", "Undergraduate"]
    },
    { subject: "Further Mathematics", levels: ["SSS"] },
    { subject: "Government", levels: ["SSS"] },
    { subject: "Food & Nutrition", levels: ["SSS"] },
    { subject: "Algebra", levels: ["Primary", "JSS", "SSS"] },
    { subject: "Reading Comprehension", levels: ["Primary", "JSS", "SSS"] },
    { subject: "English Grammar", levels: ["Primary", "JSS", "SSS"] },
    { subject: "Spellings", levels: ["Primary", "JSS", "SSS"] },
    { subject: "English Language", levels: ["Primary", "JSS", "SSS"] },
    { subject: "Computer & ICT", levels: ["Primary", "JSS", "SSS"] },
    { subject: "Civic Education", levels: ["Primary", "JSS", "SSS"] },
    { subject: "Islamic Religious Studies", levels: ["Primary", "JSS", "SSS"] },
    {
      subject: "Christian Religious Studies",
      levels: ["Primary", "JSS", "SSS"]
    },
    { subject: "Creative Arts", levels: ["Primary", "JSS", "SSS"] },
    {
      subject: "Sociology",
      levels: ["Undergraduate", "Adult"],
      questions: [
        {
          id: 5,
          type: "MultiChoice",
          name: "Which of the following do you consider your strong point?",
          options: [
            "Race, Nationality, and Ethnicity",
            "Mass Media",
            "Sociology of Food",
            "Youth Cultures",
            "Sociology of Gender and Sexuality",
            "Social Movements",
            "Cults, Clans, and Communities",
            "Class Conflict and Inequalities",
            "Spirituality, Superstition, and Legends",
            "Consumerism",
            "The Family"
          ]
        }
      ]
    },
    {
      subject: "Calculus",
      levels: ["SSS", "Undergraduate"],
      questions: [
        {
          id: 5,
          type: "MultiChoice",
          name: "Which of the following do you consider your strong point?",
          options: [
            "Limits & Continuity",
            "Differentiation",
            "Integration",
            "ODE (Ordinary Differential Equation)",
            "PDE (Partial Differential Equation)",
            "Series (e.g Fourier, Infinite, Maclaurin, Taylor etc.)",
            "Multivariable Theorems (Jacobian, Green's theorem, Divergence theorem, Stokes' theorem)"
          ]
        }
      ]
    },
    {
      subject: "Phonics",
      levels: ["Nursery", "Primary"],
      questions: [
        {
          type: "YesNo",
          extra: ["In Process"],
          name: "Do you have any training or certification in Jolly Phonics?"
        }
      ]
    },
    {
      subject: "Handwriting",
      levels: ["Nursery", "Primary"],
      questions: [
        {
          id: 3,
          type: "MultiChoice",
          name: "What style of teaching are you familiar with?",
          options: [
            "Cursive Handwriting Style",
            "Nelson Handwriting Style",
            "Peterson Handwriting Style",
            "New American Cursive Style"
          ]
        }
      ]
    }
  ]
};
