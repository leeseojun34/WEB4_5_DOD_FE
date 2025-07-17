interface ScheduleType {
  title: string;
  description: string;
  meetingType: string;
  maxMember: number;
  groupId: null;
  dateList: {
    dates: date[];
    startTime: string;
    endTime: string;
  }[];
}

export interface ScheduleDetailType {
  eventId: number;
  startTime: string;
  endTime: string;
  location: string;
  specificLocation: string;
  scheduleName: string;
  description: string;
  meetingType: string;
  meetingPlatform: string;
  platformName: string;
  platformUrl: string;
  members: string[];
  workspaces: WorkspaceType[];
}

export type WorkspacePlatformType =
  | "GITHUB"
  | "NOTION"
  | "FIGMA"
  | "GOOGLE_DOS"
  | "MIRO"
  | "CANVA";

export interface WorkspaceType {
  type: string;
  name: string;
  url: string;
}

interface EventInfoType {
  title: string;
  eventId: number;
}
