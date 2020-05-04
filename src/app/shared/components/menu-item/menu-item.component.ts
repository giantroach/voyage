import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faArrowsAlt,
  faArrowsAltH,
  faArrowsAltV,
  faBed,
  faCog,
  faDatabase,
  faFish,
  faPlus,
  faTachometerAlt,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vy-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() name = '';
  @Input() icon = '';
  @Input() linkTo = '';
  @Input() dispCancel = false;
  @Input() elevation = 2;
  @Output() cancel = new EventEmitter<Event>();


  public getIcon(icon: string) {
    switch (icon) {
      case 'arrowsAlt':
        return faArrowsAlt;
      case 'arrowsAltV':
        return faArrowsAltV;
      case 'arrowsAltH':
        return faArrowsAltH;
      case 'bed':
        return faBed;
      case 'database':
        return faDatabase;
      case 'fish':
        return faFish;
      case 'plus':
        return faPlus;
      case 'tachometerAlt':
        return faTachometerAlt;
      case 'faTools':
        return faTools;
      default:
        return faCog;
    }
  }


  public doCancel(): void {
    this.cancel.emit();
  }


  constructor() { }


  ngOnInit(): void {
  }

}
