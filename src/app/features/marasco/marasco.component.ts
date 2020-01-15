// import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http';

// @Component({
//   selector: 'app-root',
//   templateUrl: './marasco.component.html',
//   styleUrls: ['./marasco.component.css']
// })
// export class MarascoComponent implements OnInit {
//   constructor() {}

//   ngOnInit() {}
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./marasco.component.css']
})
export class MarascoComponent {
  title = 'sa';
}
