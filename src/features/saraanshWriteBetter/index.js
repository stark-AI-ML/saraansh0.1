import SaraanshMain from "../../core/saraansh";







class saraanshWriteBetterUI extends SaraanshMain{


    createUI(){
      const inputField =  document.querySelectorAll('.editable, input[type="text"],textarea '); 

      inputField.innerHtml = `
                 <div class="container">
        <div class="input-container">
            <textarea placeholder="Start typing or paste your content here...">This is an example text that you can edit. Click the assistant button to get suggestions on how to improve your writing, fix grammar issues, or change the tone of your text.</textarea>
            <button class="assistant-btn" id="assistantBtn">
                <i class="fas fa-magic"></i>
            </button>
        </div>
    </div>

      `


    }

}




function main(){

    console.log(" i am working just so you know"); 
    new  saraanshWriteBetterUI().createUI; 
}
main(); 