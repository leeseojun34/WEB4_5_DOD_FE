export interface Station {
  locationName: string;
  latitude: number;
  longitude: number;
  suggestedMemberId?: number;
  voteCount: number;
  metroLines: string[];
  stationColors: string[];
  travelTime: number;
  noVoteCount?: number;
}
