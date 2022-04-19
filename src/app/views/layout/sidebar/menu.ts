import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    username: '',
    isLabel: true,
    isTitle: false,
    //role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO, DO'
    role: 'School Principal, Administrator, Head Office Administrator, Head Office Director, District Administrator,District Director, Head Office Coordinator, Provincial Monitor, Chief Financial Officer, Procurement Coordinator, Finance, District Coordinator, District CES, District Monitor, SGB, School Coordinator, Food Handler, SUPPLIER'
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
    role: ''
  },
  {
    //SGB
    label: 'SGB CHAIRPERSON',
    icon: 'user-check',
    role: 'SGB',
    subItems: [
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: ''
      },
      {
        label: 'Monthly Fund Register',
        link: '',
        role: ''
      },
      {
        label: 'Delivery Schedule',
        link: '',
        role: ''
      }     
      
    ]
  },
  {
    //Supplier
    label: 'Invoice',
   // icon: 'user-check',
    role: 'SUPPLIER',
    subItems: [
      {
        label: 'Review Invoice',
        link: '',
        role: ''
      }
    ]
    },
    {
        //Supplier
        label: 'Supplier Summary Report',
       // icon: 'user-check',
        role: 'SUPPLIER',
        subItems: [
          {
            label: 'Supplier Summary Report',
            link: '/supplier-summary-report',
            role: 'SUPPLIER'
          }
      ]
    },
    {
      //Supplier
      label: 'Monthly Delivery Dates',
     // icon: 'user-check',
      role: 'SUPPLIER',
      subItems: [
        {
          label: 'Monthly Delivery Schedule',
          link: '/monthly-delivery-schedule',
          role: 'SUPPLIER'
        }
    ]
  },
    {
      //Supplier
      label: 'Delieveries',
     // icon: 'user-check',
      role: 'SUPPLIER',
      subItems: [
        {
          label: 'Monthly Delivery Schedule',
          link: '/monthly-delivery-schedule',
          role: 'SUPPLIER'
        }
    ]
  },
  {
    // School Coordinator
    label: 'SCHOOL COORDINATOR',   
    icon: 'globe',
    role: 'School Coordinator',
    subItems: [
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: ''
      },
      {
        label: 'Delivery Schedule',
        link: '',
        role: ''
      },
      {
        label: 'Reports',
        link: '',
        role: '',
      }
    ]
  },
  {
    // District Coordinator
    label: 'DISTRICT COORDINATOR',
    icon: 'globe',
    role: 'District Coordinator',
    subItems: [
      {
        label: 'Delivery Schedule',
        link: '',
        role: 'District Coordinator'
      },
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'District Coordinator'
      },
      {
        label: 'Supplier',
        link: '',
        role: 'District Coordinator'
      },
      {
        label: 'Donation',
        link: '/donation',
        role: 'District Coordinator'
      },
      {
        label: 'Monitoring Tool',
        link: '',
        role: 'District Coordinator'
      },
      {
        label: 'Reports',
        link: '',
        role: 'District Coordinator'
      }
    ]
  },
  {
    //District Monitor
    label: 'DISTRICT MONITOR',
    icon: 'globe',
    role: 'District Monitor',
    subItems: [
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'District Monitor '
      },
      {
        label: 'NSNP Monitoring Feedback Form',
        link: '',
        role: 'District Monitor'
      },
      {
        label: 'Reports',
        link: '',
        role: 'District Monitor'
      }
    ]
  },
  //start
  {
    //label: 'District Officer',
    label: 'District Administrator',
    icon: 'users',
    role: 'District Administrator',
    subItems: [
      {        
        label: '',
        link: '',
        role: 'District Administrator'
      }
    ]
  },
  { 
    label: 'User Management',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [    
    {        
      label: 'User Management',
      link: '/users/new-user',
      role: 'District Administrator'
    },    
    ]
},
{ 
    label: 'Verification Form',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [    
    {        
      label: 'Verification Form',
      link: '/district-verification',
      role: 'District Administrator,District Director, District Coordinator'
    },    
    ]
},
{ 
  label: 'NSNP Registration Form',
  icon: 'globe',
  role: 'District Administrator',
  subItems: [   
  {        
    label: 'NSNP Registration Form',
    link: '',
    role: 'District Administrator,District Director, District Coordinator'
  },     
  ]
},
  {
    label: 'Delivery Schedule',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Delivery Schedule',
        link: '',
        role: 'District Administrator'
      }
    ]
  },
  {
    label: 'Feeding',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'District Administrator'
      }
    ]
  },
  {
    label: 'Invoice',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Invoice',
        link: '',
        role: 'District Administrator'
      }
    ]
  },
  {
    label: 'Supplier Summary',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Supplier Summary',
        link: '',
        role: 'District Administrator'
      }
    ]
  },
  {
    label: 'Donation',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Request for Donation',
        link: '/donation',
        role: 'District Administrator'
      }
    ]
  },
  {
    label: 'Monitoring Tool',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Monitoring Tool',
        link: '',
        role: 'District Administrator'
      }
    ]
  },
  {
    label: 'Delivery Schedule',
    icon: 'globe',
    role: 'District Administrator',
    subItems: [
      {
        label: 'Reports',
        link: '',
        role: 'District Administrator'
      }

    ]
  },
    
  //end
  {    
    label: 'School Principal',
    icon: 'users',
    role: 'School Principal',
    subItems: [     
      {
        label: '',
        link: '',
        role: ''
      }
    ]
  },
  {
    label: 'User Management',
      icon: 'globe',
      role: 'School Principal',
    subItems: [     
        {
          label: 'User Management',
          link: '/users/new-user',
          role: 'School Principal'
        }
     ]
    },
  {
	label: 'Verification Form',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'Verification Form',
        link: '/verification',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'NSNP Registration Form',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'NSNP Registration Form',
        link: '/nsnp-registration',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'Feeding',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'School Principal'
      },
	  {
        label: 'Feeding Menu',
        link: '/feeding-menu',
        role: 'School Principal'
      },
	  {
        label: 'Menu Calculator',
        link: '/menu-calculator',
        role: 'School Principal'
      },
	  {
        label: 'Breakfast Feeding Register',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Lunch Feeding Register',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Issue Food Parcel',
        link: '',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'Fund Register',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'Fund Register',
        link: '/monthlyreport',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'Delivery Schedule',
    icon: 'globe',
    role: 'School Principal',
	subItems: [    
    
  
      {
        label: 'Delivery Schedule',
        link: '/perishable-delivery-schedule',
        role: 'School Principal'
      },	  
	  {
        label: 'Supplier Delivery Ratings',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Delivery Schedule Query',
        link: '',
        role: 'School Principal'
      },
      {
        label: 'Monthly Delivery Schedules',
        link: 'monthly-delivery-schedule',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'Donation',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'Request For Donation',
        link: '/donation',
        role: 'School Principal'
      },
	  {
        label: 'Approve Donation Required',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Issue Food Parcel',
        link: '',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'Monitoring Tool',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'Monitoring Tool',
        link: '',
        role: 'School Principal'
      }
	 ]
  },
  {
	label: 'Reports',
    icon: 'globe',
    role: 'School Principal',
	subItems: [     
      {
        label: 'Feeding Register Report',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Food Handler Attendance',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Food Handler Acknowledgement',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'NSNP Monthly Expenditure',
        link: '',
        role: 'School Principal'
      },
	  {
        label: 'Stock Management Report',
        link: '',
        role: 'School Principal'
      },
      {
        label: 'Supplier Summery Report',
        link: '/supplier-summary-report',
        role: 'School Principal'
      }
	  
	 ]
  },
  //start 
  {
    // HO_Administrator
    label: 'Head Office Administrator',
    icon: 'users',
    role: 'Head Office Administrator',
    subItems: [
      {        
        label: '',
        link: '',
        role: ''
      }
    ]
  },
  { 
    label: 'User Management',
    icon: 'globe',
    role: 'Head Office Administrator',
    subItems: [    
    {        
      label: 'User Management',
      link: '/users/new-user',
      role: 'Head Office Administrator'
    },    
    ]
},
{ 
  label: 'Verification Form',
  icon: 'globe',
  role: 'Head Office Administrator',
  subItems: [    
  {        
    label: 'Verification Form',
    link: '/ho-verification',
    role: 'Head Office Administrator, Head Office Coordinator'
  },    
  ]
},
{ 
  label: 'NSNP Registration Form',
  icon: 'globe',
  role: 'Head Office Administrator',
  subItems: [   
  {        
    label: 'NSNP Registration Form',
    link: '/ho-nsnp-registration',
    role: 'Head Office Administrator, Head Office Coordinator'
  },    
  ]
},   

      {
        label: 'Acknowledgement Payment',
        icon: 'globe',
        role: 'Head Office Administrator',
        subItems: [
          { 
            label: 'Acknowledgement Payment',
            link: '/payment',
            role:''
          }
          ]
      },
      { 
        label: 'Products Management',
        icon: 'globe',
        role: 'Head Office Administrator',
        subItems: [    
        {        
          label: 'Products Management',
          link: '/products-management',
          role: 'Head Office Administrator, Head Office Coordinator'
        },  
        {        
          label: 'Supplier Summary Report',
          link: '/supplier-summary-report',
          role: 'Head Office Administrator, Head Office Coordinator'
        }     
        ]
    },
    {        
      label: 'Supplier Management',
      icon: 'globe',
      role: 'Head Office Administrator',
      subItems: [
          {
            label: 'Supplier Management',
            link: '/supplier-management',
            role: 'Head Office Administrator'
          }
        ]
      },      
      {
        label: 'Feeding',
        icon: 'globe',
        role: 'Head Office Administrator',
        subItems: [{
          label: 'Feeding Calendar',
          link: '/feeding-calender',
          role: 'Head Office Administrator'
        },    

      {
        label: 'Feeding Menu',
        link: '',
        role: 'Head Office Administrator'
      },
      {
        label: 'Menu Calculator',
        link: '',
        role: 'Head Office Administrator'
      },    
    ]
  },
  {
    label: 'Delivery Schedule',
    icon: 'globe',   
    role: 'Head Office Administrator',
    subItems: [
        {

          label: 'Product Management',
          link: 'school-product',
          role: 'HO_Administrator'
        },      
        {
            label: 'Supplier Rating',
            link: '',
            role: 'Head Office Administrator'
         }
         ,      
        {
            label: 'Monthly Delivery Schedule ',
            link: '/monthly-delivery-schedule',
            role: 'Head Office Administrator'
         }
    ]
  },
  {
    label: 'Invoice and GRV',
    icon: 'globe',
    role: 'Head Office Administrator',
    subItems: [{
      label: 'Invoice',
      link: '',
      role: 'Head Office Administrator'
    },      

  {
    label: 'Invoice Query',
    link: '',
    role: 'Head Office Administrator'
  },
  {
    label: 'GRV',
    link: '',
    role: 'Head Office Administrator'
  },    
]
    
  },
  {
    label: 'Monitoring Tool',
    icon: 'globe',
    role: 'Head Office Administrator',
    subItems: [{
      label: 'Create New Monitoring Tool',
      link: '',
      role: 'Head Office Administrator'
    },      

  {
    label: 'Complete Monitoring Tool',
    link: '',
    role: 'Head Office Administrator'
  },
  {
    label: 'Assign HO Monitor',
    link: '',
    role: 'Head Office Administrator'
  },    
]
  }, //end
   //start 
  {
    // HO_DIRECTOR
    label: 'Head Office Director',
    icon: 'users',
    role: 'Head Office Director',
    subItems: [
      {        
        label: '',
        link: '',
        role: ''
      }
    ]
  },
  { 
    label: 'User Management',
    icon: 'globe',
    role: 'Head Office Director',
    subItems: [    
    {        
      label: 'User Management',
      link: '/users/new-user',
      role: 'Head Office Director'
    },    
    ]
},
{ 
  label: 'Verification Form',
  icon: 'globe',
  role: 'Head Office Director',
  subItems: [    
  {        
    label: 'Verification Form',
    link: '/ho-verification',
    role: 'Head Office Director, Head Office Coordinator'
  },    
  ]
},
{ 
  label: 'NSNP Registration Form',
  icon: 'globe',
  role: 'Head Office Director',
  subItems: [   
  {        
    label: 'NSNP Registration Form',
    link: '/ho-nsnp-registration',
    role: 'Head Office Director, Head Office Coordinator'
  },    
  ]
},   

      {
        label: 'Acknowledgement Payment',
        icon: 'globe',
        role: 'Head Office Director',
        subItems: [
          { 
            label: 'Acknowledgement Payment',
            link: '/payment',
            role:''
          }
          ]
      },
      { 
        label: 'Products Management',
        icon: 'globe',
        role: 'Head Office Director',
        subItems: [    
        {        
          label: 'Products Management',
          link: '/products-management',
          role: 'Head Office Director, Head Office Coordinator'
        },  
        {        
          label: 'Supplier Summary Report',
          link: '/supplier-summary-report',
          role: 'Head Office Director, Head Office Coordinator'
        }     
        ]
    },
    {        
      label: 'Supplier Management',
      icon: 'globe',
      role: 'Head Office Director',
      subItems: [
          {
            label: 'Supplier Management',
            link: '/supplier-management',
            role: 'Head Office Director'
          }
        ]
      },      
      {
        label: 'Feeding',
        icon: 'globe',
        role: 'Head Office Director',
        subItems: [{
          label: 'Feeding Calendar',
          link: '/feeding-calender',
          role: 'Head Office Director'
        },    

      {
        label: 'Feeding Menu',
        link: '',
        role: 'Head Office Director'
      },
      {
        label: 'Menu Calculator',
        link: '',
        role: 'Head Office Director'
      },    
    ]
  },
  {
    label: 'Delivery Schedule',
    icon: 'globe',   
    role: 'Head Office Director',
    subItems: [
        {

          label: 'Product Management',
          link: 'school-product',
          role: 'HO_DIRECTOR'
        },      
        {
            label: 'Supplier Rating',
            link: '',
            role: 'Head Office Director'
         }
         ,      
        {
            label: 'Monthly Delivery Schedule ',
            link: '/monthly-delivery-schedule',
            role: 'Head Office Director'
         }
    ]
  },
  {
    label: 'Invoice and GRV',
    icon: 'globe',
    role: 'Head Office Director',
    subItems: [{
      label: 'Invoice',
      link: '',
      role: 'Head Office Director'
    },      

  {
    label: 'Invoice Query',
    link: '',
    role: 'HO_DIHead Office DirectorRECTOR'
  },
  {
    label: 'GRV',
    link: '',
    role: 'Head Office Director'
  },    
]
    
  },
  {
    label: 'Monitoring Tool',
    icon: 'globe',
    role: 'Head Office Director',
    subItems: [{
      label: 'Create New Monitoring Tool',
      link: '',
      role: 'Head Office Director'
    },      

  {
    label: 'Complete Monitoring Tool',
    link: '',
    role: 'Head Office Director'
  },
  {
    label: 'Assign HO Monitor',
    link: '',
    role: 'Head Office Director'
  },    
]
  }, //end

  {
    // Head Office Coordinator
    label: 'Head Office Coordinator',
    icon: 'users',
    role: 'Head Office Coordinator',
    subItems: [    
      {
        label: 'HO COORDINATOR',
        link: '',
        role: 'Head Office Coordinator'
      },
      {
        label: 'Monitoring Tool',
        link: '/feeding-calender',
        role: 'Head Office Coordinator'
      },
      {
        label: 'Reports',
        link: '',
        role: 'Head Office Coordinator'
      }
    ]
  },
  
  {
    label: 'Reports',
    icon: 'globe',
    role: 'Head Office Director',
    subItems: [
      {
      label: 'Reports',
      link: '',
        role: 'Head Office Director'
      }, 
      {
        label: 'Supplier Summery Report',
        link: '/supplier-summary-report',
        role: 'Head Office Director'
      }
    ]
  },
  {
    // Provincial Monitor
    label: 'Provincial Monitor',
    icon: 'users',
    role: 'Provincial Monitor',
    subItems: [
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'Provincial Monitor'
      },
      {
        label: 'Monitoring Tool',
        link: '',
        role: 'Provincial Monitor'
      },
      {
        label: 'Reports',
        link: '',
        role: 'Provincial Monitor'
      }
    ]
  },
  {
    // Head Office Coordinator
    label: 'HO COORDINATOR',
    icon: 'users',
    role: 'Head Office Coordinator',
    subItems: [    
      {
        label: 'HO COORDINATOR',
        link: '',
        role: 'Head Office Coordinator'
      }
    ]
  },
  {
	label: 'Feeding',
    icon: 'globe',
    role: 'Head Office Coordinator',
	subItems: [     
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Feeding Menu',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Menu Calculator',
        link: '',
        role: 'Head Office Coordinator'
      }
	 ]
  },
  {
	label: 'Supplier Rating',
    icon: 'globe',
    role: 'Head Office Coordinator',
	subItems: [     
      {
        label: 'Supplier Rating',
        link: '',
        role: 'Head Office Coordinator'
      }
	 ]
  },
  {
	label: 'Monitoring Tool',
    icon: 'globe',
    role: 'Head Office Coordinator',
	subItems: [     
      {
        label: 'Create Monitoring Tool',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Complete Monitoring Tool',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Assign HO Monitor',
        link: '',
        role: 'Head Office Coordinator'
      }
	 ]
  },
  {
	label: 'Reports',
    icon: 'globe',
    role: 'Head Office Coordinator',
	subItems: [     
      {
        label: 'Feeding Register',
        link: '',
        role: 'Head Office Coordinator',
      },
	  {
        label: 'Food Handler Attendance',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Food Handler Acknowledgement',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'NSNP Monthly Expenditure',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'School Report',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Supplier Report',
        link: '',
        role: 'Head Office Coordinator'
      },
	  {
        label: 'Summery Register',
        link: '',
        role: 'Head Office Coordinator',
		
      },
	  {
        label: 'Stock Management Reports',
        link: '',
        role: 'Head Office Coordinator',
		
      }
	 ]
  },
  {
    // Learner
    label: 'Learner',
    icon: 'users',
    role: 'LEARNER',
    subItems: [
      {
        label: 'Scan Fingerprint',
        link: '',
        role: 'LEARNER'
      }
    ]
  },
  {// Chief Financial Officer
    label: 'Chief Financial Officer',
    icon: 'users',
    role: 'Chief Financial Officer',
    subItems: [
      {
        label: 'GRV',
        link: '',
        role: 'Chief Financial Officer'
      }
    ]
  },
  {
    // Procurement Coordinator
    label: 'PROCUREMENT COORDINATOR',
    icon: 'users',
    role: 'Procurement Coordinator',
    subItems: [
      {
        label: 'GRV',
        link: '',
        role: 'Procurement Coordinator'
      }
    ]
  },
  {
    // Finance
    label: 'Finance',
    icon: 'users',
    role: 'Finance',
    subItems: [
      {
        label: 'Generated GRV',
        link: '',
        role: 'Finance'
      }
    ]
  },
  {
    label: 'Delivery Note',
   // icon: 'users',
    role: 'Supplier',
    subItems: [
      {
        label: 'Supplier Summary Report',
        link: '',
        role: ''
      },
      {
        label:'Complete Delivery Note ',
        link: '',
        role: ''
      },
      {
        label: 'Resolve Delivery Note Query',
        link: '',
        role: ''
      }
     
     
    ]
  },
  {
    // ADMIN
    label: 'System Administrator',
    icon: 'users',
    role: 'Administrator',
    subItems: [
      {
        label: '',
        link: '',
        role: ''
      }    
    ]
  },
  {
    label: 'Legislative Framework',
    icon: 'globe',
    role: 'Administrator',
    subItems: [
      {
        label: 'Legislative Framework',
        link: '/legislative-framework',
        role: ''
      }   
    ]
  },
  {
    label: 'User Management',
    icon: 'globe',
    role: 'Administrator',
    subItems: [          
      {
        label: 'User Management',
        link: '/users/new-user',
        role: 'Administrator'
      }     
    ]
  },
  {
    label: 'Parent',
    icon: 'user',
    role: 'PARENT',
    subItems: [
      {
        label: 'Nomination',
        link: '/nominations/countdown',
        role: ''
      },
      {
        label: 'Disputes',
        link: '/disputes/list',
        role: ''
      },
      {
        label: 'FAQ',
        link: '/general/faq',
        role: ''
      },
      {
        label: 'Legislative Framework',
        link: '/legislative-framework',
        role: 'Administrator, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
      },
      {
        label: 'Management Plan',
        link: '/management-plan',
        role: 'Administrator, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
      },
      {
        label: 'Queries',
        link: '/queries/governing-body',
        role: ''
      }

    ]
  },
  {
    //label: 'District Officer',
    label: 'District Director',
    icon: 'users',
    role: 'District Director',
    subItems: [
      {
        //label: 'Meeting',
        label: '',
        link: '',
        role: 'District Director'
      }
    ]
  },
  { 
    label: 'User Management',
    icon: 'globe',
    role: 'District Director',
    subItems: [    
    {        
      label: 'User Management',
      link: '/users/new-user',
      role: 'District Director'
    },    
    ]
},
  { 
    label: 'Verification Form',
    icon: 'globe',
    role: 'District Director',
    subItems: [    
    {        
      label: 'Verification Form',
      link: '/district-verification',
      role: 'District Director, District Coordinator'
    },    
    ]
},
{ 
  label: 'NSNP Registration Form',
  icon: 'globe',
  role: 'District Director',
  subItems: [    
  // {        
  //   label: 'Send NSNP Form',
  //   link: '/send-nsnp',
  //   role: 'District Director, District Coordinator'
  // },
  {        
    label: 'NSNP Registration Form',
    link: '',
    role: 'District Director, District Coordinator'
  },     
  ]
},
  {
    label: 'Delivery Schedule',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Delivery Schedule',
        link: '',
        role: 'District Director'
      }
    ]
  },
  {
    label: 'Feeding',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Feeding Calendar',
        link: '/feeding-calender',
        role: 'District Director'
      }
    ]
  },
  {
    label: 'Invoice',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Invoice',
        link: '',
        role: 'District Director'
      }
    ]
  },
  {
    label: 'Supplier Summary',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Supplier Summary',
        link: '',
        role: 'District Director'
      }
    ]
  },
  {
    label: 'Donation',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Request for Donation',
        link: '/donation',
        role: 'District Director'
      }
    ]
  },
  {
    label: 'Monitoring Tool',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Monitoring Tool',
        link: '',
        role: 'District Director'
      }
    ]
  },
  {
    label: 'Delivery Schedule',
    icon: 'globe',
    role: 'District Director',
    subItems: [
      {
        label: 'Reports',
        link: '',
        role: 'District Director'
      }

    ]
  },

  //DISTRICT_ADMINISTRATOR
  

  // {
  //   label: 'Legislative Framework',
  //   icon: 'book',
  //   link: '/legislative-framework',
  //   role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
  // },
  // {
  //   label: 'Management Plan',
  //   icon: 'book',
  //   link: '/management-plan',
  //   role: 'ADMIN, SEO, DEO, PARENT, PRINCIPAL, PEO, PEM, MONITOR, OBSERVER, SGB, HO'
  // },
  /* {
    label: 'DEO Query',ADMIN, DEO, SEO, PARENT, PEO, PEM
    link: '/queries/district-electoral-officer',
    role: '',
  },
 
  {
    label: 'Email',
    icon: 'mail',
    subItems: [
      {
        label: 'Inbox',
        link: '/apps/email/inbox',
      },
      {
        label: 'Read',
        link: '/apps/email/read'
      },
      {
        label: 'Compose',
        link: '/apps/email/compose'
      },
    ]
  },
  {
    label: 'Chat',
    icon: 'message-square',
    link: '/apps/chat',
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/apps/calendar',
    badge: {
      variant: 'primary',
      text: 'New',
    }
  },
  {
    label: 'Components',
    isTitle: true
  },
  {
    label: 'UI Kit',
    icon: 'feather',
    subItems: [
      {
        label: 'Alerts',
        link: '/ui-components/alerts',
      },
      {
        label: 'Badges',
        link: '/ui-components/badges',
      },
      {
        label: 'Breadcrumbs',
        link: '/ui-components/breadcrumbs',
      },
      {
        label: 'Buttons',
        link: '/ui-components/buttons',
      },
      {
        label: 'Button group',
        link: '/ui-components/button-group',
      },
      {
        label: 'Cards',
        link: '/ui-components/cards',
      },
      {
        label: 'Carousel',
        link: '/ui-components/carousel',
      },
      {
        label: 'Collapse',
        link: '/ui-components/collapse',
      },
      {
        label: 'Datepicker',
        link: '/ui-components/datepicker',
      },
      {
        label: 'Dropdowns',
        link: '/ui-components/dropdowns',
      },
      {
        label: 'List group',
        link: '/ui-components/list-group',
      },
      {
        label: 'Media object',
        link: '/ui-components/media-object',
      },
      {
        label: 'Modal',
        link: '/ui-components/modal',
      },
      {
        label: 'Navs',
        link: '/ui-components/navs',
      },
      {
        label: 'Navbar',
        link: '/ui-components/navbar',
      },
      {
        label: 'Pagination',
        link: '/ui-components/pagination',
      },
      {
        label: 'Popovers',
        link: '/ui-components/popovers',
      },
      {
        label: 'Progress',
        link: '/ui-components/progress',
      },
      {
        label: 'Rating',
        link: '/ui-components/rating',
      },
      {
        label: 'Scrollbar',
        link: '/ui-components/scrollbar',
      },
      {
        label: 'Spinners',
        link: '/ui-components/spinners',
      },
      {
        label: 'Timepicker',
        link: '/ui-components/timepicker',
      },
      {
        label: 'Tooltips',
        link: '/ui-components/tooltips',
      },
      {
        label: 'Typeadhed',
        link: '/ui-components/typeahead',
      },
    ]
  },
  {
    label: 'Advanced UI',
    icon: 'anchor',
    subItems: [
      {
        label: 'Cropper',
        link: '/advanced-ui/cropper',
      },
      {
        label: 'Owl carousel',
        link: '/advanced-ui/owl-carousel',
      },
      {
        label: 'Sweet alert',
        link: '/advanced-ui/sweet-alert',
      },
    ]
  },
  {
    label: 'Forms',
    icon: 'file-text',
    subItems: [
      {
        label: 'Basic elements',
        link: '/form-elements/basic-elements'
      },
      {
        label: 'Advanced elements',
        subItems: [
          {
            label: 'Form validation',
            link: '/advanced-form-elements/form-validation'
          },
          {
            label: 'Input mask',
            link: '/advanced-form-elements/input-mask'
          },
          {
            label: 'Ng-select',
            link: '/advanced-form-elements/ng-select'
          },
          {
            label: 'Ngx-chips',
            link: '/advanced-form-elements/ngx-chips'
          },
          {
            label: 'Ngx-color-picker',
            link: '/advanced-form-elements/ngx-color-picker'
          },
          {
            label: 'Ngx-dropzone',
            link: '/advanced-form-elements/ngx-dropzone-wrapper'
          },
        ]
      },
      {
        label: 'Editors',
        link: '/form-elements/editors'
      },
      {
        label: 'Wizard',
        link: '/form-elements/wizard'
      },
    ]
  },
  {
    label: 'Charts & graphs',
    icon: 'pie-chart',
    subItems: [
      {
        label: 'ApexCharts',
        link: '/charts-graphs/apexcharts',
      },
      {
        label: 'ChartJs',
        link: '/charts-graphs/chartjs',
      },
    ]
  },
  {
    label: 'Tables',
    icon: 'layout',
    subItems: [
      {
        label: 'Basic tables',
        link: '/tables/basic-table',
      },
      {
        label: 'Data table',
        link: '/tables/data-table',
      },
      {
        label: 'Ngx-datatable',
        link: '/tables/ngx-datatable'
      }
    ]
  },
  {
    label: 'Icons',
    icon: 'smile',
    subItems: [
      {
        label: 'Feather icons',
        link: '/icons/feather-icons',
      },
      {
        label: 'Flag icons',
        link: '/icons/flag-icons',
      },
      {
        label: 'Mdi icons',
        link: '/icons/mdi-icons',
      }
    ]
  },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Special pages',
    icon: 'book',
    subItems: [
      {
        label: 'Blank page',
        link: '/general/blank-page',
      },
      {
        label: 'Faq',
        link: '/general/faq',
      },
      {
        label: 'Invoice',
        link: '/general/invoice',
      },
      {
        label: 'Profile',
        link: '/general/profile',
      },
      {
        label: 'Pricing',
        link: '/general/pricing',
      },
      {
        label: 'Timeline',
        link: '/general/timeline',
      }
    ]
  },
  {
    label: 'Authentication',
    icon: 'unlock',
    subItems: [
      {
        label: 'Login',
        link: '/auth/login',
      },
      {
        label: 'Register',
        link: '/auth/register',
      },
    ]
  },
  {
    label: 'Error',
    icon: 'cloud-off',
    subItems: [
      {
        label: '404',
        link: '/error/404',
      },
      {
        label: '500',
        link: '/error/500',
      },
    ]
  },*/
];
