import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./album/album.module').then( m => m.AlbumPageModule)
  },
  {
    path: 'userlist',
    loadChildren: () => import('./userlist/userlist.module').then( m => m.UserlistPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'paymentdetail',
    loadChildren: () => import('./paymentdetail/paymentdetail.module').then( m => m.PaymentdetailPageModule)
  },
  {
    path: 'addcardpopup',
    loadChildren: () => import('./addcardpopup/addcardpopup.module').then( m => m.AddcardpopupPageModule)
  },
  {
    path: 'businesspage',
    loadChildren: () => import('./businesspage/businesspage.module').then( m => m.BusinesspagePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'add-album',
    loadChildren: () => import('./add-album/add-album.module').then( m => m.AddAlbumPageModule)
  },
  {
    path: 'sharevia',
    loadChildren: () => import('./sharevia/sharevia.module').then( m => m.ShareviaPageModule)
  },
  {
    path: 'favbusiness',
    loadChildren: () => import('./favbusiness/favbusiness.module').then( m => m.FavbusinessPageModule)
  },
  {
    path: 'createpopup',
    loadChildren: () => import('./createpopup/createpopup.module').then( m => m.CreatepopupPageModule)
  },
  {
    path: 'imgmodel',
    loadChildren: () => import('./imgmodel/imgmodel.module').then( m => m.ImgmodelPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
