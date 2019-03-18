import {Component, Input, OnInit} from '@angular/core';
import {Ad} from '../interfaces';
import {AuthService} from '../../core/auth/auth.service';
import {AdsService} from '../ads.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  currentUser: string;
  hasAccess: boolean;
  @Input() ad: Ad;

  constructor(private authService: AuthService,
              private adsService: AdsService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        this.setHasAccessFieldValue();
      }
    );
  }

  editAd() {
    this.router.navigateByUrl(`/edit/${this.ad.id}`);
  }

  deleteAd() {
    this.adsService.deleteAd(this.ad.id).subscribe();
  }

  private setHasAccessFieldValue() {
    this.hasAccess = this.ad.author === this.currentUser;
  }
}
