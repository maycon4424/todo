import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = [];

  constructor(private alertControl: AlertController,
              private toastControl: ToastController,
              private actionSheetControl: ActionSheetController
  ) {
    let taskJSON = localStorage.getItem('taskDB');

    if(taskJSON != null){
      this.tasks = JSON.parse(taskJSON);
    }
  }

  async showAdd(){
    const alert = await this.alertControl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {name: 'task',
        type: 'text',
        placeholder: 'Digite a nova tarefa'
        }
      ],
      buttons: [
        {text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelou!')
          }
        },{
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.task);
          }
        }
      ]
    });
    await alert.present();
  }

  async add(newTask: string){
    if(newTask.trim().length < 1){
      const toast = await this.toastControl.create({
        message: 'Informe a tarefa!!',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

    let task = {name:newTask, done: false};
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  updateLocalStorage(){
    localStorage.setItem('taskDB', JSON.stringify(this.tasks));
  }

  async openActions(task:any){
    const actionSheet = await this.actionSheetControl.create({
      header: 'O que fazer',
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;
          this.updateLocalStorage
        },

      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar selecionado!')
        }
      }
    ]
    });

    await actionSheet.present();
  }

  deletar(task: any){
    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.updateLocalStorage();
  }

}
