import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { unitwise } from '../../model/unitwise';
import { UnitwiseService } from '../../service/unitwise.service';

@Component({
  selector: 'app-unitwise',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './unitwise.component.html',
  styleUrl: './unitwise.component.scss'
})
export class UnitwiseComponent implements OnInit{
  records: unitwise[] = [];
  currentDateTime: string = new Date().toLocaleString();

  constructor(private unitwise: UnitwiseService) {}
  
  ngOnInit(): void {
    this.unitwise.getAllRecords().subscribe((res: any) => {
      this.records = res.data;
      this.addPercentages(); 
      
      // this.getGroupedRecords();
    });
  }
  
  get getGroupedRecords() {
    const grouped: { [key: string]: unitwise[] } = {};
  
    this.records.forEach((rec: unitwise) => {
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
        rec.reducedPercent = rec.visited_Clients ? ((rec.reduced / rec.visited_Clients) * 100).toFixed(1) + '%' : '0%';
        rec.collectedPercent = rec.visited_Clients ? ((rec.collected / rec.visited_Clients) * 100).toFixed(1) + '%' : '0%';
      });
    });
  }
  
  getGroupTotal(group: unitwise[]) {
  const visited = group.reduce((a, b) => a + b.visited_Clients, 0);
  const reduced = group.reduce((a, b) => a + b.reduced, 0);
  const collected = group.reduce((a, b) => a + b.collected, 0);
  const collectedAmount = group.reduce((a, b) => a + b.collected_Amount, 0);

  const reducedPercent = visited ? ((reduced / visited) * 100).toFixed(1) + '%' : '0%';
  const collectedPercent = visited ? ((collected / visited) * 100).toFixed(1) + '%' : '0%';

  return {
    visited,
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

}
