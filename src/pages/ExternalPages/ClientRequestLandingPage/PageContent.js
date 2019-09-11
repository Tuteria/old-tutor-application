import React from "react";

const capitalize = string => string.replace(/\b\w/g, l => l.toUpperCase());
export const PersonalInfoContent = {
  heroContent: (state, vicinity) => {
    let transformedState = state ? capitalize(state) : null;
    return {
      heading: `Get an expert home tutor ${
        transformedState ? `in ${transformedState}` : ``
      }`,
      subTitle: `Improve your child’s grades and confidence in all subjects`,
      buttonText: `Get a home tutor`,
      bgImage: `/static/img/tuteria-tutor-teaching-kid-reading-smiling.jpg`
    };
  },
  benefitContent: {
    heading: `Put your kids ahead in school`,
    features: [
      {
        heading: `High quality tutors`,
        paragraph: `All tutors are experienced, thoroughly vetted, and have a proven track record of producing excellent results.`,
        icon: `quality-tutor`
      },
      {
        heading: `Safe and trusted`,
        paragraph: `Over 2,360 parents have used Tuteria to improve their kids’ results, get help with homework and pass exams.`,
        icon: `safe-and-trusted`
      },
      {
        heading: `Tailored to your child`,
        paragraph: `Every lesson is tailored to strengthen your child’s weak areas and help them master any subject.`,
        icon: `tailored-to-child`
      }
    ]
  },
  guaranteeContent: {
    heading: `100% Satisfaction Guaranteed`,
    bgImage: "/static/img/tuteria-tutor-teaching-child.jpg",
    paragraph: `We are committed to your child’s success, and always do our best to ensure you achieve your goals. If you’re not happy, we’ll work to make it right.`
  },
  videoSectionContent: {
    buttonText: `Get a Home Tutor`,
    heading: `We help your kids achieve unbelievable results`,
    paragraph: `Mrs Awoderu's daughter, Tolu, scored 325 out of 400 in UME and later
          got 5As & 4Bs in GCE with the help of experienced home tutors from
          Tuteria.`
  },
  tutorDisplayContent: {
    heading: `Get the best tutors for your kids`,
    paragraph: `With over 15,000 verified tutors, your child’s education is
          guaranteed!`,
    tutors: [
      {
        name: "Chinasa",
        title: "Math and English Tutor",
        photo_url:
          "/static/img/tutors/top-tutors/chinasa-tuteria-math-and-english-tutor.png",
        photo_alt: "Chinasa, Math and English Tutor on Tuteria",
        client_name: "Mrs Ngozi",
        client_testimonial:
          "Chinasa is very supportive to my kids. She listens and pushed them to do more. She goes an extra mile. My kids’ results have improved in Maths.",
        no_of_booking: "96"
      },
      {
        name: "Tobi",
        title: "Common Entrance Tutor",
        photo_url:
          "/static/img/tutors/top-tutors/tobi-tuteria-common-entrance-math-tutor.png",
        photo_alt: "Tobi, Common Entrance Tutor on Tuteria",
        client_name: "Mrs Eniola",
        client_testimonial:
          "I’m grateful to have come in contact with Tobi. I stand proud to say that my son wrote 3 entrance exams and passed all. Tobi was very supportive. ",
        no_of_booking: "108"
      },
      {
        name: "Modupe",
        title: "Montessori and Nursery Tutor",
        photo_url:
          "/static/img/tutors/top-tutors/modupe-tuteria-montessori-and-nursery-tutor.jpg",
        photo_alt: "Modupe, Montessori and Nursery Tutor on Tuteria",
        client_name: "Mrs Adija",
        client_testimonial:
          "My son won academic awards for the first time ever! His reading has improved even above my expectations. I am beyond elated! Thank you Modupe.",
        no_of_booking: "44"
      }
    ]
  },
  servicesContent: {
    heading: `What do you need help with?`,
    services: [
      {
        heading: "Exam preparation",
        paragraph:
          "Pass entrance exams into top schools. Prepare for IGCSE, SATs, Checkpoint, SSCE, BECE etc.",
        icon: "open-book"
      },
      {
        heading: "Improve grades",
        paragraph:
          "Help your child perform better in their subjects, build confidence and get higher grades.",
        icon: "three-up-arrows"
      },
      {
        heading: "Homework help",
        paragraph:
          "Get help with your child’s assignments. Prepare them to pass tests in all their subjects.",
        icon: "open-book-2"
      },
      {
        heading: "Nursery and preschool",
        paragraph:
          "Help your child speak, read and write correctly. Get lessons in phonics, numeracy and literacy.",
        icon: "abc"
      },
      {
        heading: "Homeschooling",
        paragraph:
          "Help your child master all subjects and prepare for exams at home using your preferred curriculum.",
        icon: "home-school"
      },
      {
        heading: "Special needs",
        paragraph:
          "Get professional support for kids  with Dyslexia, Autism, Speech Impediment, ADHD etc.",
        icon: "special-user"
      }
    ]
  },
  ctaSectionContent: {
    heading: `Over 2,860 parents trust Tuteria and have seen improvement in their
            kids`,
    buttonText: `Get a home tutor`,
    paragraph: `Highly qualified tutors guaranteed for your request.`
  },
  faqSectionContent: {
    heading: `Questions parents ask`,
    FAQs: [
      {
        question: "Where will the lessons hold?",
        answer:
          "Lessons hold in the comfort of your home or any other location that works best for you. You can choose to have lessons delivered in-person or online by your preferred home tutor."
      },
      {
        question: "How do you verify your tutors?",
        answer:
          "Each tutor is thoroughly screened for subject expertise, personality, and safety. In fact, before we accept any tutor we verify their government-issued ID cards and online profiles, conduct lenghty interviews, test their knowledge of each subject and verify their guarantors to ensure your peace of mind."
      },
      {
        question: "How does payment work?",
        answer:
          "Lesson cost depends on your location, number of students and lesson duration. You can pay online or via bank transfer when you’ve selected your preferred tutor and are ready to begin lessons."
      },
      {
        question: "What happens if I’m not satisfied with my tutor?",
        answer:
          "In the unlikely event that you’re not satisfied with your tutor, we’ll  immediately replace the tutor or refund your balance."
      }
    ],
    contactInfo: [
      { icon: "clp-phone", children: "0909-452-6878" },
      { icon: "clp-email", children: "info@tuteria.com" }
    ]
  }
};

