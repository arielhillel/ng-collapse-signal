import { Component, effect, ElementRef, input, output, signal, Signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class ZoneComponent {
  height = input<number>();
  zoneHeightChange = output<number>();
  expanded = signal(true);
  items = signal(['פריט א', 'פריט ב', 'פריט ג']);

  contentRows: Signal<ElementRef> = viewChild.required<ElementRef>('contentRows');

  contentHeight = signal(0);

  constructor() {
    effect(() => {
      // נטר גם את expanded
      const isOpen = this.expanded();
      this.items(); // ריאקטיביות ל-items

      requestAnimationFrame(() => {
        if (this.contentRows()) {
          this.contentHeight.set(this.contentRows().nativeElement.scrollHeight);
          // מעדכן גובה לאבא רק אם פתוח
          if (isOpen) {
            this.zoneHeightChange.emit(this.contentHeight());
          } else {
            this.zoneHeightChange.emit(0);
          }
        }
      });
    });
  }


  toggle() {
    this.expanded.update(v => !v);
  }

  addItem() {
    this.items.update(items => [...items, 'עוד פריט']);
  }

  removeItem() {
    this.items.update(items => items.slice(0, -1));
  }
}
