import { NbMenuItem } from '@nebular/theme';


export const adminNavItems: NbMenuItem[] = [
  {
    title: 'Open Cover',
    icon: 'icon-cursor',
    children: [
      {
        title: 'New Open Cover',
        link: '/Marine/new-open-cover/new-open-cover-form',
        icon: 'icon-cursor',
      },
      {
        title: 'Exist Open Cover',
        link: '/Marine/new-open-cover/exist-opencover',
        icon: 'icon-cursor',
      },
      {
        title: 'Portfoilo',
        link: '/Marine/portfolio',
        icon: 'icon-cursor',
      },
      {
        title: 'Pending To Accept',
        link: '/Marine/pendingtoaccept',
        icon: 'icon-cursor',
      },
      {
        title: 'Copy Open Cover',
        link: '/Marine/copyquoteadmin',
        icon: 'icon-cursor',
      },
      {
        title: 'Expired Open Cover',
        link: '/Marine/expired',
        icon: 'icon-cursor',
      },
      {
        title: 'Renewal Pending',
        link: '/Marine/renewalpending',
        icon: 'icon-cursor',
      },
      {
        title: 'Lapsed Policies',
        link: '/Marine/lappsedpolicy',
        icon: 'icon-cursor',
      },
      
    ],
  },
  
  {
    title: 'Login Creation',
    icon: 'icon-cursor',
    children: [
        {
          title: 'Broker Management',
          link: '/Marine/loginCreation/existingBrokers',
          icon: 'icon-cursor',
        },
        {

          title: 'Admin',
          link: '/Marine/loginCreation/admin',
          icon: 'icon-cursor',
        },
        {

          title: 'Issuer Management',
          link: '/Marine/loginCreation/issuer',
          icon: 'icon-cursor',
        },
      {
        title: 'User Management',
        link: '/Marine/loginCreation/existingUser',
        icon: 'icon-cursor',
      },
    ]
  },


  {
    title: 'Referral',
    link: '/Marine/admin-referral/pending-quote',
    icon: 'icon-cursor',
  },
  {
    title: 'Masters',
    icon: 'icon-cursor',
    children: [
      {
        title: 'Bank Master',
        link: 'masters/bank-master/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Conveyance',
        link: 'masters/conveyance/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Country Master',
        link: 'masters/country/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Country Cover',
        link: 'masters/country-cover/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Commodity',
        link: 'masters/commodity/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Commodity Excess',
        link: 'masters/commodity-excess/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Cover',
        link: 'masters/cover/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Deposit Master',
        icon: 'icon-cursor',
        link: '/Marine/deposit-master/view',
      },
      
      {
        title: 'War Rate Master',
        link: 'masters/war-rate/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Package Master',
        link: 'masters/package/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Sale Term Master',
        link: 'masters/sale-term/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Tolerance Master',
        link: 'masters/tolerance/view',
        icon: 'icon-cursor',
      },
      
      {
        title: 'Settling Agent',
        link: 'masters/settling-agent/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Exchange Master',
        link: 'masters/exchange-master/view',
        icon: 'icon-cursor',
      },
      // {
      //   title: 'Exchange Master Upload',
      //   link: 'masters/exchange-master-upload/view',
      //   icon: 'icon-cursor',
      // },
      {
        title: 'Currency Master',
        link: 'masters/currency/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Extra Cover',
        link: 'masters/extra-cover/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Mode of Transport',
        link: 'masters/transport/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Warranty Master',
        link: 'masters/warranty/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Constant Master',
        link: 'masters/constant/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Exclusion Master',
        link: 'masters/exclusion/view',
        icon: 'icon-cursor',
      },
      {
        title: 'City',
        link: 'masters/city/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Clause ID',
        link: 'masters/clause/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Wsrcc Cover',
        link: 'masters/wsrcc/view',
        icon: 'icon-cursor',
      },
     
      {
        title: 'Error',
        link: 'masters/error/view',
        icon: 'icon-cursor',
      },
      {
        title: 'Sales Executive Master',
        link: 'masters/sales-exe/view',
        icon: 'icon-cursor',
      },
    ],
  },
  {
    title: 'Portfolio',
    link: '/Marine/adminportfolio',
    icon: 'icon-cursor',
  },

  {
    title: 'Reports',
    icon: 'icon-cursor',
    children: [
      {

        title: 'Branch Reports',
        link: '/Marine/branchreport',
        icon: 'icon-cursor',
      },
        {

          title: 'Reports',
          link: '/Marine/adminreport',
          icon: 'icon-cursor',
        },
        {

          title: 'Open Cover Reports',
          link: '/Marine/opencoverreport',
          icon: 'icon-cursor',
        },

    ]
  },


];
