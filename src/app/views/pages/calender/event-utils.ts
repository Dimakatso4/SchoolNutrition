import { EventInput } from '@fullcalendar/angular';
import { date } from 'ngx-custom-validators/src/app/date/validator';


let eventGuid = 0;
//const TODAY_STR = () => {
 // let dateObj = new Date();
  //if(dateObj.getUTCMonth() < 10) {
  //  return dateObj.getUTCFullYear() + '-' + ('0'+(dateObj.getUTCMonth() + 1));
  //} else {
   // return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  //}
//}
// objects


//
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term1Start = new Date('2021-01-12').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term1End = new Date('2021-04-28').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term2Start = new Date('2021-06-24').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term2End = new Date('2021-07-27').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term3tart = new Date('2021-09-25').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term3End = new Date('2021-10-01').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term4Start = new Date('2021-10-15').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term4End = new Date('2021-12-15').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today




// Calendar Event Source
export const INITIAL_EVENTS: EventInput[] = [
  
 
  {
    id: createEventId(),
    title: 'present day',
    start: TODAY_STR ,
    backgroundColor: 'rgba(#f3f3fe)',
    borderColor: '#727cf5'
  },
  {
    id: createEventId(),
    title: 'Food delivery',
    start:  term1Start,
    backgroundColor: '#fffbf2',
    borderColor: '#fbbc06'
  },

 
 



];
//

//export const INITIAL_EVENTS: EventInput[] = [ ...exampleEvents, ...birthdayEvents, ...holidayEvents, ...discoveredEvents, ...meetupEvents, ...otherEvents];

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00'
//   }
// ];

export function createEventId() {
  return String(eventGuid++);
}
