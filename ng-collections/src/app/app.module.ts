import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

import { NoItemsModule } from './ui/no-items/no-items.module';
import { SwalModule } from './ui/swal/swal.module';
import { NgxAdapterTableModule, TableLib } from './ui/ngx-adapter-table/ngx-adapter-table.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Material
    MatButtonModule,
    // Bit
    NoItemsModule,
    SwalModule,
    NgxAdapterTableModule.forRoot({ lib: TableLib.aggrid }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
