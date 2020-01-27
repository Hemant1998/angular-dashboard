import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '10px'
    })
  ),
  state('open',
    style({
      'min-width': '250px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);



export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '0px'
    })
  ),
  state('open',
    style({
      'margin-left': '178px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);

export const onMainContentChangec = trigger('onMainContentChangec', [
  state('close',
    style({
      'margin-left': '0px'
    })
  ),
  state('open',
    style({
      'margin-right':'40px',
      'margin-left': '0px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('350ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);
