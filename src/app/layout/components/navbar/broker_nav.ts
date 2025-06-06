import { NbMenuItem } from '@nebular/theme';


export const borkerNavItems: NbMenuItem[] = [
  {
    title: 'New Quote',
    link: '/marine-opencover/new-quotes',
    icon: 'edit-2-outline',
    expanded: false,
  },
  {
    title: 'Quote Register',
    icon: 'grid-outline',
    expanded: false,
    children: [
      {
        title: 'Existing Quote',
        link: '/marine-opencover/quotes/exist-quote',
        icon: 'icon-puzzle',
      },
      {
        title: 'Lapsed Quote',
        link: '/marine-opencover/quotes/lapsed-quote',
        icon: 'icon-cursor',
      },
      {
        title: 'Rejected Quote',
        link: '/marine-opencover/quotes/rejected-quote',
        icon: 'icon-cursor',
      },
    ],
  },
  {
    title: 'Referral Certificate',
    icon: 'grid-outline',
    expanded: false,
    children: [
      {
        title: 'Referral Approved',
        link: '/marine-opencover/referral/referral-approved',
        icon: 'icon-puzzle',
      },
      {
        title: 'Referral Unapproved',
        link: '/marine-opencover/referral/referral-unapproved',
        icon: 'icon-cursor',
      },
      {
        title: 'Referral Rejected',
        link: '/marine-opencover/referral/referral-rejected',
        icon: 'icon-cursor',
      },
    ],
  },
  {
    title: 'Portfoilo',
    icon: 'grid-outline',
    expanded: false,
    children: [
      {
        title: 'Policies',
        link: '/marine-opencover/portfolio/grid',
        icon: 'icon-puzzle',
      },
      {
        title: 'Canceled Policies',
        link: '/marine-opencover/portfolio/canceled-policies',
        icon: 'icon-cursor',
      },
      {
        title: 'Failed Policies',
        link: '/marine-opencover/portfolio/failed-policies',
        icon: 'icon-cursor',
      },
    ],
  },
  {
    title: 'Endorsement',
    link: '/marine-opencover/endorsement',
    icon: 'person-outline',
    expanded: false,
  },
  {
    title: 'Customer',
    link: '/marine-opencover/customer/customer-grid',
    icon: 'person-outline',
    expanded: false,
  },
  {
    title: 'Report',
    link: '/marine-opencover/report',
    icon: 'message-square-outline',
    expanded: false,
  },
  {
    title: 'Copy Quote',
    link: '/marine-opencover/copy-quote',
    icon: 'clipboard-outline',
    expanded: false,
  },
  {
    title: 'Search',
    link: '/marine-opencover/search',
    icon: 'search-outline',
    expanded: false,
  },

];



