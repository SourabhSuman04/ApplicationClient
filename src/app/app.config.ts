import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
//     provideHttpClient(),
//       provideSocialAuth({
//       autoLogin: false,
//       providers: [
//         {
//           id: GoogleLoginProvider.PROVIDER_ID,
//           provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID'),
//         },
//       ],
//     }),
//   ]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),

    // Provide the SocialAuthServiceConfig token and SocialAuthService class
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('768922059053-pe75b5r16vd9lno916hu3ctmj60fk6qg.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
};