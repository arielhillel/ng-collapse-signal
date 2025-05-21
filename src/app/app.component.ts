import { Component, effect, ElementRef, signal, Signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    expanded = signal(true);
    items = signal(['פריט א', 'פריט ב', 'פריט ג']);

    contentRows: Signal<ElementRef> = viewChild.required<ElementRef>('contentRows');

    contentHeight = signal(0);

    constructor() {
        effect(() => {
            this.items();
            requestAnimationFrame(() => {
                if (this.contentRows()) {
                    this.contentHeight.set(this.contentRows().nativeElement.scrollHeight);
                }
            });
        });
    }

    toggle() {
        this.expanded.set(!this.expanded());
    }

    addItem() {
        this.items.set([...this.items(), 'עוד פריט']);
    }

    removeItem() {
        this.items.set(this.items().slice(0, -1));
    }
}