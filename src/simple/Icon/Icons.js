import React from "react";
import styled, { keyframes } from "styled-components";
import { button_styles } from "../../siteStyle";
import Loadable from "react-loadable";
function MyLoadingComponent() {
  return <div />;
}
export function generateLoadableWithDataComponent(func, key = "default") {
  return Loadable.Map({
    loading: MyLoadingComponent,
    loader: {
      Component: func
    },
    render(loaded, props) {
      let Component = loaded.Component[key];
      return <Component {...props} />;
    }
  });
}

export default {
  bulb: generateLoadableWithDataComponent(() => import("./svgs"), "BulbIcon"),
  "lightbulb-o": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "BulbIcon"
  ),
  check: generateLoadableWithDataComponent(() => import("./svgs"), "CheckIcon"),
  naira: generateLoadableWithDataComponent(() => import("./svgs"), "Naira"),
  "arrows-v": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "EnlargedVerticalIcon"
  ),
  "check-circle": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "CheckIcon"
  ),
  "chevron-up": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ChevronUpIcon"
  ),
  "chevron-down": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ChevronDownIcon"
  ),
  "chevron-right": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ChevronRightIcon"
  ),
  "chevron-left": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ChevronLeftIcon"
  ),
  edit: generateLoadableWithDataComponent(() => import("./svgs"), "EditIcon"),
  "exclamation-circle": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ExclamationIcon"
  ),
  "world-pin": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "WorldPin"
  ),
  pencil: generateLoadableWithDataComponent(() => import("./svgs"), "EditIcon"),
  delete: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "DeleteIcon"
  ),
  close: generateLoadableWithDataComponent(() => import("./svgs"), "CloseIcon"),
  calender: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "CalenderIcon"
  ),
  select: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "SelectIcon"
  ),
  "document-time": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "DocumentTimeIcon"
  ),
  "align-left": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "AlignLeftIcon"
  ),
  calendar: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "CalendarIcon"
  ),
  leftArrow: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "LeftArrowIcon"
  ),
  watch: generateLoadableWithDataComponent(() => import("./svgs"), "WatchIcon"),
  refresh: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "RefreshIcon"
  ),
  image: generateLoadableWithDataComponent(() => import("./svgs"), "ImageIcon"),
  list: generateLoadableWithDataComponent(() => import("./svgs"), "listIcon"),
  lock: generateLoadableWithDataComponent(() => import("./svgs"), "lockIcon"),
  phone: generateLoadableWithDataComponent(() => import("./svgs"), "phoneIcon"),
  facebook: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "facebookIcon"
  ),
  facebook2: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "facebookIcon2"
  ),
  facebook3: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "facebookIcon3"
  ),
  fancyIcon: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "fancyIcon"
  ),
  linkedIn: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "linkedInIcon"
  ),
  linkedin: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "linkedInIcon"
  ),
  googlePlus: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "googlePlusIcon"
  ),
  google: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "googleIcon"
  ),
  email: generateLoadableWithDataComponent(() => import("./svgs"), "emailIcon"),
  email1: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "emailIcon1"
  ),
  emailSolid: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "EmailSolid"
  ),
  phoneSolid: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "PhoneSolid"
  ),
  fbSimple: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "fbSimpleIcon"
  ),
  checked: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "checkedIcon"
  ),
  shield: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "shieldIcon"
  ),
  moneybag: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "moneybagIcon"
  ),
  handshake: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "handShakeIcon"
  ),
  lesson: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "LessonIcon"
  ),
  subjects: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "SubjectIcon"
  ),
  tutors: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "TutorsIcon"
  ),
  wallet: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "WalletIcon"
  ),
  "tuteria-trust": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "TuteriaTrust"
  ),
  "tuteria-payment": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "TuteriaPaymentIcon"
  ),
  "tuteria-teach": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "TuteriaTeachIcon"
  ),
  "exam-book": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ExamBook"
  ),
  "exam-target": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ExamTarget"
  ),
  "exam-calender": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ExamCalender"
  ),
  heart: generateLoadableWithDataComponent(() => import("./svgs"), "HeartIcon"),
  help: generateLoadableWithDataComponent(() => import("./svgs"), "HelpIcon"),
  user: generateLoadableWithDataComponent(() => import("./svgs"), "UserIcon"),
  time: generateLoadableWithDataComponent(() => import("./svgs"), "TimeIcon"),
  plus: generateLoadableWithDataComponent(() => import("./svgs"), "PlusIcon"),
  "arrow-left": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ArrowLeftIcon"
  ),
  rotate: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "RotateIcon"
  ),
  "upload-monitor": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "UploadMonitorIcon"
  ),
  "quality-tutor": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "HighQualityTutor"
  ),
  "safe-and-trusted": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "SafeAndTrusted"
  ),
  "tailored-to-child": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "TailoredToChild"
  ),
  "circular-shield": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "CircularShield"
  ),
  "open-book": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "OpenBook"
  ),
  "three-up-arrows": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "ThreeUpArrow"
  ),
  "open-book-2": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "OpenBook2"
  ),

  abc: generateLoadableWithDataComponent(() => import("./svgs"), "ABC"),

  "home-school": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Homeschool"
  ),
  "special-user": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "SpecialUser"
  ),
  "five-stars": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "FiveStars"
  ),
  verified: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Verified"
  ),
  "nigeria-flag": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "NigeriaFlag"
  ),
  "shield-2": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Shield2"
  ),
  "shield-3": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Shield3"
  ),
  "clp-email": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "EmailSolid"
  ),
  "clp-phone": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "PhoneSolid"
  ),
  "circle-n": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "FaCircle"
  ),
  "customer-care": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "CustomerCare"
  ),
  "study-material": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "StudyMaterial"
  ),
  schedule: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Schedule"
  ),
  "best-in-class": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "BestInClass"
  ),
  "success-rate": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "SuccessRate"
  ),
  "diamond-icon": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "DiamondIcon"
  ),
  whatsapp: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "WhatsappIcon"
  ),
  pin: generateLoadableWithDataComponent(() => import("./svgs"), "PinIcon"),
  ticket: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "TicketIcon"
  ),
  award: generateLoadableWithDataComponent(() => import("./svgs"), "AwardIcon"),
  "fancy-check": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "FancyCheckIcon"
  ),
  "check-circle-outline": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "CheckCircle"
  ),
  "orange-arrows": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "OrangeArrows"
  ),
  "check-mark": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Checkmark"
  ),
  fast: generateLoadableWithDataComponent(() => import("./svgs"), "Fast"),
  send: generateLoadableWithDataComponent(() => import("./svgs"), "Send"),
  briefcase: generateLoadableWithDataComponent(
    () => import("./svgs"),
    "Briefcase"
  ),
  "refund-icon": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "RefundIcon"
  ),
  "map-marker": generateLoadableWithDataComponent(
    () => import("./svgs"),
    "MapMarker"
  )
  // time: DocumentTimeIcon2
};
