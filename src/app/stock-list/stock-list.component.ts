import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup,Validators}from '@angular/forms'
import { itemNames } from '../models/items';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
stockForm !:FormGroup;
taskList: itemNames []=[];
inprogress:itemNames []=[];
done:itemNames []=[];
updateIndex!:any;
isEditEnabled:boolean=false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.stockForm=this.fb.group({
      item: [' ', Validators.required]
    })
  }
  addList(){
     this.taskList.push({
      description:this.stockForm.value.item,
      done:false
     })
  }
  deleteItem(index:number){
    this.taskList.splice(index,1);  
  }
  deleteInprogItem(index:number){
     this.inprogress.splice(index,1)
  }
  deleteDoneItem(index:number){
    this.done.splice(index,1)
  }
  onEdit(item:itemNames,index:number){
     this.stockForm.controls['item'].setValue(item.description)
     this.updateIndex=index;
     this.isEditEnabled=true;
  }
  updateList(){
    this.taskList[this.updateIndex].description = this.stockForm.value.item;
  }
  drop(event: CdkDragDrop<itemNames[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
