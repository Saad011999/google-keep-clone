class App{

    
    constructor(){
        this.notes = JSON.parse(localStorage.getItem('notes'))||[];
        this.$noteTitle="";
        this.$noteText="";
        this.id="";

        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$formBtns = document.querySelector('#form-buttons');
        this.$noteText = document.querySelector('#note-text');
        this.$placeholder = document.querySelector('#placeholder');
        this.$notes = document.querySelector('#notes');
        this.$formCloseButton = document.querySelector('#form-close-button');
        this.$modal = document.querySelector('.modal');
        this.$modalTitle = document.querySelector('.modal-title');
        this.$modalText = document.querySelector('.modal-text');
        this.$modalCloseButton = document.querySelector('.modal-close-button');
        this.$colorTooltip = document.getElementById('color-tooltip');

        this.saveNotes();
        this.displayNotes();
        this.addEventListeners();
    }


   
    addEventListeners(){
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
            this.deleteNote(event);
        });

       this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            const hasNotes = title || text;
            if(hasNotes){
                this.addNotes({title,text});
            }
            
        })

        document.body.addEventListener('mouseover', event => {  
            this.openTooltip(event);
        })

      document.body.addEventListener('mouseout', event => {
            this.closeTooltip(event);
        })

        this.$modalCloseButton.addEventListener('click', event =>{
            this.closeModel(event);
        })

        this.$formCloseButton.addEventListener('click', event => {
            event.stopPropagation();
            this.closeForm();
        })

    }

    handleFormClick(event){
        const isClicked = this.$form.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNotes = title || text;

        if(isClicked){
            this.openForm();
        }
        else if(hasNotes){
            this.addNotes();
        }
        else{
            this.closeForm();
        }
    }

    openForm(){
        this.$form.classList.add('form-open');
        this.$formBtns.style.display = 'block';
        this.$noteTitle.style.display = 'block';
    }

    closeForm(){
        this.$form.classList.remove('form-open');
        this.$formBtns.style.display = 'none';
        this.$noteTitle.style.display = 'none';
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }


   

    openModal(event){
        if(event.target.matches('.toolbar-delete')) return;

        if(event.target.closest('.note')){
            this.$modal.classList.toggle('open-modal');
            this.$modalTitle.value = this.title;
            console.log(this.title)
            this.$modalText.value = this.text;
        }
    }

    closeModel(event){
        this.editNote();
        this.$modal.classList.toggle('open-modal');
    }



    openTooltip(event){
        if(!event.target.matches('.toolbar-color')) return;
        this.id = event.target.dataset.id;
        const location = event.target.getBoundingClientRect();
        const horizontal = location.left + window.scrollX;
        const vertical = location.top + window.scrollY;
        this.$colorTooltip.style.transform = `translate(${horizontal}px ,${vertical}px)`;
        this.$colorTooltip.style.display = 'flex';
        this.$colorTooltip.style.position = 'absolute';
    }

    closeTooltip(event){
        if(!event.target.matches('.toolbar-color')) return;
        this.$colorTooltip.style.display = 'none';
    }


    addNotes(note){
        const newNote = {
            title : note.title,
            text : note.text,
            color : 'white',
            id : this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
         
        }
        this.notes = [...this.notes, newNote];
        this.closeForm();
       this.saveNotes();
       this.displayNotes();
    }

    editNote(){
        const title = this.$modalTitle.value;
        const text  = this.$modalText.value;
        console.log(title,text)
        this.notes =    this.notes.map(note =>
          note.id === Number(this.id) ? {...note, title, text} :note
            
        )

   
        
        // this.notes.map(note => 
        //     note.id === Number(this.id) ? { ...note, title, text } : note
        //   );
     
      this.saveNotes();
      this.displayNotes();
    }


    deleteNote(event){
        event.stopPropagation();
       if(!event.target.matches('.toolbar-delete')) return;
        const id  = event.target.dataset.id;
        console.log(id)
        this.notes= this.notes.filter(note => note.id !== Number(id));
        this.saveNotes();
        this.displayNotes();
    
    }


    
    selectNote(event){
        const $selectedNote = event.target.closest('.note');
        if(!$selectedNote)return;
        const[$noteTitle, $noteText] = $selectedNote.children;
        this.title=$noteTitle.innerText;
        this.text=$noteText.innerText;
        this.id = $selectedNote.dataset.id;
    }

   

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    displayNotes(){
        const hasNotes = this.notes.length > 0 ;
        if(hasNotes){
            this.$placeholder.style.display = 'none';
        }
        else{
            this.$placeholder.style.display = 'flex';
        }


        this.$notes.innerHTML = this.notes
        .map(
          note => `
          <div style="background: ${note.color};" style="position: relative;" class="note" data-id="${note.id}">
            <div class="${note.title && "note-title"}">${note.title}</div>
            <div class="note-text">${note.text}</div>
            <div class="toolbar-container">
              <div class="toolbar">
                <img data-id=${note.id} class="toolbar-color"} src="https://icon.now.sh/palette">
                <img data-id=${note.id} class="toolbar-delete"  src="https://icon.now.sh/delete">
              </div>
            </div>
          </div>
       `
        )
        .join("");
  



    //       this.$notes.innerHTML =  this.notes.map(note => `
    //       <div style="background:${note.color}"  class="note" data-id="${note.id}">
    //         <div class="${note.title && 'note-title'}">${note.title}</div>
    //         <div class="note-text">${note.text}</div>
    //         <div class="toolbar-container">
    //           <div class="toolbar">
    //             <img class="toolbar-color" data-id="${note.id}" src="https://icon.now.sh/palette">
    //             <img class="toolbar-delete"    src="https://icon.now.sh/delete" data-id="${note.id}">
    //           </div>
    //         </div>
    //       </div>
    //    `).join("");
        
        }  

   



    }


new App();

