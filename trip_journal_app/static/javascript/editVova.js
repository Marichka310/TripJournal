 var Images = [] //масив карттинок, що будуть аплоудитись

//Скріпт ,що буде виконуватись після загрузки DOM
window.onload=function(){
//Variables
    var story_cont = document.getElementById('story_content'),       
        added_artifact=document.getElementById("added_artifact"),       
        added_image=document.getElementById("added_image"),       
        added_text=document.getElementById("added_text"),        
        textarea = document.getElementById('textarea'),
        textarea_artifact = document.getElementById('textarea_artifact'),
        photo_cont = document.getElementById('photo_cont'),
        plusText=document.getElementById("adds_block_t"),
        plusPhoto=document.getElementById("adds_block_p"),
        plusArtifact=document.getElementById("adds_block_a"),       
        fileSelect = document.getElementById('type_file');
//Events
        fileSelect.addEventListener("change", add_img);
        story_cont.addEventListener("mouseover", showKeybar);
        story_cont.addEventListener("mouseout", hideKeybar);
        story_cont.addEventListener("click", mainClick);
        added_artifact.addEventListener("click", showArtifactPanel);
        added_image.addEventListener("click", showImagePanel);
        added_text.addEventListener("click", showTextPanel);
        plusText.addEventListener("click", save_text_story);
        plusPhoto.addEventListener("click", save_photo_story);
        plusArtifact.addEventListener("click", save_photo_artifact);

//функція вертає з урла браузера story_id
function storyIdFromUrl(){    
    var currUrl = document.URL.split(['/']);
    return currUrl[currUrl.length - 1];
}

//показує панель текста
function showTextPanel(){
    clear()
    this.style.background = '#8ed41f';
    text_panel.style.display = 'block';
    document.getElementById('textarea').focus();  
}

//показує панель фото
function showImagePanel(){
    clear()  
    this.style.background = '#8ed41f';
    photo_panel.style.display = 'block';    
}

//показує панель артефакта
function showArtifactPanel(){
    clear()
    this.style.background = '#8ed41f';
    artifact_panel.style.display = 'block';
    document.getElementById('textarea_artifact').focus();
}

//функція вертає всі панелі текста, фото, артефакта в початковий стан
function clear() {
        var hidePanels = document.getElementsByClassName('hide');
            for(var i=0; i<hidePanels.length; i++){
               hidePanels[i].style.display = 'none'; 
            }
        added_text.style.background = "#80B098";
        added_image.style.background = "#80B098";
        added_artifact.style.background = "#80B098";
        textarea.value = '';
        textarea_artifact.value = '';
        photo_cont.innerHTML = '';
        photo_cont.style.display = 'none';
    }

//зберігає текстовий блок
function save_text_story(){       
    var text = escape_html_tags(textarea.value)        
        appendBlock(text, "text");
        clear();
        savePage();       
    }

function escape_html_tags(str) {
    return str.replace(/>/g, '&gt;').replace(/</g, '&lt;');
}

//додає блок заданорго типу ("text","img","artifact")
function appendBlock(blockContent, block_type){
    var container = document.createElement('div'),
        keybar = document.createElement('div'),        
        buttons= ['top','bottom','delete','addmarker','removemarker'];
        if(block_type=="artifact"){
           buttons= ['top','bottom','delete','addmarkerArtifact','removemarker']; 
        }
        container.className = "block_story";
        container.setAttribute("block_type", block_type) //записуєм тип елемента атрибутом
        story_cont.appendChild(container)
        container.innerHTML =blockContent   
        keybar.className = "key_panel"
        container.appendChild(keybar);   
        for(i=0;i<buttons.length;i++){
            var button=document.createElement('button');
                button.className=buttons[i];
                keybar.appendChild(button);
        } 
        savePage();    
}

//функція показуе панель кнопок при наведенні на блок
function showKeybar(e){
    var target = e.target;
        while(target!=this){
            if(target.className=="block_story"){
                var key_panel= target.getElementsByClassName("key_panel")[0];
                    key_panel.style.display="block";                             
            }
        target=target.parentNode;    
        }
}

//функція ховає панель кнопок при наведенні на блок
function hideKeybar(e){
    var target = e.target;
        while(target!=this){
            if(target.className=="block_story"){
                var key_panel= target.getElementsByClassName("key_panel")[0];               
                    key_panel.style.display="none";
            }
        target=target.parentNode;    
        }
}

//основна хендлер в якому задаеться яка функція визиваеться при якому кліку
function mainClick(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
        while(target.id!="story_content"){
            if(target.id){               
                switch(target.id){
                //    case "added_artifact": alert(indexOfClickedBlock(target)); return;
                //    case "added_image": alert("red"); return;
                }
            }else{
                switch(target.className){
                    case "block_story": alert(indexOfClickedBlock(target)); return;                  
                }
            }                                  
            target=target.parentNode;           
        }           
}

//функція вертає індекс блока по якому клікнули
function indexOfClickedBlock(element){
    while (element.className!="block_story"){
        element=element.parentNode;
    }
    var my=document.getElementsByClassName("block_story")
        for(var i=0; i<my.length; i++){
            if(my[i]==element) return i;          
        } 
}

//функція показуе картинку в photo_cont через HTML5 ObjectURL
function add_img() {       
        var i, URL, imageUrl, id, file,
            files = fileSelect.files;
        if (files.length > 0) {
            for (i = 0; i < files.length; i++) {
                file = files[i];
                if (!file.type.match('image.*')) { //вибираєм з файлів тільки картинки 
                    continue;
                }
                Images.push(file);
                URL = window.URL;
                if (URL) {
                    var imageUrl = URL.createObjectURL(files[i]);            
                    var img_block=document.createElement("div");
                        img_block.className="img_block";
                        photo_cont.appendChild(img_block)
                    var img_story=document.createElement("img")
                        img_story.className="img_story";
                        img_story.src=imageUrl;
                        img_block.appendChild(img_story);
                    var button_delete=document.createElement("button");
                        button_delete.className="button_3";
                    var x=document.createTextNode("x");
                        button_delete.appendChild(x)
                        img_block.appendChild(button_delete);
                }
            }
        document.getElementById('photo_cont').style.display = 'inline-block';
        }
    }

//зберігає  блок з картинками
function save_photo_story() {       
        var i,
            arr = document.getElementsByClassName("img_story"),
            content = '';
        story_cont.style.display = 'block';
        for (i = 0; i < arr.length; i++) {
            content += img_block_template(arr[i].src);
        }
        appendBlock(content, "img");
        clear();
    }

//робить обгортку над картинками для додавання в блок
function img_block_template(src, img_id) {     
    return ('<img src="' + src + '"class="image_story" data-dbid="' +img_id + '">');
}


//функція додає блок артефакт
function save_photo_artifact(){
    var artifact=textarea_artifact.value;       
        appendBlock(escape_html_tags(artifact), "artifact")
        clear();
        savePage();          
}




}
