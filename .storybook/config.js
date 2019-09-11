import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/FormsetContainer.js");
  require("../stories/Divider.js");
  require("../stories/TutorLandingPage");
  require("../stories/Button.js");
  require("../stories/FormFields.js");
  require("../stories/Text.js");
  require("../stories/Icon");
  require("../stories/CompoundComponents");
  require("../stories/TutorApplicationComponents.js");
  require("../stories/ApplicationPages.js");
  require("../stories/QualificationComponent.js");
  require("../stories/ImageUploadModal.js");
  require("../stories/SubjectFlowPages.js");
  require("../stories/SubjectFlowcomponents.js");
  require("../stories/QuizFlowPage");
  require("../stories/VerificationPage");
  require("../stories/SubjectDetailsPage");
  require("../stories/QuestionKind");
  require("../stories/ClientRequest");
  require("../stories/ExamFlow");
  require("../stories/LandingPages");
  require("../stories/TutorGroupPages");
  require("../stories/LandingPageComponents");
  // You can require as many stories as you need.
}

configure(loadStories, module);
