import { defineEventHandler, getQuery } from "h3";
import { useTranslation } from "../../i18n/useTranslation";

import type { Timetable } from "../../../i18n/timetable";
import type { Speaker } from "../../../i18n/speaker";
import type { Sponsor } from "~~/i18n/sponsor";

export default defineEventHandler(async (event): Promise<Timetable> => {
  const query = getQuery(event);
  const locale = (query.locale as string) || "ja";
  const t = useTranslation(locale);

  const {
    SESSION_SPEAKERS,
    LT_SPEAKERS,
    PANEL_DISCUSSION_SPEAKERS,
    STUDENT_SUPPORT_SPEAKERS,
  } = locale === "ja"
    ? await import(`../../../i18n/ja/speakers`)
    : await import(`../../../i18n/en/speakers`);

  const {
    SPONSORS,
  } = locale === "ja"
    ? await import(`../../../i18n/ja/sponsors`)
    : await import(`../../../i18n/en/sponsors`);

  function getSpeaker(id: string): Speaker {
    const speaker = SESSION_SPEAKERS.find(s => s.id === id);
    if (!speaker) {
      throw new Error(`Speaker not found: ${id}`);
    }
    return speaker;
  }

  function getSponsor(id: string): Sponsor {
    const sponsor = [
      ...SPONSORS.PLATINA,
      ...SPONSORS.GOLD,
      ...SPONSORS.SILVER,
      ...SPONSORS.BRONZE,
      ...SPONSORS.CREATIVE,
      ...SPONSORS.OPTION_ONLY,
    ].find(s => s.id === id);

    if (!sponsor) {
      throw new Error(`Sponsor not found: ${id}`);
    }
    return sponsor;
  }

  // for student support program
  const lycorp = getSponsor("lycorp");
  const plaid = getSponsor("plaid");
  const studio = getSponsor("studio");

  return {
    id: "timetable",
    rows: [
      {
        id: "",
        time: "9:00",
        cells: [
          {
            id: "open",
            type: "schedule",
            title: t("timetable.openingReception"),
            startTime: "09:00",
            endTime: "10:00",
            colspan: 4,
            rowspan: 6,
          },
        ],
      },
      {
        id: "row_9",
        cells: [],
      },
      {
        id: "row_10",
        cells: [],
      },
      {
        id: "row_11",
        cells: [],
      },
      {
        id: "row_12",
        cells: [],
      },
      {
        id: "row_13",
        cells: [],
      },
      {
        id: "",
        time: "10:00",
        cells: [
          {
            id: "opening",
            type: "session",
            title: t("timetable.opening"),
            colspan: 2,
            rowspan: 1,
            startTime: "10:00",
            endTime: "10:10",
            track: "hacomono",
            speakers: [],
          },
          {
            id: "1000blank",
            type: "schedule",
            title: "",
            colspan: 1,
            rowspan: 9,
            track: "blank",
            isPcOnly: true,
          },
          {
            id: "1000blank",
            type: "schedule",
            title: "",
            colspan: 1,
            rowspan: 10,
            track: "blank",
            isPcOnly: true,
          },
        ],
      },
      {
        id: "",
        time: "10:10",
        cells: [
          {
            id: "evan_you",
            type: "session",
            title: t("timetable.keynote"),
            colspan: 2,
            rowspan: 6,
            startTime: "10:10",
            endTime: "10:50",
            speakers: [getSpeaker("yyx990803")],
            track: "hacomono",
          },
        ],
      },
      {
        id: "row_16",
        cells: [],
      },
      {
        id: "row_17",
        cells: [],
      },
      {
        id: "row_18",
        cells: [],
      },
      {
        id: "row_19",
        cells: [],
      },
      {
        id: "",
        cells: [],
      },
      {
        id: "1055",
        time: "11:55",
        cells: [
          {
            id: "sponsor-session01",
            type: "session",
            title: t("timetable.platinumSponsorSession"),
            colspan: 1,
            rowspan: 1,
            startTime: "10:55",
            endTime: "11:05",
            track: "hacomono",
          },
          {
            id: "sponsor-session02",
            type: "session",
            title: t("timetable.platinumSponsorSession"),
            colspan: 1,
            rowspan: 1,
            track: "mates",
            startTime: "10:55",
            endTime: "11:05",
          },
        ],
      },
      {
        id: "1105",
        time: "11:05",
        cells: [
          {
            id: "sponsor-session03",
            type: "session",
            title: t("timetable.platinumSponsorSession"),
            colspan: 1,
            rowspan: 1,
            startTime: "11:05",
            endTime: "11:15",
            track: "hacomono",
          },
          {
            id: "sponsor-session04",
            type: "session",
            title: t("timetable.platinumSponsorSession"),
            colspan: 1,
            rowspan: 1,
            track: "mates",
            startTime: "11:05",
            endTime: "11:15",
          },
        ],
      },
      {
        id: "1120",
        time: "11:20",
        cells: [
          {
            id: "lunch",
            type: "schedule",
            title: t("timetable.lunchTime"),
            colspan: 3,
            rowspan: 11,
          },
        ],
      },
      {
        id: "1130",
        time: "11:30",
        cells: [
          {
            id: "student-support",
            type: "event",
            title: t("timetable.studentSupportProgramSessionTitle"),
            colspan: 1,
            rowspan: 6,
            track: "cyberAgent",
            startTime: "11:30",
            endTime: "12:30",
            link: "student-support-contents",
            speakers: [
              ...STUDENT_SUPPORT_SPEAKERS as Speaker[],
              // note: omit avatarUrl and colors
              {
                id: "lycorp",
                name: lycorp.name,
              } as Speaker,
              {
                id: "plaid",
                name: plaid.name,
              } as Speaker,
              {
                id: "studio",
                name: studio.name,
              } as Speaker,
            ],
          },
        ],
      },
      {
        id: "row_25",
        cells: [],
      },
      {
        id: "row_26",
        cells: [],
      },
      {
        id: "row_27",
        cells: [],
      },
      {
        id: "row_28",
        cells: [],
      },
      {
        id: "row_29",
        cells: [],
      },
      {
        id: "1230",
        time: "12:30",
        cells: [
          {
            id: "Break01",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 4,
          },
        ],
      },
      {
        id: "row_31",
        cells: [],
      },
      {
        id: "row_32",
        cells: [],
      },
      {
        id: "row_33",
        cells: [],
      },
      {
        id: "1250",
        time: "12:50",
        cells: [
          {
            id: "danielroe",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "12:50",
            endTime: "13:20",
            speakers: [getSpeaker("danielroe")],
            track: "hacomono",
          },
          {
            id: "leaysgur",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "12:50",
            endTime: "13:20",
            speakers: [getSpeaker("leaysgur")],
            track: "mates",
          },
          {
            id: "cell_33_3",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "12:50",
            endTime: "13:20",
            speakers: [getSpeaker("yamanoku")],
            track: "feature",
          },
          {
            id: "1",
            type: "event",
            title: t("timetable.beginnerHandsOn"),
            colspan: 1,
            rowspan: 11,
            track: "cyberAgent",
            startTime: "12:50",
            endTime: "14:50",
            link: "hands-on",
          },
        ],
      },
      {
        id: "row_35",
        cells: [],
      },
      {
        id: "row_36",
        cells: [],
      },
      {
        id: "1340",
        time: "13:40",
        cells: [
          {
            id: "Break02",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 3,
            rowspan: 1,
          },
        ],
      },
      {
        id: "1335",
        time: "13:35",
        cells: [
          {
            id: "johnsoncodehk",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            speakers: [getSpeaker("johnsoncodehk")],
            startTime: "13:35",
            endTime: "14:05",
            track: "hacomono",
          },
          {
            id: "hi-ogawa",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            speakers: [getSpeaker("hi-ogawa")],
            track: "mates",
            startTime: "13:35",
            endTime: "14:05",
          },
          {
            id: "neginasu",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            speakers: [getSpeaker("neginasu")],
            track: "feature",
            startTime: "13:35",
            endTime: "14:05",
          },
        ],
      },
      {
        id: "row_39",
        cells: [],
      },
      {
        id: "row_40",
        cells: [],
      },
      {
        id: "1425",
        time: "14:25",
        cells: [
          {
            id: "Break03",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 3,
            rowspan: 1,
          },
        ],
      },
      {
        id: "1420",
        time: "14:20",
        cells: [
          {
            id: "akryum",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "14:20",
            endTime: "14:50",
            speakers: [getSpeaker("akryum")],
            track: "hacomono",
          },
          {
            id: "toddeTV",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "14:20",
            endTime: "14:50",
            speakers: [getSpeaker("toddeTV")],
            track: "mates",
          },
          {
            id: "naitokosuke",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "14:20",
            endTime: "14:50",
            speakers: [getSpeaker("naitokosuke")],
            track: "feature",
          },
        ],
      },
      {
        id: "row_43",
        cells: [],
      },
      {
        id: "row_44",
        cells: [],
      },
      {
        id: "1510",
        time: "15:10",
        cells: [
          {
            id: "Break05",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 4,
            rowspan: 1,
          },
        ],
      },
      {
        id: "1505",
        time: "15:05",
        cells: [
          {
            id: "baku89",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "15:05",
            endTime: "15:35",
            speakers: [getSpeaker("baku89")],
            track: "hacomono",
          },
          {
            id: "vados-cosmonic",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "15:05",
            endTime: "15:35",
            speakers: [getSpeaker("vados-cosmonic")],
            track: "mates",
          },
          {
            id: "hiranuma",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "15:05",
            endTime: "15:35",
            speakers: [getSpeaker("hiranuma")],
            track: "feature",
          },
          {
            id: "2",
            type: "event",
            title: t("timetable.intermediateHandsOn"),
            colspan: 1,
            rowspan: 15,
            track: "cyberAgent",
            startTime: "15:05",
            endTime: "17:05",
            link: "hands-on",
          },
        ],
      },
      {
        id: "row_47",
        cells: [],
      },
      {
        id: "row_48",
        cells: [],
      },
      {
        id: "1535",
        cells: [
          {
            id: "Break06",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 2,
            isPcOnly: true,
          },
          {
            id: "Break07",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 1,
            isPcOnly: true,
          },
          {
            id: "Break08",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 2,
            isPcOnly: true,
          },
        ],
      },
      {
        id: "1545",
        cells: [
          {
            id: "wattanx",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "15:45",
            endTime: "16:15",
            speakers: [getSpeaker("wattanx")],
            track: "mates",
          },
        ],
      },
      {
        id: "1550",
        time: "16:10",
        cells: [
          {
            id: "discussion",
            type: "event",
            title: t("timetable.panelDiscussion"),
            colspan: 1,
            rowspan: 8,
            startTime: "15:50",
            endTime: "16:50",
            track: "hacomono",
            link: "panel-discussion",
            speakers: [...PANEL_DISCUSSION_SPEAKERS],
          },
          {
            id: "sayn0",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "15:50",
            endTime: "16:20",
            speakers: [getSpeaker("sayn0")],
            track: "feature",
          },
        ],
      },
      {
        id: "row_52",
        cells: [],
      },
      {
        id: "1615",
        cells: [
          {
            id: "Break06",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 2,
            isPcOnly: true,
          },
        ],
      },
      {
        id: "1615",
        cells: [
          {
            id: "Break06",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 2,
            isPcOnly: true,
          },
        ],
      },
      {
        id: "1625",
        time: "16:25",
        cells: [
          {
            id: "lt",
            type: "lightningTalk",
            title: t("timetable.lightningTalk"),
            colspan: 1,
            rowspan: 8,
            track: "mates",
            startTime: "16:25",
            endTime: "17:25",
            speakers: [...LT_SPEAKERS],
          },
        ],
      },
      {
        id: "1635",
        time: "16:35",
        cells: [
          {
            id: "yuichkun",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 5,
            startTime: "16:35",
            endTime: "17:05",
            speakers: [getSpeaker("yuichkun")],
            track: "feature",
          },
        ],
      },
      {
        id: "row_57",
        cells: [],
      },
      {
        id: "",
        cells: [],
      },
      {
        id: "1650",
        cells: [
          {
            id: "cell_56_2",
            type: "schedule",
            title: t("timetable.transition"),
            colspan: 1,
            rowspan: 7,
            isPcOnly: true,
          },
        ],
      },
      {
        id: "row_60",
        cells: [],
      },
      {
        id: "1705",
        cells: [
          {
            id: "cell_57_1",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 1,
            isPcOnly: true,
          },
          {
            id: "Break10",
            type: "schedule",
            title: t("timetable.break"),
            colspan: 1,
            rowspan: 1,
            isPcOnly: true,
          },
        ],
      },
      {
        id: "1720",
        time: "17:20",
        cells: [
          {
            id: "antfu",
            type: "session",
            title: "",
            colspan: 1,
            rowspan: 3,
            startTime: "17:20",
            endTime: "17:50",
            speakers: [getSpeaker("antfu")],
            track: "feature",
          },
          {
            id: "vue_quiz",
            type: "event",
            title: "Vue Quiz",
            colspan: 1,
            rowspan: 3,
            startTime: "17:20",
            endTime: "17:50",
            track: "cyberAgent",
            link: "vue-quiz",
          },
        ],
      },
      {
        id: "row_61",
        cells: [
          {
            id: "Break10",
            type: "schedule",
            title: t("timetable.transition"),
            colspan: 1,
            rowspan: 3,
            isPcOnly: true,
          },
        ],
      },
      {
        id: "row_62",
        cells: [],
      },
      {
        id: "",
        cells: [
          {
            id: "close01",
            type: "schedule",
            title: "close",
            colspan: 1,
            rowspan: 11,
            track: "blank",
            isPcOnly: true,
          },
          {
            id: "close02",
            type: "schedule",
            title: "close",
            colspan: 1,
            rowspan: 11,
            track: "blank",
            isPcOnly: true,
          },
        ],
      },
      {
        id: "1800",
        time: "18:00",
        cells: [
          {
            id: "after-party",
            type: "schedule",
            title: t("timetable.afterParty"),
            colspan: 2,
            rowspan: 10,
            startTime: "18:00",
            endTime: "19:30",
          },
        ],
      },
      {
        id: "row_67",
        cells: [],
      },
      {
        id: "row_68",
        cells: [],
      },
      {
        id: "row_69",
        cells: [],
      },
      {
        id: "row_70",
        cells: [],
      },
      {
        id: "row_71",
        cells: [],
      },
      {
        id: "row_72",
        cells: [],
      },
      {
        id: "row_73",
        cells: [],
      },
      {
        id: "row_74",
        cells: [],
      },
      {
        id: "row_75",
        cells: [],
      },
    ],
  };
});