export const IELTSContent = {
  heroContent: (state, vicinity) => {
    let transformedState = state ? capitalize(state) : null;
    // let transformedState = capitalize(state.split("-")[1]);
    return {
      heading: `Pass your IELTS Exam`,
      subTitle: `Get above 7.5 in all IELTS sections with a certified IELTS Exam Preparation tutor ${
        transformedState ? `in ${transformedState}` : ``
      } with proven results.`,
      buttonText: `Get a tutor`,
      bgImage: `/static/img/exams/excited-tuteria-client-passed-ielts.png`
    };
  },
  resultsSectionContent: {
    heading: "Industry-leading IELTS results",
    subheading: `We've helped hundreds of people like you pass their IELTS exams`,
    results: [
      { heading: "8.0", paragraph: "Average band score" },
      { heading: "95%", paragraph: "Success rate" },
      { heading: "750+", paragraph: "IELTS students" }
    ]
  },
  highestScoreContent: (state, vicinity) => {
    return {
      heading: `Achieve your highest IELTS score`,
      features: [
        {
          heading: `Result-driven IELTS Tutors`,
          paragraph: `Study with a proven IELTS teacher ${
            state ? `in ${state}` : `near you`
          } who has helped many students score above 7.5 in each section of the IELTS exam.`,
          icon: `exam-target`
        },
        {
          heading: `In-depth Study & Practice`,
          paragraph: `IELTS is not your usual English exam. Practice extensively with an expert and learn the hidden techniques to get high scores.`,
          icon: `exam-book`
        },
        {
          heading: `Fitted to Your Schedule`,
          paragraph: `Works for you whether you want a crash IELTS preparation, want to study for a few months or need weekend IELTS lessons.`,
          icon: `exam-calender`
        }
      ]
    };
  },
  guaranteeContent: {
    heading: `We’ve got you covered`,
    bgImage: "/static/img/exams/tuteria-tutor-teaching-client-ielts.png",
    paragraph: `We are committed to your IELTS success, and work closely with your tutor to ensure you achieve your desired score.`
  },
  howtoContent: {
    heading: `Get a tutor in 3 simple steps`,
    features: [
      {
        heading: `Place a tutor request`,
        paragraph: `Fill a quick request form and tell us your goal, your schedule and the sections of IELTS you need help with.`,
        number: `1`
      },
      {
        heading: `Meet your perfect tutor`,
        paragraph: `We’ll send you options of expert IELTS tutors near you who have produced good results with other IELTS students.`,
        number: `2`
      },
      {
        heading: `Study and pass IELTS!`,
        paragraph: `Begin lessons with your preferred tutor immediately and learn what it takes to pass your IELTS exam with a high score.`,
        number: `3`
      }
    ]
  },
  videoSectionContent: {
    buttonText: `Get a tutor`,
    heading: `My tutor was really good at tutoring IELTS. I needed 5.5 but I got 6.5 which exceeded the band score for my program.`,
    paragraph: `Oluwatosin — Lagos, Nigeria`
  },
  benefitsContent: {
    heading: `Enjoy the benefits of passing IELTS`,
    subheading: `No matter your reason for taking IELTS, we’ll help you reach your goal`,
    benefits: [
      {
        heading: `Study Abroad`,
        paragraph: `Get expert help to pass your IELTS Academic or General Training Test and secure admission to study in your chosen schools abroad.`,
        image: `/static/img/exams/study-abroad-pass-ielts-tuteria.png`
      },
      {
        heading: `Immigration and Visa`,
        paragraph: `Planning to migrate to Canada, Australia, New Zealand or the UK? We'll help you get the IELTS score you need so you can confidently apply for immigration visa.`,
        image: `/static/img/exams/get-visa-pass-ielts-tuteria.png`
      },
      {
        heading: `Medical/Nursing Exams`,
        paragraph: `Looking to write PLAB or OSCE and practice in the UK? Imagine what you'd lose if you don't pass your IELTS exam. Take no chances - get a certified IELTS tutor today.`,
        image: `/static/img/exams/pass-plab-pass-ielts-tuteria.png`
      },
      {
        heading: `Bragging Rights`,
        paragraph: `By passing IELTS, you're officially a British Council certified proficient user of the English Language. That's something to brag about anywhere!`,
        image: `/static/img/exams/bragging-right.png`
      }
    ]
  },
  tutorDisplayContent: {
    heading: `Our tutors deliver the best results`,
    paragraph: `See what clients say about them`,
    tutors: [
      {
        name: "Seyi",
        title: "IELTS & English Tutor",
        photo_url:
          "/static/img/exams/Seyi-tuteria-ielts-and-english-tutor.jpeg",
        photo_alt: "Seyi, IELTS & English Tutor on Tuteria",
        client_name: "Debbie",
        client_testimonial:
          "I thoroughly enjoyed the IELTS lessons that Seyi delivered. He is very experienced and has a sound knowledge of the English language. The lessons were well planned and key areas of the exam were addressed. I scored 7.5.",
        no_of_booking: "12"
      },
      {
        name: "Ayotunde",
        title: "IELTS Tutor",
        photo_url: "/static/img/exams/Ayotunde-tuteria-ielts-tutor.jpeg",
        photo_alt: "Ayotunde, IELTS Tutor on Tuteria",
        client_name: "Oluwatosin",
        client_testimonial:
          "Ms Ayotunde is a good teacher, she gave me all the key tips, encouragement and practice I needed to boost my confidence. I had 7.5 overall band in the Academic test. The materials she recommended were also extremely helpful.",
        no_of_booking: "18"
      },
      {
        name: "Kunle",
        title: "IELTS Tutor & Examiner",
        photo_url:
          "/static/img/exams/Kunle-tuteria-ielts-tutor-and-examiner.jpeg",
        photo_alt: "Kunle, IELTS Tutor & Examiner on Tuteria",
        client_name: "Ebi",
        client_testimonial:
          "Kunle displayed his IELTS expertise in a very professional manner. I'll recommend him over and over again to anyone.And Tuteria, am so impressed!I never knew there was such in Nigeria.The process from start to finish was exceptional.",
        no_of_booking: "12"
      }
    ]
  },
  servicesContent: {
    heading: `Why Tuteria?`,
    services: [
      {
        heading: "Our 95% Success rate",
        paragraph:
          "We help you get the results you need, like we have done for hundreds of other IELTS students like you.",
        icon: "success-rate"
      },
      {
        heading: "Best-in-class IELTS tutors",
        paragraph:
          "We handpick only the best teachers who have proven track record of consistently helping students pass.",
        icon: "best-in-class"
      },
      {
        heading: "Rarely-taught IELTS techniques",
        paragraph:
          "We’ll help you improve on your weakest areas using in-depth techniques guaranteed to boost your score.",
        icon: "diamond-icon"
      },
      {
        heading: "Flexible lesson schedules",
        paragraph:
          "Lesson times and location are flexible. You can agree with your tutor on a time that works for you.",
        icon: "schedule"
      },
      {
        heading: "Free, detailed study materials",
        paragraph:
          "You'll get the latest IELTS study materials and practice tests sent to your email for free!",
        icon: "study-material"
      },
      {
        heading: "We’re always here for you",
        paragraph:
          "Our team is standing to provide support and ensure you have a pleasant learning experience.",
        icon: "customer-care"
      }
    ]
  },
  ctaSectionContent: {
    heading: `With 8.0 average band and 95% success rate, it's time to pass your IELTS exam.`,
    buttonText: `Get a tutor`,
    paragraph: `Highly qualified tutors guaranteed for your request.`
  },
  faqSectionContent: {
    heading: `Your questions answered`,
    FAQs: [
      {
        question: "Where will the lessons hold?",
        answer:
          "Lessons hold in the comfort of your home or any other location that works best for you. You can choose to have lessons delivered in-person or online."
      },
      {
        question: "How do you verify your tutors?",
        answer:
          "Each tutor is thoroughly screened for subject expertise, personality, and safety. In fact, before we accept any tutor we verify their government-issued ID cards and online profiles, conduct lengthy interviews, test their knowledge of each subject and verify their guarantors to ensure your peace of mind."
      },
      {
        question: "How does payment work?",
        answer:
          "Lesson cost depends on your location, number of students and lesson duration. You can pay online or via bank transfer when you’ve selected your preferred tutor and are ready to begin lessons."
      },
      {
        question: "What happens if I’m not satisfied with my tutor?",
        answer:
          "In the unlikely event that you’re not satisfied with your tutor, we’ll immediately replace the tutor or refund your balance."
      }
    ],
    contactInfo: [
      {
        icon: "clp-phone",
        children: "0909-452-6878",
        url: "tel:+2349094526878"
      },
      {
        icon: "clp-email",
        children: "info@tuteria.com",
        url: "mailto:info@tuteria.com?subject=Tutor%20Enquiry"
      },
      {
        icon: "whatsapp",
        children: "Chat on Whatsapp",
        url: "http://bit.ly/Whatsapp2Tuteria"
      }
    ]
  },
  onlinePreferenceSection: {
    heading: `Prefer to study for IELTS online?`,
    paragraph: `Book online lessons and study via Skype or Hangout from the comfort of your home.`,
    image: `/static/img/exams/lady-studying-online-tuteria.png`
  },
  preFooterSection: {
    heading: `Pass your IELTS exam with ease`,
    paragraph: `Get a tutor to help you smash the exam.`,
    image: `/static/img/exams/impact-next-generation-tuteria.png`
  },
  firstTestimonialContent: {
    testimonial: `
          My tutor helped me overcome my fear of writing IELTS. He taught me
          from scratch and critically analysed my work.
          <mark class="highlight">I scored 8.0 overall</mark> - 8.5 in
          Listening, 8.5 in Reading, 7.0 in Speaking and 7.0 in Writing.`,
    name: `Mrs. Emem`,
    location: `Abuja, Nigeria`
  },
  secondTestimonialContent: {
    testimonial: `
          The lessons were very helpful. My tutor was a patient and
          knowledgeable teacher. We practiced a lot of IELTS questions, and he
          helped me develop confidence for the exam.
          <br/><mark class="highlight">I scored a 7.5 overall band score.</mark>`,
    name: `Ifeoma Mary`,
    location: `Lagos, Nigeria`
  }
};

