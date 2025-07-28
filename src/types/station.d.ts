export interface Station {
  locationName: string;
  voteStatus: string;
  latitude: number;
  longitude: number;
  metroTransfer: MetroTransfer[];
  travelTime?: number;
  locationId: number;
}
