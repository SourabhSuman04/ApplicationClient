import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { xbucketunitwise } from '../../model/xbucketunitwise';
import { Router } from '@angular/router';
import { UnitwiseService } from '../../service/unitwise.service';

@Component({
  selector: 'app-xbucket-state-wise',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './xbucket-state-wise.component.html',
  styleUrl: './xbucket-state-wise.component.scss'
})
export class XbucketStateWiseComponent {
   buttons = [
    { label: 'UnitWise Table', route: 'unitwise' },
    { label: 'StateWise Table', route: 'statewise' },
      { label:'XBucketUnitWise Table',route:'xbucketunitwise'},
      { label:'XBucketStateWise Table',route:'xbucketstatewise'}

  ];


    data: xbucketunitwise;
  records: xbucketunitwise[] = [];
  sortedData: xbucketunitwise[] = [];
  currentDateTime: string = new Date().toLocaleString();

  tableData: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  groupedRecords: { [key: string]: any[] } = {};
  constructor(private unitwiseservice: UnitwiseService,private router:Router) { }

  ngOnInit(): void {
    this.unitwiseservice.getXBucketAllRecords().subscribe((res: any) => {
      this.records = res.data;
      this.tableData = res.data;
      this.sortedData = [...this.tableData];

      this.prepareData(); 
    });
  }
     navigate(route: string) {
       this.router.navigate(['/dashboard',route]);
  }

   get groupedKeys(): string[] {
      return Object.keys(this.groupedRecords);
    }
    prepareData() {
      const grouped: { [bh: string]: { [key: string]: xbucketunitwise } } = {};
  
      this.sortedData.forEach((rec: any) => {
        const bh = rec.bh || 'Unknown BH';
        const groupKey = `${rec.state}___${rec.funder}`; // combine state + funder
  
        if (!grouped[bh]) grouped[bh] = {};
        if (!grouped[bh][groupKey]) {
          grouped[bh][groupKey] = { ...rec }; // clone first entry
        } else {
          grouped[bh][groupKey].x_Bucket_flow_clients += rec.x_Bucket_flow_clients || 0;
          grouped[bh][groupKey].visitsonXbucket += rec.visitsonXbucket || 0;
          grouped[bh][groupKey].uniqueVisitsonXbucket += rec.uniqueVisitsonXbucket || 0;
          grouped[bh][groupKey].reduced += rec.reduced || 0;
          grouped[bh][groupKey].collected += rec.collected || 0;
          grouped[bh][groupKey].collectedAmount += rec.collectedAmount || 0;
        }
      });
  
      this.groupedRecords = {};
  
      for (let bh in grouped) {
        const bhEntries = Object.values(grouped[bh]);
  
        // add percentages
        bhEntries.forEach(rec => {
          const visited = rec.uniqueVisitsonXbucket || 0;
          rec.reducedPercent = visited ? ((rec.reduced / visited) * 100).toFixed(1) + '%' : '0%';
          rec.collectedPercent = visited ? ((rec.collected / visited) * 100).toFixed(1) + '%' : '0%';
        });
  
        this.groupedRecords[bh] = bhEntries;
      }
    }

    getGroupTotal(group: any[]) {
    let x_Bucket_flow_clients = 0,visitsonXbucket=0,uniqueVisitsonXbucket=0, reduced = 0, collected = 0, collectedAmount = 0;

    group.forEach((rec: any) => {
      x_Bucket_flow_clients += rec.x_Bucket_flow_clients || 0;
      visitsonXbucket += rec.visitsonXbucket || 0;
      uniqueVisitsonXbucket += rec.uniqueVisitsonXbucket || 0;
      reduced += rec.reduced || 0;
      collected += rec.collected || 0;
      collectedAmount += rec.collected_Amount || 0;
    });

    const reducedPercent = uniqueVisitsonXbucket ? ((reduced / uniqueVisitsonXbucket) * 100).toFixed(1) + '%' : '0%';
    const collectedPercent = uniqueVisitsonXbucket ? ((collected / uniqueVisitsonXbucket) * 100).toFixed(1) + '%' : '0%';

    return {

      x_Bucket_flow_clients,
      visitsonXbucket,
      uniqueVisitsonXbucket,
      reduced,
      reducedPercent,
      collected,
      collectedPercent,
      collectedAmount
    };
  }

  get getGrandTotal() {
    let all: any[] = [];
    for (let bh in this.groupedRecords) {
      all = all.concat(this.groupedRecords[bh]);
    }
    return this.getGroupTotal(all);
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedData = [...this.tableData].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return this.sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'fa fa-sort';
    return this.sortDirection === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down';
  }

}
