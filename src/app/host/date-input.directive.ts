import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="date"]'
})
export class DateInputDirective {

  private showBorder: boolean;

  @HostBinding('style.outline')
  private outline = 'none';

  @HostBinding('style.border')
  private get borderStyle(): string {
    return this.showBorder ? '2px solid OrangeRed' : '';
  }

  @HostBinding('hidden')
  private hidden = true;

  @HostListener('focus')
  private onFocus() {
    this.showBorder = true;
  }

  @HostListener('blur')
  private onBlur() {
    this.showBorder = false;
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.showBorder = false;
    }
  }

  @HostListener('click', ['$event'])
  @HostListener('dblclick', ['$event'])
  @HostListener('contextmenu', ['$event'])
  private onMouseClicks(mouseClick: MouseEvent) {
    if (mouseClick.type === 'contextmenu') {
      alert('Context menu is not supported');
      return false;
    }
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(target: HTMLElement) {
    if (target.id === 'show') {
      this.hidden = !this.hidden;
    }
  }
}
