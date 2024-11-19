import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';



const primeNG: any = [
  ButtonModule,
  ProgressBarModule,
  ToastModule,
  ChartModule,
  StyleClassModule,
  GalleriaModule,
  ImageModule,
  CarouselModule,
  ProgressSpinnerModule,
  MultiSelectModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [primeNG]
})
export class PrimengModule { }
