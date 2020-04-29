import { Component, OnInit, Input } from '@angular/core';
import {
  faHome,
  faShip,
  faTasks,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ClerkService } from 'app/shared/services';

@Component({
  selector: 'vy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() activeTab = 'home';

  public faHome = faHome;
  public faShip = faShip;
  public faTasks = faTasks;
  public faTrash = faTrash;


  public restart() {
    this.clerkService.restart();
  }


  constructor(
    protected clerkService: ClerkService
  ) { }

  ngOnInit(): void {
  }

}
