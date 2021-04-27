import {
  HomeScreen,
  SearchScreen,
  NotificationScreen,
  ProfileScreen,
  CreatePollScreen,
  CreatePollScreen2,
  InviteFriendScreen,
  OtherUserProfile,
  PollDetailScreen,
  UserFriends,
  EditProfile,
  AboutUs,
  PeopleWhoVoted,
} from '../containers';

export const HomeStack = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    key: 'HomeScreen',
  },
  {
    name: 'SearchScreen',
    component: SearchScreen,
    key: 'SearchScreen',
  },
  {
    name: 'NotificationScreen',
    component: NotificationScreen,
    key: 'NotificationScreen',
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    key: 'ProfileScreen',
  },
  {
    name: 'CreatePollScreen',
    component: CreatePollScreen,
    key: 'CreatePollScreen',
  },
  {
    name: 'CreatePollScreen2',
    component: CreatePollScreen2,
    key: 'CreatePollScreen2',
  },
  {
    name: 'InviteFriendScreen',
    component: InviteFriendScreen,
    key: 'InviteFriendScreen',
  },
  {
    name: 'OtherUserProfile',
    component: OtherUserProfile,
    key: 'OtherUserProfile',
  },
  {
    name: 'PollDetailScreen',
    component: PollDetailScreen,
    key: 'PollDetailScreen',
  },
  {
    name: 'UserFriends',
    component: UserFriends,
    key: 'UserFriends',
  },
  {
    name: 'EditProfile',
    component: EditProfile,
    key: 'EditProfile',
  },
  {
    name: 'AboutUs',
    component: AboutUs,
    key: 'AboutUs',
  },
  {
    name: 'PeopleWhoVoted',
    component: PeopleWhoVoted,
    key: 'PeopleWhoVoted',
  },
];
