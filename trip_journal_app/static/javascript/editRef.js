 var Images = []; //Array of pictures for upload

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
        story_cont.addEventListener("click", buttonsClick);
        added_artifact.addEventListener("click", showArtifactPanel);
        added_image.addEventListener("click", showImagePanel);
        added_text.addEventListener("click", showTextPanel);
        plusText.addEventListener("click", save_text_story);
        plusPhoto.addEventListener("click", save_photo_story);
        plusArtifact.addEventListener("click", save_photo_artifact);

//Functions
//show panel of text
function showTextPanel(){
    clear()
    this.style.background = '#8ed41f';
    text_panel.style.display = 'block';
    textarea.focus();  
}

//show panel of image
function showImagePanel(){
    clear()  
    this.style.background = '#8ed41f';
    photo_panel.style.display = 'block';    
}

//show panel of artifact
function showArtifactPanel(){
    clear()
    this.style.background = '#8ed41f';
    artifact_panel.style.display = 'block';
    textarea_artifact.focus();
}

//function returns all panels of text, images, artifacts in default condition 
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

//function adds a block of a given type ("text","img","artifact")
function appendBlock(blockContent, block_type){
    var container = document.createElement('div'),
        keybar = document.createElement('div'),        
        buttons= ['top','bottom','delete','addmarker','removemarker'];
        if(block_type=="artifact"){
           buttons= ['top','bottom','delete','addmarkerArtifact','removemarker']; 
        }
        container.className = "block_story";
        container.setAttribute("block_type", block_type) //write type as an attribute of the element
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

//save text block
function save_text_story(){       
    var text = escape_html_tags(textarea.value)        
        appendBlock(text, "text");
        clear();
        savePage();       
    }

function escape_html_tags(str) {
    return str.replace(/>/g, '&gt;').replace(/</g, '&lt;');
}

//save artifact block
function save_photo_artifact(){
    var artifact=textarea_artifact.value;       
        appendBlock(escape_html_tags(artifact), "artifact")
        clear();
        savePage();          
}

//function shows the image in photo_cont using HTML5 ObjectURL
function add_img() {       
        var i, URL, imageUrl, id, file,
            files = fileSelect.files;
        if (files.length > 0) {
            for (i = 0; i < files.length; i++) {
                file = files[i];
                if (!file.type.match('image.*')) { //Select from files only pictures 
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

//save photo block
function save_photo_story() {       
    var arr = document.getElementsByClassName("img_story"),
        content = '';
        story_cont.style.display = 'block';
        for (var i = 0; i < arr.length; i++) {
            content += img_block_template(arr[i].src);
        }
        appendBlock(content, "img");
        clear();
    }

//Creates wrap over images to add to the block
function img_block_template(src, img_id) {     
    return ('<img src="' + src + '"class="image_story" data-dbid="' +img_id + '">');
}

//function shows buttons when the mouse pointer moves over the "block_story"
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

//function hides buttons when the mouse pointer leaves the "block_story"
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

//the main function that defines the function for each button
function buttonsClick(e){
    var target = e.target;
        while(target.id!="story_content"){
                switch(target.className){
                    case "top": moveBlockUp(target); return;
                    case "bottom": moveBlockDown(target); return;
                    case "delete": deleteBlock(target); return;
                    case "addmarker": alert("addmarker"); return;
                    case "removemarker": alert("removemarker"); return;                   
                }                                             
            target=target.parentNode;           
        }           
}

//function returns the index of the clicked block
function indexOfClickedBlock(element){
    while (element.className!="block_story"){
        element=element.parentNode;
    }
    var my=document.getElementsByClassName("block_story")
        for(var i=0; i<my.length; i++){
            if(my[i]==element) return i;          
        } 
}

//move block up
function moveBlockUp(element){
    var index=indexOfClickedBlock(element),
        bloks=story_cont.getElementsByClassName("block_story"),
        block=bloks[index];
        story_cont.insertBefore(bloks[index].cloneNode(true), bloks[index-1]);
        story_cont.removeChild(block);
        savePage();
}

//move block down
function moveBlockDown(element){
    var index=indexOfClickedBlock(element),
        bloks=story_cont.getElementsByClassName("block_story"),
        block=bloks[index];
        story_cont.insertBefore(bloks[index].cloneNode(true), bloks[index+2]);
        story_cont.removeChild(block);
        savePage();
}

//delete block
function deleteBlock(element){
    var index=indexOfClickedBlock(element);
        block=story_cont.getElementsByClassName("block_story")[index];
        story_cont.removeChild(block);
        savePage();
}
}