import { NbMenuItem } from '@nebular/theme';


// export const adminNavItems: NbMenuItem[] = [
//   {
//     title: 'Open Cover',
//     icon: 'icon-cursor',
//     children: [
//       {
//         title: 'New Open Cover',
//         link: '/Marine/new-open-cover/new-open-cover-form',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Exist Open Cover',
//         link: '/Marine/new-open-cover/exist-opencover',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Portfoilo',
//         link: '/Marine/portfolio',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Pending To Accept',
//         link: '/Marine/pendingtoaccept',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Copy Open Cover',
//         link: '/Marine/copyquoteadmin',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Expired Open Cover',
//         link: '/Marine/expired',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Renewal Pending',
//         link: '/Marine/renewalpending',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Lapsed Policies',
//         link: '/Marine/lappsedpolicy',
//         icon: 'icon-cursor',
//       },

//     ],
//   },
//   {
//     title: 'Referral',
//     link: '/Marine/admin-referral/pending-quote',
//     icon: 'icon-cursor',
//   },
//   {
//     title: 'Masters',
//     icon: 'icon-cursor',
//     children: [
//       {
//         title: 'Bank Master',
//         link: '/Marine/masters/bank-master/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Conveyance',
//         link: '/Marine/masters/conveyance/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Country Master',
//         link: '/Marine/masters/country/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Country Cover',
//         link: '/Marine/masters/country-cover/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Commodity',
//         link: '/Marine/masters/commodity/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Commodity Excess',
//         link: '/Marine/masters/commodity-excess/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Cover',
//         link: '/Marine/masters/cover/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Deposit Master',
//         icon: 'icon-cursor',
//         link: '/Marine/deposit-master/view',
//       },

//       {
//         title: 'War Rate Master',
//         link: '/Marine/masters/war-rate/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Package Master',
//         link: '/Marine/masters/package/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Sale Term Master',
//         link: '/Marine/masters/sale-term/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Tolerance Master',
//         link: '/Marine/masters/tolerance/view',
//         icon: 'icon-cursor',
//       },

//       {
//         title: 'Settling Agent',
//         link: '/Marine/masters/settling-agent/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Exchange Master',
//         link: '/Marine/masters/exchange-master/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Currency Master',
//         link: '/Marine/masters/currency/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Extra Cover',
//         link: '/Marine/masters/extra-cover/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Mode of Transport',
//         link: '/Marine/masters/transport/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Warranty Master',
//         link: '/Marine/masters/warranty/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Constant Master',
//         link: '/Marine/masters/constant/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Exclusion Master',
//         link: '/Marine/masters/exclusion/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'City',
//         link: '/Marine/masters/city/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Clause ID',
//         link: '/Marine/masters/clause/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Wsrcc Cover',
//         link: '/Marine/masters/wsrcc/view',
//         icon: 'icon-cursor',
//       },

//       {
//         title: 'Error',
//         link: '/Marine/masters/error/view',
//         icon: 'icon-cursor',
//       },
//       {
//         title: 'Sales Executive Master',
//         link: '/Marine/masters/sales-exe/view',
//         icon: 'icon-cursor',
//       },
//     ],
//   },
//   {
//     title: 'Portfolio',
//     link: '/Marine/adminportfolio',
//     icon: 'icon-cursor',
//   },
//   {
//     title: 'Marine Certificate Integration',
//     link: '/marine-opencover/quotes/aki-doc-admin',
//     icon: 'icon-cursor',
//   },

//   {
//     title: 'Reports',
//     icon: 'icon-cursor',
//     children: [
//       {

//         title: 'Branch Reports',
//         link: '/Marine/branchreport',
//         icon: 'icon-cursor',
//       },
//       {

//         title: 'Reports',
//         link: '/Marine/adminreport',
//         icon: 'icon-cursor',
//       },
//       {

//         title: 'Open Cover Reports',
//         link: '/Marine/opencoverreport',
//         icon: 'icon-cursor',
//       },

