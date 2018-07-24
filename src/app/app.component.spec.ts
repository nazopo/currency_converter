import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'currency converter'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toContain('currency converter');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('currency converter');
  }));
  it('should converter input from US to Euro', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let from_input = fixture.debugElement.query(By.css('#from'));
      let el1 = from_input.nativeElement;
      let to_input = fixture.debugElement.query(By.css('#to'));
      let el2 = to_input.nativeElement;
      expect(el2.value).toBe('0.86');

      el1.value = '1';
      el1.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.user.username).toBe('someValue');
  });
  it('should converter input from ALL to Euro', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let from_input = fixture.debugElement.query(By.css('#from'));
      let el1 = from_input.nativeElement;
      let to_input = fixture.debugElement.query(By.css('#to'));
      let el2 = to_input.nativeElement;
      expect(el2.value).toBe('0.86');

      el1.value = '1';
      el1.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.user.username).toBe('someValue');
  });
  it('should converter input from ALL to HKD', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let from_input = fixture.debugElement.query(By.css('#from'));
      let el1 = from_input.nativeElement;
      let to_input = fixture.debugElement.query(By.css('#to'));
      let el2 = to_input.nativeElement;
      expect(el2.value).toBe('0.073139');

      el1.value = '1';
      el1.dispatchEvent(new Event('input'));
  });
}));
});
