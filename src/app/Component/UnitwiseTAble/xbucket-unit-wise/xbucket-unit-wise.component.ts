import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { xbucketunitwise } from '../../model/xbucketunitwise';
import { UnitwiseService } from '../../service/unitwise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-xbucket-unit-wise',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './xbucket-unit-wise.component.html',
  styleUrl: './xbucket-unit-wise.component.scss'
})
export class XbucketUnitWiseComponent implements OnInit{
    buttons = [
    { label: 'UnitWise Table', route: 'unitwise' },
    { label: 'StateWise Table', route: 'statewise' },
    { label:'XBucketUnitWise Table',route:'xbucketunitwise'},
    { label:'XBucketStateWise Table',route:'xbucketstatewise'}
  ];
records: xbucketunitwise[] = [];
  currentDateTime: string = new Date().toLocaleString();
  // sortColumn: string;
  // sortDirection: string;
tableData: any[] = []; // Original data
sortedData: any[] = []; // Data after sorting
sortColumn: string = '';
sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private unitwise: UnitwiseService,private router:Router) {}
 
  ngOnInit(): void {
        this.unitwise.getXBucketAllRecords().subscribe((res: any) => {
      this.records = res.data;
      this.tableData=res.data;
        this.sortedData = [...this.tableData];
      this.addPercentages(); 
      
      // this.getGroupedRecords();
    });
  }

    navigate(route: string) {
       this.router.navigate(['/dashboard',route]);
  }
  
    get getGroupedRecords() {
    const grouped: { [key: string]: xbucketunitwise[] } = {};
  
    this.sortedData.forEach((rec: xbucketunitwise) => {
      if (!grouped[rec.bh]) grouped[rec.bh] = [];
      grouped[rec.bh].push(rec);
    });
  
    return grouped;
  }
    addPercentages() {
      const grouped = this.getGroupedRecords;
    
      Object.keys(grouped).forEach(key => {
        const group = grouped[key];
        // const totalVisited = group.reduce((sum, rec) => sum + rec.visitedClients, 0);
  
        group.forEach(rec => {
          rec.reducedPercent = rec.unique_Visits_on_X_bucket ? ((rec.reduced / rec.unique_Visits_on_X_bucket) * 100).toFixed(1) + '%' : '0%';
          rec.collectedPercent = rec.unique_Visits_on_X_bucket ? ((rec.collected / rec.unique_Visits_on_X_bucket) * 100).toFixed(1) + '%' : '0%';
        });
      });
    }

      getGroupTotal(group: xbucketunitwise[]) {

      const x_Bucket_flow_clients = group.reduce((a, b) => a + b.x_Bucket_flow_clients, 0);
      const visitsonXbucket = group.reduce((a, b) => a + b.visits_on_X_bucket, 0);
      const uniqueVisitsonXbucket = group.reduce((a, b) => a + b.unique_Visits_on_X_bucket, 0);
      const reduced = group.reduce((a, b) => a + b.reduced, 0);
      const collected = group.reduce((a, b) => a + b.collected, 0);
      const collectedAmount = group.reduce((a, b) => a + b.collected_Amount, 0);
    
      const reducedPercent = uniqueVisitsonXbucket ? ((reduced / uniqueVisitsonXbucket) * 100).toFixed(2) + '%' : '0%';
      const collectedPercent = uniqueVisitsonXbucket ? ((collected / uniqueVisitsonXbucket) * 100).toFixed(2) + '%' : '0%';
    
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
        return this.getGroupTotal(this.records);
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
