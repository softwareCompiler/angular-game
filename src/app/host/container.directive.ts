import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'section.container',
})
export class ContainerDirective {

  private colors = colorGenerator();
  private boxColor = null;

  @HostBinding('style.background-color')
  private color: string;

  @HostBinding('title')
  private get title() {
    return `${this.color ? this.color : 'Blank'} box`;
  }

  @HostListener('mouseover')
  private onMouseOver() {
    this.color = this.boxColor;
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    this.color = null;
  }

  @HostListener('click')
  private onClick() {
    this.boxColor = this.colors.next().value;
    this.onMouseOver();
  }

  @HostListener('dblclick')
  private onDoubleClick() {
    this.boxColor = null;
    this.onMouseOver();
  }
}

function* colorGenerator(): IterableIterator<string> {
  const colors = ['LightBlue', 'Pink', 'LightGreen'];
  let i = -1;
  while (true) {
    i < colors.length - 1 ? i++ : i = 0;
    yield colors[i];
  }
}
