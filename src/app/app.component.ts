import { Component, signal } from '@angular/core';
import { ZoneComponent } from './components/zone/zone.component';

interface ZoneData {
  id: string;
}

interface RowData {
  id: string;
  zones: ZoneData[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ZoneComponent],
  standalone: true
})
export class AppComponent {
  rows = signal<RowData[]>([
    { id: this.uid(), zones: [{ id: this.uid() }, { id: this.uid() }] }
  ]);

  zoneHeights = signal<Record<string, number>>({});

  updateZoneHeight = (zoneId: string, height: number) => {
    this.zoneHeights.update(prev => ({ ...prev, [zoneId]: height }));
  };

  rowMaxHeight = (row: RowData) => {
    const heights = row.zones.map(z => this.zoneHeights()[z.id] || 0);
    return Math.max(...heights, 0);
  };

  addRow() {
    this.rows.update(rows => [...rows, { id: this.uid(), zones: [{ id: this.uid() }] }]);
  }

  addZone(rowIndex: number) {
    this.rows.update(rows => {
      const updated = [...rows];
      updated[rowIndex] = {
        ...updated[rowIndex],
        zones: [...updated[rowIndex].zones, { id: this.uid() }]
      };
      return updated;
    });
  }

  uid() {
    return Math.random().toString(36).substring(2, 10) + Date.now();
  }
}
