import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ 
      transform: 'translateY(100%) scale(0.8)', 
      opacity: 0 
    }),
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
      style({   
        transform: 'translateY(0) scale(1)', 
        opacity: 1 
      })
    )
  ]),
  transition(':leave', [
    animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
      style({ 
        transform: 'translateY(100%) scale(0.8)', 
        opacity: 0 
      })
    )
  ])
]);