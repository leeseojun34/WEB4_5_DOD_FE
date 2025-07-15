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
