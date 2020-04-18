import { Component, OnInit } from '@angular/core';
import { ClerkService } from 'app/shared/services/clerk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'voyage';

  constructor(
    protected clerkService: ClerkService
  ) { }

  ngOnInit(): void {
    this.clerkService.init();
  }
}
