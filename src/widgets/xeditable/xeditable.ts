import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "xeditable",
    template: `
        <ion-textarea *ngIf="value && !editing" rows='3' readonly (click)="startEditing()" [(ngModel)]="value"></ion-textarea>
        <ion-textarea *ngIf="!value && !editing" rows='3' readonly (click)="startEditing()" value="点击添加描述信息"></ion-textarea>
        <ion-item *ngIf="editing">
            <ion-textarea [(ngModel)]="newValue" rows='3' placeholder="添加描述信息"></ion-textarea>
            <div class="buttons" item-right>
                <button ion-button (click)="accept()">
                <ion-icon name="checkmark"></ion-icon>
                </button>
                <button ion-button (click)="cancel()">
                <ion-icon name="close"></ion-icon>
                </button>
            </div>
        </ion-item>`,
})
export class XeditableComponent {
    @Input() value: string;
    newValue: string;
    @Output() valueChange = new EventEmitter<string>();
    editing: boolean;

    ngOnChanges(): void {
        this.newValue = this.value;
    }

    startEditing(): void {
        this.editing = true;
    }

    accept(): void {
        this.value = this.newValue;
        this.valueChange.emit(this.newValue);
        this.editing = false;
    }

    cancel(): void {
        this.newValue = this.value;
        this.editing = false;
    }
}

