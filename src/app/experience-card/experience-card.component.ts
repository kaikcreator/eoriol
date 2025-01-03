import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-experience-card',
    templateUrl: './experience-card.component.html',
    styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent {
    @Input() date: string;
    @Input() title: string;
    @Input() company: string;
    @Input() description: string;
    @Input() tags: string[];
}