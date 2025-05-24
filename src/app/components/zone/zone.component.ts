import { NgClass } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, input, output, signal, Signal, viewChild } from '@angular/core';

@Component({
    selector: 'app-zone',
    templateUrl: './zone.component.html',
    styleUrl: './zone.component.scss',
    imports: [NgClass]
})
export class ZoneComponent implements AfterViewInit {
    height = input<number>();
    zoneHeightChange = output<number>();
    expanded = signal(true);
    items = signal(['פריט א', 'פריט ב', 'פריט ג']);
    wasInitialized = signal<boolean>(false);

    contentRows: Signal<ElementRef> = viewChild.required<ElementRef>('contentRows');

    contentHeight = signal(0);

    constructor() {
        effect(() => {
            const isOpen = this.expanded();
            this.items();

            requestAnimationFrame(() => {
                if (this.contentRows()) {
                    this.contentHeight.set(this.contentRows().nativeElement.scrollHeight);
                    if (isOpen) {
                        this.zoneHeightChange.emit(this.contentHeight());
                    } else {
                        this.zoneHeightChange.emit(0);
                    }
                }
            });
        });
    }
    
    ngAfterViewInit(): void {
        setTimeout(() => this.wasInitialized.set(true));
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
