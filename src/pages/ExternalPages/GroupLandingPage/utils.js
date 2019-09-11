import { color } from "../../../design-systems";

function getContentType(_kind) {
  return instance => {
    let kind = instance.sys.contentType.sys;
    return kind.id === _kind;
  };
}
function getFields(instance) {
  return instance.fields;
}
function assetFullUrl(field, func) {
  return instance => ({ ...instance, [field]: func(instance[field].sys.id) });
}
function getRelatedData(field, func, isArray = false, removeNull = true) {
  let result = instance => {
    let fieldDataFunc = () => {
      let dd = instance[field];
      dd = dd.map(x => func(x.sys.id));
      dd = dd.filter(x => (removeNull ? Boolean(x) : true));
      return dd;
    };
    return {
      ...instance,
      [field]: isArray ? fieldDataFunc() : func(instance[field].sys.id)
    };
  };
  return result;
}
function getAsset(x) {
  return x.fields.file.url;
}
function _loadSingleOrMultipleData(arr, func) {
  return (record_id, isArray = false) => {
    let result = arr.filter(x => x.sys.id === record_id).map(func);
    return isArray ? result : result[0];
  };
}
function contactInfoItems(x, key) {
  let options = {
    email: {
      icon: "clp-email",
      children: x.email,
      url: `mailto:${x.email}?subject=Tutor%20Enquiry`
    },
    phone: {
      icon: "clp-phone",
      children: x.phone,
      url: `tel:+234${x.phone.replace(/-/g, "").slice(1)}`
    },
    whatsapp: {
      icon: "whatsapp",
      children: x.phone,
      url: x.whatsapp
    }
  };
  return options[key];
}
// function loadRecord(data) {
//   return (record_id, isArray = false) => {
//     let result = data.filter(x => x.sys.id === record_id).map(getFields);
//     return isArray ? result : result[0];
//   };
// }
export function processData(contentFulData) {
  let working_data = contentFulData.items;
  let assets = _loadSingleOrMultipleData(
    contentFulData.includes.Asset,
    getAsset
  );
  let relatedRecord = _loadSingleOrMultipleData(
    contentFulData.items,
    getFields
  );
  let faqs = working_data.filter(getContentType("faq")).map(getFields);
  let faq2s = working_data.filter(getContentType("faq2")).map(getFields);
  let contactInfo = working_data
    .filter(getContentType("contactInfo"))
    .map(getFields)[0];
  contactInfo = Object.keys(contactInfo).map(o =>
    contactInfoItems(contactInfo, o)
  );
  // debugger;
  let skillInfo = working_data.filter(getContentType("skillInfo"));
  skillInfo = skillInfo
    .map(getFields)
    .map(assetFullUrl("image", assets))
    .map(getRelatedData("curriculums", relatedRecord, true))
    .map(getRelatedData("courseOutlines", relatedRecord, true));
  // .map(getRelatedData("allowedTutors", relatedRecord, true))

  skillInfo = skillInfo
    .map(getRelatedData("locations", relatedRecord, true))
    .map(x => ({
      ...x,
      curriculums: x.curriculums.map(assetFullUrl("curriculum", assets)),
      locations: x.locations
        .map(getRelatedData("location", relatedRecord))
        .map(getRelatedData("tutors", relatedRecord, true))
        .map(getRelatedData("lessonPlan", relatedRecord, true))
        .map(y => ({
          ...y,
          lessonPlan: y.lessonPlan
            .map(getRelatedData("schedule", relatedRecord, true))
            .map(a => ({
              ...a,
              schedule: a.schedule
                .map(b => ({
                  ...b,
                  start_date: b.startDate,
                  end_date: b.endDate,
                  startDate: new Date(b.startDate),
                  endDate: new Date(b.endDate)
                }))
                .sort((u, v) => u.startDate.getTime() - v.startDate.getTime())
            })),
          tutors: y.tutors.map(assetFullUrl("profilePic", assets)),
          reviews: y.reviews ? y.reviews : []
        }))
        .map(getRelatedData("reviews", relatedRecord, true))
    }));
  // .map(x => ({
  //   ...x,
  //   allowedTutors: x.allowedTutors
  //     .map(assetFullUrl("profilePic", assets))
  //     // .map(getRelatedData("location", relatedRecord, false))
  //     .map(x => ({ ...x, skill: "" }))
  // }));
  // let reviews = working_data
  //   .filter(getContentType("review"))
  //   .map(getFields)
  //   .map(assetFullUrl("profilePic", assets));

  console.log(skillInfo);
  return {
    faqs,
    faq2s,
    contactInfo,
    // courseOutline,
    // pricings,
    // tutors,
    skillInfo
    // reviews
  };
}

export function getTutorDetails(name, data) {
  let { tutors, ...rest } = data;
  let tutor = tutors.filter(x => x.lastName === name)[0];
  return { tutor, ...rest };
}

export function orderByLocation(data) {
  // let locations = [].concat(...data.map(x=>x.locations)).map(x=>x.name)
  let skillsWithLocations = [];
  let tutors = [].concat(
    ...[].concat(...data.map(element => element.locations.map(x => x.tutors)))
  );
  data.forEach(element => {
    let { locations } = element;
    locations.forEach(location => {
      // let skill = location;
      let { locations, ...skill } = element;
      let lastNames = location.tutors.map(x => x.lastName);
      skill = { ...skill, ...location, exam: skill.name };
      // console.log({skill,location})
      // skill.location = location.name;
      skill.otherTutors = tutors
        .filter(
          x => !lastNames.includes(x.lastName)
          // && x.location.state === location.state
        )
        .map(x => ({ ...x, location: skill.name }));
      skill.allowedTutors = skill.tutors;
      // skill.allowedTutors = skill.allowedTutors.filter(
      //   x => x.location.name === location.name
      // );
      skillsWithLocations.push(skill);
    });
  });
  return skillsWithLocations;
}

