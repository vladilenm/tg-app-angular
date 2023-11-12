import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  styles: `
    .form {
      heigth: 70vh;
      justify-content: center;
    }
  `,
  template: `
    <form class="centered form">
      <h2 class="mb">Обратная связь</h2>
      <!-- <h4>{{ feedback() }}</h4> -->
      <textarea
        [value]="feedback()"
        (input)="handleChange($event)"
        class="form-control"
      ></textarea>
    </form>
  `,
})
export class FeedbackComponent implements OnInit, OnDestroy {
  feedback = signal('');

  constructor(private telegram: TelegramService) {
    this.sendData = this.sendData.bind(this);
  }

  ngOnInit(): void {
    this.telegram.MainButton.setText('Отправить сообщение');
    // this.telegram.MainButton.show();
    // this.telegram.MainButton.disable();
    this.telegram.MainButton.hide();
    this.telegram.MainButton.onClick(this.sendData);
  }

  sendData() {
    this.telegram.sendData({ feedback: this.feedback() });
  }

  handleChange(event) {
    this.feedback.set(event.target.value);
    if (this.feedback().trim()) {
      this.telegram.MainButton.show();
    } else {
      this.telegram.MainButton.hide();
    }
  }

  ngOnDestroy(): void {
    this.telegram.MainButton.offClick(this.sendData);
  }
}
