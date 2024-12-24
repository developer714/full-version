export default [
    {
    title: 'Member Management',
    icon: { icon: 'bx-user' },
    children: [
      { title: 'Customer List', to: 'apps-user-list' },
      { title: 'Sponsorship Diagram', to: 'apps-user-diagram-sponsorship' },
      { title: 'Recommendation Diagram', to: 'apps-user-diagram-recommediation' },
    ],
  },
 
  {
    title: 'Order Management',
    icon: { icon: 'bx-cart' },
        children: [
          { title: 'Product List', to: 'apps-ecommerce-product-list' },
          { title: 'Add Product', to: 'apps-ecommerce-product-add' },
          { title: 'Order List', to: 'apps-ecommerce-product-category-list' },
        ],
  },


  {
    title: 'Category Management',
    icon: { icon: 'bx-cart-alt' },
        children: [
          { title: 'Categeries', to: 'apps-ecommerce-product-list' },
          { title: 'Sub Categories', to: 'apps-ecommerce-product-add' },
          { title: 'Sub Sub Categories', to: 'apps-ecommerce-product-category-list' },
        ],
  },
  
  {
    title: 'Branch Management',
    icon: { icon: 'bx-network-chart' },
    children: [
      { title: 'Branch List', to: 'apps-branch-list' },
      { title: 'Subscription Status by Branch', to: 'pages-cards-card-basic' },
    ],
  },

  {
    title: 'Member Settlement',
    icon: { icon: 'bx-home-heart' },
    children: [
      { title: 'Allowance Detail(By Date)', to: 'apps-member-date' },
      { title: 'Allowance Detail(By Member)', to: 'apps-member-member' },
      { title: 'List Of Allowances Paid', to: 'apps-member-list-paid' },
      { title: 'Excute Member Settlement', to: 'apps-member-execute' },
      { title: 'Cancellation Of Settlement', to: 'apps-member-cancellation' },
    ],
  },

  {
    title: 'Branch Settlement',
    icon: { icon: 'bx-building' },
    children: [
      { title: 'Allowance Detail(By Date)', to: 'apps-branch-settlement-date' },
      { title: 'Allowance Detail(By Member)', to: 'apps-branch-settlement-member' },
      { title: 'List Of Allowances Paid', to: 'apps-branch-settlement-list-paid' },
      { title: 'Branch Settlement Execution', to: 'apps-branch-settlement-branch-excution' },
    ],
  },

  {
    title: 'Other Management',
    icon: { icon: 'bx-cog' },
    children: [
      { title: 'Notification', to: 'apps-others-notification' },
      { title: 'Bank Management', to: 'apps-others-bank' },
      { title: 'Connection Information', to: 'apps-others-connection' },
      { title: 'Report', to: 'apps-others-report' },
      { title: 'Default Setting', to: 'apps-others-settings' },
    ],
  },
  // {
  //   title: 'Pages',
  //   icon: { icon: 'bx-file' },
  //   children: [
  //     { title: 'User Profile', to: { name: 'pages-user-profile-tab', params: { tab: 'profile' } } },
  //     { title: 'Account Settings', to: { name: 'pages-account-settings-tab', params: { tab: 'account' } } },
  //     { title: 'Pricing', to: 'pages-pricing' },
  //     { title: 'FAQ', to: 'pages-faq' },
  //     {
  //       title: 'Miscellaneous',
  //       children: [
  //         { title: 'Coming Soon', to: 'pages-misc-coming-soon', target: '_blank' },
  //         { title: 'Under Maintenance', to: 'pages-misc-under-maintenance', target: '_blank' },
  //         { title: 'Page Not Found - 404', to: { path: '/pages/misc/not-found' }, target: '_blank' },
  //         { title: 'Not Authorized - 401', to: { path: '/pages/misc/not-authorized' }, target: '_blank' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Authentication',
  //   icon: { icon: 'bx-shield' },
  //   children: [
  //     {
  //       title: 'Login',
  //       children: [
  //         { title: 'Login v1', to: 'pages-authentication-login-v1', target: '_blank' },
  //         { title: 'Login v2', to: 'pages-authentication-login-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Register',
  //       children: [
  //         { title: 'Register v1', to: 'pages-authentication-register-v1', target: '_blank' },
  //         { title: 'Register v2', to: 'pages-authentication-register-v2', target: '_blank' },
  //         { title: 'Register Multi-Steps', to: 'pages-authentication-register-multi-steps', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Verify Email',
  //       children: [
  //         { title: 'Verify Email v1', to: 'pages-authentication-verify-email-v1', target: '_blank' },
  //         { title: 'Verify Email v2', to: 'pages-authentication-verify-email-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Forgot Password',
  //       children: [
  //         { title: 'Forgot Password v1', to: 'pages-authentication-forgot-password-v1', target: '_blank' },
  //         { title: 'Forgot Password v2', to: 'pages-authentication-forgot-password-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Reset Password',
  //       children: [
  //         { title: 'Reset Password v1', to: 'pages-authentication-reset-password-v1', target: '_blank' },
  //         { title: 'Reset Password v2', to: 'pages-authentication-reset-password-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Two Steps',
  //       children: [
  //         { title: 'Two Steps v1', to: 'pages-authentication-two-steps-v1', target: '_blank' },
  //         { title: 'Two Steps v2', to: 'pages-authentication-two-steps-v2', target: '_blank' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Wizard Examples',
  //   icon: { icon: 'bx-dots-horizontal' },
  //   children: [
  //     { title: 'Checkout', to: { name: 'wizard-examples-checkout' } },
  //     { title: 'Property Listing', to: { name: 'wizard-examples-property-listing' } },
  //     { title: 'Create Deal', to: { name: 'wizard-examples-create-deal' } },
  //   ],
  // },
  // {
  //   title: 'Dialog Examples',
  //   icon: { icon: 'bx-square' },
  //   to: 'pages-dialog-examples',
  // },
]