export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function formatReactStaticData(response, use = true) {
  let newSkills = orderByLocation(response.skillInfo);
  let others = newSkills.map(x => ({
    name: x.name,
    url: `ielts-lessons/${x.name}`,
    tutor: x.allowedTutors.map(x => x.email)
  }));
  const getLocation = email => {
    let record = others.find(x => x.tutor.includes(email));
    return record;
  };
  // debugger;
  let data = newSkills.map(x => {
    let teaches = x.name;
    let tutors = x.allowedTutors.map(x => ({
      firstName: x.firstName,
      lastName: x.lastName,
      accolades: x.accolades,
      profilePic: x.profilePic,
      summary: x.summary,
      phone_no: x.phoneNo,
      ratingScore: x.ratingScore,
      location: x.location,
      email: x.email
    }));
    return {
      exam: x.exam,
      name: x.name,
      image: x.image,
      body: x.body,
      location: x.location,
      venue: x.venue,
      mapping: x.mapping,
      curriculums: x.curriculums,
      courseOutlines: x.courseOutlines,
      allowedTutors: tutors,
      tutors,
      otherTutors: x.otherTutors.map(x => ({
        firstName: x.firstName,
        lastName: x.lastName,
        accolades: x.accolades,
        profilePic: x.profilePic,
        summary: x.summary,
        ratingScore: x.ratingScore,
        phone_no: x.phoneNo,
        location: getLocation(x.email).name,
        url: getLocation(x.email).url,
        email: x.email
      })),
      lessonPlan: x.lessonPlan,
      reviews: x.reviews
    };
  });
  return use
    ? data.map(x => ({
        faq: response.faqs,
        faq2: response.faq2s,
        contactInfo: response.contactInfo,
        data: x,
        url: `ielts-lessons/${x.name}`
      }))
    : data.map(x => ({
        data: x,
        faq: response.faqs,
        faq2: response.faq2s,
        url: `ielts-lessons/${x.name}`,
        contactInfo: response.contactInfo
      }));
}
const MONTHS = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export function formatGroupDetailSelection(data, props, url) {
  const {
    venue,
    mapping,
    allowedTutors,
    curriculums,
    location: { name, state }
  } = props;
  const {
    lessonPlan: {
      schedule: lessonSchedules,
      icon,
      bullets,
      description,
      button_text,
      summary,
      ...lessonPlanRest
    },
    schedule
  } = data;
  let payload = {
    venue,
    mapping,
    tutor: allowedTutors.map(x => ({
      email: x.email,
      first_name: x.firstName,
      last_name: x.lastName,
      phone_no: x.phone_no,
      profilePic: x.profilePic,
      rating: x.ratingScore
    })),
    curriculums,
    location: name,
    state,
    lessonPlan: lessonPlanRest,
    schedule,
    url
  };
  return payload;
}
function dateFormat(date) {
  let dd = typeof date === "string" ? new Date(date) : date;
  return `${MONTHS[dd.getMonth()]} ${dd.getDate()}, ${dd.getFullYear()}`;
}
function getCurriculum(lessonPlan, curriculums) {
  let r = curriculums.filter(x => x.name === lessonPlan)[0];
  return r.curriculum;
}
function getSelectedTutor(arr, lessonPlan, mapping) {
  let tutor = Object.keys(mapping).filter(
    x => mapping[x].indexOf(lessonPlan) > -1
  )[0];
  return arr.filter(x => x.first_name === tutor)[0];
}
export function generateLessonInfo(payload) {
  let { lessonPlan, schedule, mapping, tutor } = payload;
  let selectedtutor =
    tutor.length > 1
      ? getSelectedTutor(tutor, lessonPlan.type, mapping)
      : tutor[0];
  let curriculum_link = getCurriculum(lessonPlan.type, payload.curriculums);
  return {
    lesson_plan: lessonPlan.type,
    amount: parseFloat(lessonPlan.amount),
    schedule: {
      start_date: `${dateFormat(schedule.startDate)}`,
      date_summary: `${dateFormat(schedule.startDate)} - ${dateFormat(
        schedule.endDate
      )}`,
      summary: schedule.summary,
      duration: schedule.duration
    },
    state: payload.state,
    location: payload.location,
    curriculum_link,
    venue: payload.venue,
    tutor: {
      first_name: selectedtutor.first_name,
      last_name: selectedtutor.last_name,
      email: selectedtutor.email,
      phone_no: selectedtutor.phone_no
    }
  };
}

export const getAllSchedules = plans => {
  let schedules = [];
  plans.forEach(({ schedule }) => {
    schedules.push(...schedule);
  });
  return schedules;
};

export const sortSchedulesByStartDate = plans => {
  let schedules = getAllSchedules(plans);
  return schedules
    .map(schedule => {
      if (!schedule.slots) {
        schedule.slots = 0;
      }
      if (!schedule.maxSlotCount) {
        schedule.maxSlotCount = 15;
      }
      return schedule;
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
};

export const getLatestDates = schedules => {
  return schedules.filter(schedule => {
    let condition =
      new Date(schedule.startDate).getTime() - new Date().getTime();
    if (condition > 0) {
      return schedule;
    }
  });
};

export const getLatestSchedule = plans => {
  let schedules = sortSchedulesByStartDate(plans);
  let latestDates = getLatestDates(schedules);
  return latestDates[0];
};

export const getLozengeBgColor = remainingSlot => {
  if (remainingSlot <= 15 && remainingSlot > 10) {
    return color.green.primary;
  } else if (remainingSlot <= 9 && remainingSlot > 5) {
    return color.orange.primary;
  } else {
    return color.red.darker;
  }
};
