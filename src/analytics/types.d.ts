export interface IEvent {
  eventName: string;
  params?: any;
}

export interface IScreen {
  screenName: string;
  screenType: string;
  userId?: string;
}
