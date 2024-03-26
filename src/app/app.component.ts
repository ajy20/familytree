import { Component, ElementRef, ViewChild } from '@angular/core';
import FamilyTree from "@balkangraph/familytree.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tree: any;

  constructor() {   }

  ngOnInit() {
    const treeElement = document.getElementById('tree');
    if (treeElement) {
      this.tree = new FamilyTree(treeElement, {
        mouseScrool: FamilyTree.none,
        mode: 'light',
        template: 'hugo',
        roots: [1],
        nodeMenu: {
          edit: { text: 'Edit' },
          details: { text: 'Details' },
        },
        nodeTreeMenu: true,
        menu: {
          // pdf: { text: "Export PDF" },
          png: { text: "Export PNG" },
          // svg: { text: "Export SVG" },
          // csv: { text: "Export CSV" },
          json: { text: "Export JSON" },
          importJSON: { text: "Import JSON", onClick: this.importJSONHandler.bind(this) },
        },
        nodeBinding: {
          field_0: 'name',
          field_1: 'born',
          img_0: 'photo'
        },
        editForm: {
          titleBinding: "name",
          photoBinding: "photo",
          addMoreBtn: 'Add element',
          addMore: 'Add more elements',
          addMoreFieldName: 'Element name',
          generateElementsFromFields: false,
          elements: [
            { type: 'textbox', label: 'Full Name', binding: 'name' },
            { type: 'textbox', label: 'Email Address', binding: 'email' },
            [
              { type: 'textbox', label: 'Phone', binding: 'phone' },
              { type: 'date', label: 'Date Of Birth', binding: 'born' }
            ],
            [
              { type: 'select', options: [{ value: 'bg', text: 'Bulgaria' }, { value: 'ru', text: 'Russia' }, { value: 'gr', text: 'Greece' }], label: 'Country', binding: 'country' },
              { type: 'textbox', label: 'City', binding: 'city' },
            ],
            { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
          ]
        },
      });

      this.tree.on('field', (sender: any, args: any) => {
        if (args.name === 'born') {
          const date = new Date(args.value);
          const dateParts = date.toLocaleDateString().split("/");
          const day = dateParts[1] || '';
          const month = dateParts[0] || '';
          const year = dateParts[2] || '';
          args.value = year == '' ? '' : `${day}/${month}/${year}`;
        }
      });

      this.tree.load(
        [
          { id: 1, pids: [], name: "Ajay Pawar", gender: "male", born: '1994-10-24', phone: "+91-9850388983", photo: "" },
          // { id: 2, pids: [1], name: "Ava Field", gender: "male", phone: "+7(3952)67-30-48", photo: "https://cdn.balkan.app/shared/m60/3.jpg" },
          // { id: 3, pids: [1, 2], gender: 'female', photo: 'https://cdn.balkan.app/shared/w60/1.jpg', name: 'Laura Shepherd', born: '1943-01-13', email: 'laura.shepherd@gmail.com', phone: '+44 845 5752 547', city: 'Moscow', country: 'ru' },
          // { id: 4, pids: [5], photo: 'https://cdn.balkan.app/shared/m60/3.jpg', name: 'Rowan Annable' },
          // { id: 5, pids: [4], gender: 'female', photo: 'https://cdn.balkan.app/shared/w60/3.jpg', name: 'Lois Sowle' },
          // { id: 6, mid: 2, fid: 3, pids: [7], gender: 'female', photo: 'https://cdn.balkan.app/shared/w30/1.jpg', name: 'Tyler Heath', born: '1975-11-12' },
          // { id: 7, pids: [6], mid: 5, fid: 4, gender: 'male', photo: 'https://cdn.balkan.app/shared/m30/3.jpg', name: 'Samson Stokes', born: '1986-10-01' },
          // { id: 8, mid: 7, fid: 6, gender: 'female', photo: 'https://cdn.balkan.app/shared/w10/3.jpg', name: 'Celeste Castillo', born: '2021-02-01' }
        ]
      );
    }
  }

  importJSONHandler() {
    this.tree.importJSON();
  }
}
