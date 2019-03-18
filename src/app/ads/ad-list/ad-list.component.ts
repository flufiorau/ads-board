import {Component, OnInit} from '@angular/core';
import {AdsDataSource} from '../interfaces';
import {AdsService} from '../ads.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  adDataSource: AdsDataSource;
  length: number;
  pageSize = 5;

  // MatPaginator Output
  pageEvent = new PageEvent();

  constructor(private adsService: AdsService) {
    this.pageEvent.pageIndex = 0;
  }

  ngOnInit() {
    this.adsService.getAdsDataFromStorage();
    this.adsService.adsPageableList.subscribe((data) => {
      if (data) {
        this.adDataSource = data;
        this.length = data.totalElements;
      }
    });
  }

}
