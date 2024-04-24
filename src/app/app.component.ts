import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { min } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculadora de Calorías';
  // Variables para calculadora de calorias
  weight: number = 0;
  height: number = 0;
  age: number = 0;
  factor: number = 0;
  calories: number = 0;
  metrix: string = 'metric';

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
      this.min_weight = this.kgToLb(this.min_weight);
      this.max_weight = this.kgToLb(this.max_weight);
      this.min_height = this.mToIn(this.min_height);
      this.max_height = this.mToIn(this.max_height);
    }
    this.metrix = value;
  }

  handleInputChange(event: Event){
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (input.id === 'weight') {
      this.weight = (this.metrix === 'metric') ? this.kgToLb(value) : value;
      // console.log('Peso: '+this.weight+ ' Factor: ' + this.factor + 'min: '+this.min_weight + 'max: ' + this.max_weight);
      this.validateWeight();
    } else if (input.id === 'height') {
      this.height = (this.metrix === 'metric') ? this.mToIn(value) : value;
      this.validateHeight();
    } else if (input.id === 'age') {
      this.age = value;
      this.validateAge();
    }
    this.calculateCalories();
  }
  //Captura siempre en sistema imperial debido a que el cálculo se hace en base a libras y pulgadas
  kgToLb(kg: number): number {
    return kg * 2.20462;
  }
  mToIn(m: number): number {
    return m * 39.3701;
  }

  calculateFactor() {
    if (this.weight<165 && this.weight>=this.min_weight){
      this.factor = 1.6;
    }
    else if (this.weight>=165 && this.weight<201){
      this.factor = 1.4;
    }
    else if (this.weight>=201 && this.weight<220){
      this.factor = 1.2;
    }
    else if (this.weight>=220 && this.weight<=this.max_weight){
      this.factor = 1;
    }
  }
  calculateCalories(){
    this.calculateFactor();
    this.calories = Number(((10 * this.weight + 6.25 * this.height - 5 * this.age + 5) * this.factor).toFixed(2));
  }
  validateAge(): boolean {
    return this.age >= this.min_age && this.age <= this.max_age && Number.isInteger(this.age);
  }
  validateWeight(): boolean {
    return this.metrix ==='metric' ? (this.weight >= this.kgToLb(this.min_weight) && this.weight <= this.kgToLb(this.max_weight)) : (this.weight >= this.min_weight && this.weight <= this.max_weight);
  }
  validateHeight(): boolean {
    return this.metrix ==='metric' ? (this.height >= this.mToIn(this.min_height) && this.height <= this.mToIn(this.max_height)) : (this.height >= this.min_height && this.height <= this.max_height);
  }
}
