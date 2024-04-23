import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculadora de Calorías';
  // Variables para calculadora de calorias
  weight: number = 0;
  height: number = 0;
  age: number = 0;
  calories: number = 0;

  // Apoyo visual usuario
  weight_unit: string = 'kg';
  height_unit: string = 'm';
  min_weight: number = 40.5;
  max_weight: number = 300;
  min_height: number = 1.40;
  max_height: number = 2.25;
  min_age: number = 16;
  max_age: number = 105;

  handleSelectionChange(event: Event){
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    if (value === 'metric') {
      this.weight_unit = 'kg';
      this.height_unit = 'm';
      this.min_weight = 40.5;
      this.max_weight = 300;
      this.min_height = 1.40;
      this.max_height = 2.25;
    } else if (value === 'imperial') {
      this.weight_unit = 'lb';
      this.height_unit = 'in';
      this.min_weight = 89.29;
      this.max_weight = 661.39;
      this.min_height = 55.12;
      this.max_height = 88.58;
    }
  }

  handleInputChange(event: Event){
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (input.id === 'weight') {
      this.weight = (this.weight_unit === 'kg') ? this.kgToLb(value) : value;
    } else if (input.id === 'height') {
      this.height = (this.height_unit === 'm') ? this.mToIn(value) : value;
    } else if (input.id === 'age') {
      this.age = value;
    }
  }
  //Captura siempre en sistema imperial debido a que el cálculo se hace en base a libras y pulgadas
  kgToLb(kg: number): number {
    return kg * 2.20462;
  }
  mToIn(m: number): number {
    return m * 39.3701;
  }
}