//     ]
//   },


// ];

export const adminNavItems: NbMenuItem[] = [
  {
    title: 'Open Cover',
    icon: 'shield-outline',
    children: [
      { title: 'New Open Cover', link: '/Marine/new-open-cover/new-open-cover-form', icon: 'plus-circle-outline' },
      { title: 'Exist Open Cover', link: '/Marine/new-open-cover/exist-opencover', icon: 'file-text-outline' },
      { title: 'Portfoilo', link: '/Marine/portfolio', icon: 'briefcase-outline' },
      { title: 'Pending To Accept', link: '/Marine/pendingtoaccept', icon: 'clock-outline' },
      { title: 'Copy Open Cover', link: '/Marine/copyquoteadmin', icon: 'copy-outline' },
      { title: 'Expired Open Cover', link: '/Marine/expired', icon: 'alert-triangle-outline' },
      { title: 'Renewal Pending', link: '/Marine/renewalpending', icon: 'refresh-outline' },
      { title: 'Lapsed Policies', link: '/Marine/lappsedpolicy', icon: 'close-circle-outline' },
    ],
  },
  {
    title: 'Referral',
    link: '/Marine/admin-referral/pending-quote',
    icon: 'shuffle-2-outline',
  },
  {
    title: 'Masters',
    icon: 'settings-2-outline',
    children: [
      { title: 'Bank Master', link: '/Marine/masters/bank-master/view', icon: 'credit-card-outline' },
      { title: 'Conveyance', link: '/Marine/masters/conveyance/view', icon: 'car-outline' },
      { title: 'Country Master', link: '/Marine/masters/country/view', icon: 'globe-outline' },
      { title: 'Commodity', link: '/Marine/masters/commodity/view', icon: 'cube-outline' },
      { title: 'Cover', link: '/Marine/masters/cover/view', icon: 'shield-outline' },
      { title: 'Deposit Master', link: '/Marine/deposit-master/view', icon: 'trending-up-outline' },
      { title: 'War Rate Master', link: '/Marine/masters/war-rate/view', icon: 'shield-off-outline' },
      { title: 'Package Master', link: '/Marine/masters/package/view', icon: 'layers-outline' },
      { title: 'Sale Term Master', link: '/Marine/masters/sale-term/view', icon: 'file-text-outline' },
      { title: 'Settling Agent', link: '/Marine/masters/settling-agent/view', icon: 'people-outline' },
      { title: 'Currency Master', link: '/Marine/masters/currency/view', icon: 'briefcase-outline' },
      { title: 'Extra Cover', link: '/Marine/masters/extra-cover/view', icon: 'plus-square-outline' },
      { title: 'Mode of Transport', link: '/Marine/masters/transport/view', icon: 'navigation-2-outline' },
      { title: 'Warranty Master', link: '/Marine/masters/warranty/view', icon: 'alert-circle-outline' },
      { title: 'Exclusion Master', link: '/Marine/masters/exclusion/view', icon: 'slash-outline' },
      { title: 'Clause ID', link: '/Marine/masters/clause/view', icon: 'text-outline' },
      { title: 'Sales Executive', link: '/Marine/masters/sales-exe/view', icon: 'person-add-outline' },
    ],
  },
  {
    title: 'Portfolio',
    link: '/Marine/adminportfolio',
    icon: 'pie-chart-outline',
  },
  {
    title: 'Marine Certificate Integration',
    link: '/marine-opencover/quotes/aki-doc-admin',
    icon: 'file-done-outline',
  },
  {
    title: 'Reports',
    icon: 'bar-chart-2-outline',
    children: [
      { title: 'Branch Reports', link: '/Marine/branchreport', icon: 'pin-outline' },
      { title: 'Admin Reports', link: '/Marine/adminreport', icon: 'file-text-outline' },
      { title: 'Open Cover Reports', link: '/Marine/opencoverreport', icon: 'book-open-outline' },
    ]
  },
];