export const GMATContent = {
  heroContent: (state, vicinity) => {
    let transformedState = state ? capitalize(state) : null;
    return {
      heading: `Pass your GMAT Exam`,
      subTitle: `Get a top-rated GMAT tutor ${
        transformedState ? `in ${transformedState}` : ``
      } to help you achieve your target score for MBA or job tests.`,
      buttonText: `Get a tutor`,
      bgImage: `/static/img/exams/excited-tuteria-client-passed-ielts.png`
    };
  },
  resultsSectionContent: {
    heading: "Industry-leading GMAT results",
    subheading: `We've helped students get into top MBA programs around the world.`,
    results: [
      { heading: "720", paragraph: "Average score" },
      { heading: "95%", paragraph: "Success rate" },
      { heading: "240+", paragraph: "GMAT students" }
    ]
  },
  firstTestimonialContent: {
    testimonial: `I had 530 in the diagnostic test with Quant being my lowest; my goal was at least 700 to get into INSEAD MBA. Getting a GMAT tutor was the best decision I made. I was challenged, encouraged and thankfully, got the executive MBA admission.`,
    name: `Yewande`,
    location: `Lagos, Nigeria`
  },
  highestScoreContent: (state, vicinity) => {
    return {
      heading: `Result-driven GMAT preparation`,
      features: [
        {
          heading: `The Best GMAT Tutors`,
          paragraph: `Every GMAT tutor has a 95th+ percentile score, a passion for teaching and consistently high ratings from students.`,
          icon: `exam-target`
        },
        {
          heading: `In-depth Study & Practice`,
          paragraph: `Practice extensively with the same level of difficulty you'll face in the GMAT and learn the techniques to get higher scores.`,
          icon: `exam-book`
        },
        {
          heading: `Fitted to Your Schedule`,
          paragraph: `Every lesson is planned around your schedule whether you want a crash GMAT prep, a few months study or weekend lessons.`,
          icon: `exam-calender`
        }
      ]
    };
  },
  guaranteeContent: {
    heading: `We’ve got you covered`,
    bgImage: "/static/img/exams/tuteria-tutor-teaching-client-ielts.png",
    paragraph: `We are committed to your GMAT success, and work closely with your tutor to ensure you achieve your desired score.`
  },
  howtoContent: {
    heading: `Get a tutor in 3 simple steps`,
    features: [
      {
        heading: `Place a tutor request`,
        paragraph: `Fill a quick request form and tell us your goal, your schedule and the sections of GMAT you need help with.`,
        number: `1`
      },
      {
        heading: `Meet your perfect tutor`,
        paragraph: `You'll receive options of expert GMAT tutors near you and you can select your preferred tutor.`,
        number: `2`
      },
      {
        heading: `Study and pass GMAT!`,
        paragraph: `Begin lessons immediately and learn what it takes to pass your GMAT exam with a high score.`,
        number: `3`
      }
    ]
  },
  secondTestimonialContent: {
    testimonial: `My tutor, Nanna, is extremely professional. He taught with so much expertise and this made me confident for the exams. I got the school of my choice, Lagos Business School for executive MBA.`,
    name: `Brendan Ndifon`,
    location: `Abuja, Nigeria`
  },
  benefitsContent: {
    heading: `Enjoy the benefits of passing GMAT`,
    subheading: `No matter your reason for taking GMAT, we’ll help you reach your goal`,
    benefits: [
      {
        heading: `Study Abroad`,
        paragraph: `Get the score you need to secure admission into top business and graduate schools like INSEAD, LBS, Kellogs, Harvard, Cambridge etc.`,
        image: `/static/img/exams/study-abroad-pass-ielts-tuteria.png`
      },
      {
        heading: `Get your dream job`,
        paragraph: `Don't leave anything to chance as you prepare for your recruitment test. Work with an expert to ensure you pass the test and get the job.`,
        image: `/static/img/exams/pass-plab-pass-ielts-tuteria.png`
      }
    ]
  },
  tutorDisplayContent: {
    heading: `Our tutors deliver the best results`,
    paragraph: `See what clients say about them`,
    tutors: [
      {
        name: "Leke",
        title: "GMAT & GRE Tutor",
        photo_url: "/static/img/exams/Leke-tuteria-gmat-tutor.png",
        photo_alt: "Leke, GMAT & GRE Tutor on Tuteria",
        client_name: "Bolaji",
        client_testimonial:
          "My experience with Leke was quite phenomenal. He took his time to teach me and he ensured that I understood the techniques of GMAT which increased my score from 430 to 720. ",
        no_of_booking: "16"
      },
      {
        name: "Damilola",
        title: "GMAT & GRE Tutor",
        photo_url: "/static/img/exams/Damilola-tuteria-gmat-tutor.jpg",
        photo_alt: "Damilola, GMAT & GRE Tutor on Tuteria",
        client_name: "Natalie",
        client_testimonial: `Damilola is an excellent tutor, patient and very intelligent. Works at your pace and was very flexible. I highly recommend him because I passed my GMAT exam!`,
        no_of_booking: "18"
      },
      {
        name: "Adewale",
        title: "IELTS Tutor & Examiner",
        photo_url: "/static/img/exams/Adewale-tuteria-gmat-tutor.jpg",
        photo_alt: "Adewale, GMAT & GRE Tutor on Tuteria",
        client_name: "Eseosa",
        client_testimonial: `Lessons with Adewale were great. I was preparing for a job interview and which I did pass. I am presently working now. He gave simplified explanations and was very helpful despite my busy schedule.`,
        no_of_booking: "12"
      }
    ]
  },
  servicesContent: {
    heading: `Why Tuteria?`,
    services: [
      {
        heading: "Our 95% Success rate",
        paragraph:
          "We help you get the results you need, like we have done for hundreds of other GMAT students like you.",
        icon: "success-rate"
      },
      {
        heading: "Best-in-class GMAT tutors",
        paragraph:
          "We handpick only the best teachers who have proven track record of consistently helping students pass.",
        icon: "best-in-class"
      },
      {
        heading: "Rarely-taught GMAT techniques",
        paragraph:
          "We’ll help you improve on your weakest areas using in-depth techniques guaranteed to boost your score.",
        icon: "diamond-icon"
      },
      {
        heading: "Flexible lesson schedules",
        paragraph:
          "Lesson times and location are flexible. You can agree with your tutor on a time that works for you.",
        icon: "schedule"
      },
      {
        heading: "Learn at your pace",
        paragraph: `Start from the basics. Clarify areas you don't understand. Practice GMAT extensively. Leave nothing behind.`,
        icon: "study-material"
      },
      {
        heading: "We’re always here for you",
        paragraph:
          "Our team is standing to provide support and ensure you have a pleasant learning experience.",
        icon: "customer-care"
      }
    ]
  },
  ctaSectionContent: {
    heading: `With 720 average and 95% pass rate, we are your best choice for GMAT Prep.`,
    buttonText: `Get a tutor`,
    paragraph: `Highly qualified tutors guaranteed for your request.`
  },
  faqSectionContent: {
    heading: `Your questions answered`,
    FAQs: [
      {
        question: "Where will the lessons hold?",
        answer:
          "Lessons hold in the comfort of your home or any other location that works best for you. You can choose to have lessons delivered in-person or online."
      },
      {
        question: "How do you verify your tutors?",
        answer:
          "Each tutor is thoroughly screened for subject expertise, personality, and safety. In fact, before we accept any tutor we verify their government-issued ID cards and online profiles, conduct lengthy interviews, test their knowledge of each subject and verify their guarantors to ensure your peace of mind."
      },
      {
        question: "How does payment work?",
        answer:
          "Lesson cost depends on your location, number of students and lesson duration. You can pay online or via bank transfer when you’ve selected your preferred tutor and are ready to begin lessons."
      },
      {
        question: "What happens if I’m not satisfied with my tutor?",
        answer:
          "In the unlikely event that you’re not satisfied with your tutor, we’ll immediately replace the tutor or refund your balance."
      }
    ],
    contactInfo: [
      {
        icon: "clp-phone",
        children: "0909-452-6878",
        url: "tel:+2349094526878"
      },
      {
        icon: "clp-email",
        children: "info@tuteria.com",
        url: "mailto:info@tuteria.com?subject=Tutor%20Enquiry"
      },
      {
        icon: "whatsapp",
        children: "Chat on Whatsapp",
        url: "http://bit.ly/Whatsapp2Tuteria"
      }
    ]
  },
  onlinePreferenceSection: {
    heading: `Prefer to study for GMAT online?`,
    paragraph: `Book online lessons and study via Skype or Hangout from the comfort of your home.`,
    image: `/static/img/exams/lady-studying-online-tuteria.png`
  },
  preFooterSection: {
    heading: `Pass your GMAT exams with ease`,
    paragraph: `Get a tutor to help you smash the exam.`,
    image: `/static/img/exams/impact-next-generation-tuteria.png`
  }
};

