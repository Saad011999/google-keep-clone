ADDING QS TO SAVE NOTES IN APP: - 

add a qs to submit on the form
take title and text values
const hasNote = check if any one is empty( || ) 
create if note present call addnote({title,text})
note array
create addnote args - notes
create obj in addnotes i.e. notes array will be an array of objects
parameters of newnote = title,text,color,id(notes ki length if >0 to uski last index wali id ki next id deni hai wrna agar empty hai to 1st;
reassign array to notes = with past element spread out + newnote

DISPLAYING NOTES ON THE APP :-

create displayNotes(){
.if notes have element then hide place holder or else keep it showing.
.iterate over notes and for each note change innerhtml of # notes
--.note.bg:notecolor
    .notetitle
    .notetext
    .toolbar  
      .img- toolbar color
      .img - toolbar-delete

IMPROVING FUNCTIONALITY : - 

. if a user click away from the form save the form
.make close-form-button work


EDITING NOTES : -

. add modal html
.to body click listener call openModal
.create openModal(event)
.closest agar .note hai to modal ko toggle krdo
.selectNote call inside listener
.create selectNote(event) - selected note = target note
.get the children of selected
.with destructuring get $noteTitle/text and reference it to this.title/text
.give data-id to note html element
.this.title/text ="" ;in the constructor
.id = selectNote.dataset.id
.modal title value = title /text
.closeModal event listener
.closeModal call
closemodal(){
editnote(){
.const title/text same as modal 
.iterate through notes and find the index with same id as this.id and update it-
..use map if id is same make an object to replace the existing note .
.this.id is a string so change its  type
.close the modal toggle the modal

CHANGING NOTE  COLORS:-
.display tooltip on hover
.opentooltip func creation take hover event 
.if the target of the hover is not equal to the req elem. return from this function
.give data id to toolbar color
.get horizontal and vertical position of the tooltip.


DELETE A NOTE :--


















