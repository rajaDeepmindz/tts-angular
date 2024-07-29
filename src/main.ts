import { bootstrapApplication } from '@angular/platform-browser';
import { OrderFormComponent } from './app/order-form/order-form.component';

bootstrapApplication(OrderFormComponent)
  .catch(err => console.error(err));