export const GREContent = {
  heroContent: (state, vicinity) => {
    let transformedState = state ? capitalize(state) : null;
    return {
      heading: `Pass your GRE Exam`,
      subTitle: `Get a top-rated GRE tutor ${
        transformedState ? `in ${transformedState}` : ``
      } to help you achieve your target score for MBA or postgraduate studies.`,
      buttonText: `Get a tutor`,
      bgImage: `/static/img/exams/excited-tuteria-client-passed-ielts.png`
    };
  },
  resultsSectionContent: {
    heading: "Industry-leading GRE results",
    subheading: `We've helped students get into top schools around the world.`,
    results: [
      { heading: "320", paragraph: "Average score" },
      { heading: "95%", paragraph: "Success rate" },
      { heading: "150+", paragraph: "GRE students" }
    ]
  },
  firstTestimonialContent: {
    testimonial: `I needed 160 for my postgraduate admission but struggled with the Math/Quant section. My tutor was very intelligent and he helped me develop confidence for the exam. I had 165 in Verbal, 162 in Quant and got admitted to 3 schools in USA.`,
    name: `Toluwani`,
    location: `Lagos, Nigeria`
  },
  highestScoreContent: (state, vicinity) => {
    return {
      heading: `Result-driven GRE preparation`,
      features: [
        {
          heading: `The Best GRE Tutors`,
          paragraph: `Every GRE tutor has a 95th+ percentile score, a passion for teaching and consistently high ratings from students.`,
          icon: `exam-target`
        },
        {
          heading: `In-depth Study & Practice`,
          paragraph: `Practice extensively with the same level of difficulty you'll face in the GRE and learn the techniques to get higher scores.`,
          icon: `exam-book`
        },
        {
          heading: `Fitted to Your Schedule`,
          paragraph: `Every lesson is planned around your schedule whether you want a crash GRE prep, a few months study or weekend lessons.`,
          icon: `exam-calender`
        }
      ]
    };
  },
  guaranteeContent: {
    heading: `We’ve got you covered`,
    bgImage: "/static/img/exams/tuteria-tutor-teaching-client-ielts.png",
    paragraph: `We are committed to your GRE success, and work closely with your tutor to ensure you achieve your desired score.`
  },
  howtoContent: {
    heading: `Get a tutor in 3 simple steps`,
    features: [
      {
        heading: `Place a tutor request`,
        paragraph: `Fill a quick request form to tell us your goal, schedule and sections of GRE you need help with.`,
        number: `1`
      },
      {
        heading: `Meet your perfect tutor`,
        paragraph: `You'll receive options of expert GRE tutors near you and you can select your preferred tutor.`,
        number: `2`
      },
      {
        heading: `Study and pass GRE!`,
        paragraph: `Begin lessons immediately and learn what it takes to pass your GRE exam with a high score.`,
        number: `3`
      }
    ]
  },
  secondTestimonialContent: {
    testimonial: `Getting a tutor was the best decision I made. My tutor was extremely professional. He taught with so much expertise and this made me confident to write the exams. Thankfully, I got the school of my choice for the executive MBA program I applied for.`,
    name: `Brendan Ndifon`,
    location: `Abuja, Nigeria`
  },
  benefitsContent: {
    heading: `Enjoy the benefits of passing GRE`,
    subheading: `No matter your reason for taking GRE, we’ll help you reach your goal`,
    benefits: [
      {
        heading: `MBA Admission`,
        paragraph: `Get the GRE score you need to secure admission into top business schools like Kellogs, Harvard, Wharton, Columbia etc.`,
        image: `/static/img/exams/study-abroad-pass-ielts-tuteria.png`
      },
      {
        heading: `Postgraduate Studies`,
        paragraph: `Planning to enroll for M.Sc or Ph.D in America? We'll help you get the high GRE score you need to complete your application.`,
        image: `/static/img/exams/pass-plab-pass-ielts-tuteria.png`
      }
    ]
  },
  tutorDisplayContent: {
    heading: `Our tutors deliver the best results`,
    paragraph: `See what clients say about them`,
    tutors: [
      {
        name: "Mubarak",
        title: "GRE Specialist Tutor",
        photo_url: "/static/img/exams/Mubarak-tuteria-gre-specialist-tutor.jpg",
        photo_alt: "Mubarak, GRE & GMAT Tutor on Tuteria",
        client_name: "Damilare",
        client_testimonial: `Mubarak is an exemplary tutor who understands the dynamics of the GRE curriculum. Secondly, regardless of our limited knowledge before the lesson, he helped us navigate through the curriculum with grace. My partner and I sincerely rate him highly, and we recommend him to all persons in search of an expert GRE tutor.`,
        no_of_booking: "12"
      },
      {
        name: "Damilola",
        title: "GRE & GMAT Tutor",
        photo_url: "/static/img/exams/Damilola-tuteria-gmat-tutor.jpg",
        photo_alt: "Damilola, GRE & GMAT Tutor on Tuteria",
        client_name: "Mayowa",
        client_testimonial: `I like Damilola's teaching style, he was able to put me through the quantitative topics I had difficulty with and I had 164 in the exam. He regularly followed up on me to monitor my progress and was always flexible enough to meet my tight schedules.`,
        no_of_booking: "18"
      },
      {
        name: "Leke",
        title: "GRE & GMAT Tutor",
        photo_url: "/static/img/exams/Leke-tuteria-gmat-tutor.png",
        photo_alt: "Leke, GRE & GMAT Tutor on Tuteria",
        client_name: "Adeniyi",
        client_testimonial:
          "Leke is a very brilliant, 99th-percentile GRE tutor. I liked his teaching method. He is patient and has a very good understanding of the GREs. With his help, I increased by score by 16 points. I will recommend him to anyone who requires expert-level GRE tutoring. ",
        no_of_booking: "12"
      }
    ]
  },
  servicesContent: {
    heading: `Why Tuteria?`,
    services: [
      {
        heading: "Our 95% Success rate",
        paragraph:
          "We help you get the results you need, like we have done for hundreds of other GRE students like you.",
        icon: "success-rate"
      },
      {
        heading: "Best-in-class GRE tutors",
        paragraph:
          "We handpick only the best teachers who have proven track record of consistently helping students pass.",
        icon: "best-in-class"
      },
      {
        heading: "Rarely-taught GRE techniques",
        paragraph:
          "We’ll help you improve on your weakest areas using in-depth techniques guaranteed to boost your score.",
        icon: "diamond-icon"
      },
      {
        heading: "Flexible lesson schedules",
        paragraph:
          "Lesson times and location are flexible. You can agree with your tutor on a time that works for you.",
        icon: "schedule"
      },
      {
        heading: "Learn at your pace",
        paragraph: `Start from the basics. Clarify areas you don't understand. Practice GRE extensively. Leave nothing behind.`,
        icon: "study-material"
      },
      {
        heading: "We’re always here for you",
        paragraph:
          "Our team is standing to provide support and ensure you have a pleasant learning experience.",
        icon: "customer-care"
      }
    ]
  },
  ctaSectionContent: {
    heading: `With 320 average and 95% pass rate, we are your best choice for GRE Prep.`,
    buttonText: `Get a tutor`,
    paragraph: `Highly qualified tutors guaranteed for your request.`
  },
  faqSectionContent: {
    heading: `Your questions answered`,
    FAQs: [
      {
        question: "Where will the lessons hold?",
        answer:
          "Lessons hold in the comfort of your home or any other location that works best for you. You can choose to have lessons delivered in-person or online."
      },
      {
        question: "How do you verify your tutors?",
        answer:
          "Each tutor is thoroughly screened for subject expertise, personality, and safety. In fact, before we accept any tutor we verify their government-issued ID cards and online profiles, conduct lengthy interviews, test their knowledge of each subject and verify their guarantors to ensure your peace of mind."
      },
      {
        question: "How does payment work?",
        answer:
          "Lesson cost depends on your location, number of students and lesson duration. You can pay online or via bank transfer when you’ve selected your preferred tutor and are ready to begin lessons."
      },
      {
        question: "What happens if I’m not satisfied with my tutor?",
        answer:
          "In the unlikely event that you’re not satisfied with your tutor, we’ll immediately replace the tutor or refund your balance."
      }
    ],
    contactInfo: [
      {
        icon: "clp-phone",
        children: "0909-452-6878",
        url: "tel:+2349094526878"
      },
      {
        icon: "clp-email",
        children: "info@tuteria.com",
        url: "mailto:info@tuteria.com?subject=Tutor%20Enquiry"
      },
      {
        icon: "whatsapp",
        children: "Chat on Whatsapp",
        url: "http://bit.ly/Whatsapp2Tuteria"
      }
    ]
  },
  onlinePreferenceSection: {
    heading: `Prefer to study for GRE online?`,
    paragraph: `Book online lessons and study via Skype or Hangout from the comfort of your home.`,
    image: `/static/img/exams/lady-studying-online-tuteria.png`
  },
  preFooterSection: {
    heading: `Pass your GRE exams with ease`,
    paragraph: `Get a tutor to help you smash the exam.`,
    image: `/static/img/exams/impact-next-generation-tuteria.png`
  }
};
