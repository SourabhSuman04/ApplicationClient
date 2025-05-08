import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UnitwiseService } from '../../service/unitwise.service';
import { unitwise } from '../../model/unitwise';
import { Timestamp } from 'rxjs';


@Component({
  selector: 'app-unitwise',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './unitwise.component.html',
  styleUrl: './unitwise.component.scss'
})
export class UnitwiseComponent implements OnInit {

  data: unitwise[];
  currentDate: any;
  constructor(private unitwiseservice: UnitwiseService) {

  }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.getUnitwiserecords();
  }


  getUnitwiserecords() {
    this.unitwiseservice.getUnitwise().subscribe((res: any) => {
      this.data = res.data
      console.log(this.data)
    })
  }

  getGroupedRecords() {
    const grouped: { [key: string]: unitwise[] } = {};
    this.data.forEach(rec => {
      if (!grouped[rec.bh]) grouped[rec.bh] = [];
      grouped[rec.bh].push(rec);
    });

    Object.keys(grouped).forEach(bh => {
      const group = grouped[bh];
      // const totalVisited = group.reduce((sum, rec) => sum + rec.visited_Clients, 0);

      group.forEach(rec => {
        rec.reducedPercent = rec.visited_Clients ? ((rec.reduced / rec.visited_Clients) * 100).toFixed(1) + '%' : '0%';
        rec.collectedPercent = rec.visited_Clients ? ((rec.collected / rec.visited_Clients) * 100).toFixed(1) + '%' : '0%';
      });
    });
    return grouped;
  }

  getTotalForGroup(group: unitwise[]) {
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

  getGrandTotal() {

    return this.getTotalForGroup(this.data);
  }

}
