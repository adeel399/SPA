import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: "",
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: "User-list",
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          },

          {
            path: "Album",
            loadChildren: () => import('../album/album.module').then(m => m.AlbumPageModule)
          },

          
          
        ]
        
      },
      {
        path: 'tab2',
        
        children: [
          {
            path: "",
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: "subscription-packages",
            loadChildren: () => import('../subscription/subscription.module').then(m => m.SubscriptionPageModule)
          },
          {
            path: "Edit-profile",
            loadChildren: () => import('../editprofile/editprofile.module').then(m => m.EditprofilePageModule)
          },
          {
            path: "Payment-cards",
            loadChildren: () => import('../paymentdetail/paymentdetail.module').then(m => m.PaymentdetailPageModule)
          },
          
        ]
      },
      {
      path: 'tab3',
        
      children: [
        {
          path: "",
          loadChildren: () => import('../businesspage/businesspage.module').then(m => m.BusinesspagePageModule)
        },
       ]
      },
     
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
