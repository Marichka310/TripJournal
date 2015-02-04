/**
 * Module for sending ajax POST request with block contents from edit page. 
 */

// for browser that don't support endsWith method for strings
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

function storyIdFromUrl() {
    var currUrl = document.URL.split(['/']);
    return currUrl[currUrl.length - 1];
}


function storyBlocksJson(){
    var blocks=[]
    var Blocks=document.getElementsByClassName("block_story");
        for(var i=0;i<Blocks.length;i++){          
        var block={
                "type":Blocks[i].getAttribute("block_type"),
                "marker":null
            };
            if (block.type === 'text') {
                block.content = Blocks[i].childNodes[0].nodeValue;
            }
            if (block.type === 'artifact') {
                block.content = Blocks[i].childNodes[0].nodeValue;
            }
            if (block.type === 'img') {
                block.id = parseInt(Blocks[i].getElementsByClassName("image_story")[0].getAttribute("data-dbid"));
            }
        blocks.push(block)    
        }
       return {
        'title': "Some Story",
        'blocks': blocks
    }; 
}

//returns the last picture to add to the id attribute from database
function lastPicture(){
    var pictures=document.getElementsByClassName("image_story");
    var lastPic=pictures[pictures.length-1];
        return lastPic;
}

function postImages(storyId){
    var i, formData, xhr, img, pic;
        pic=lastPicture(); 
    /**
     * Sets hidden element with
     * picture id from database when picture is saved.
     */
    function addImageIdFromDB(){
        if (xhr.readyState === 4 && xhr.status === 200) {           
            picIdInDB = parseInt(xhr.responseText);                        
            pic.setAttribute("data-dbid", picIdInDB);
            postData(true);
        } 
    }
    console.log(Images)
    for (i=0; i < Images.length; ++i){
        formData = new FormData();
        img = Images.shift();
        formData.append('file', img);
        xhr = new XMLHttpRequest();       
        xhr.onreadystatechange = function() {
            addImageIdFromDB();
        };
        xhr.open('POST', '/upload/' + storyIdFromUrl());
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
        xhr.send(formData);
    }
}


function postData(async){
    var xhr = new XMLHttpRequest(),
    requestBody = JSON.stringify(storyBlocksJson());
    /**
     * Appends story id to page url and urls form publsih panel
     * and makes publish panel visble
     * if request was sent from /edit/ page.
     */
    function addStoryIdToUrls(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            var newId = xhr.responseText;
            if (!document.URL.endsWith(newId)) {
                window.history.pushState(
                        'new_id', 'Title', '/editRef/' + newId
                        );
            }
        }
    }
    xhr.onreadystatechange = addStoryIdToUrls;
    xhr.open('POST', '/save/' + storyIdFromUrl(), async);
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(requestBody);
}


function savePage() {
    if (storyIdFromUrl().length === 0) postData(false);
    if (Images.length > 0) {
        postImages();
    } else {
        postData(true);
    }
}

function jsonTagStory(tag_name) {
    var block = {};
    block.story_id = storyIdFromUrl();
    block.tag_name = tag_name;
    return block;
}

function putTag(tag_name) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/put_tag/', true);
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            tag_input.value = '';
            getStoryTags();
        }
    }
    savePage();
    request_body = JSON.stringify(jsonTagStory(tag_name));
    xhr.send(request_body);
}

function getStoryTags() {
    story_id = storyIdFromUrl();
    if(story_id) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var str = xhr.responseText;
            var tags_arr = str.split(',');
            tags_view(tags_arr);
        }
    }
    params = 'Story_id=' + story_id;
    xhr.open('GET', '/get_story_tags/?'+params, true);
    xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
    xhr.send();
    }
}

function deleteStoryTags(i) {
    var xhr = new XMLHttpRequest();
    story_id = storyIdFromUrl();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            getStoryTags();
        }
    }
    params = 'Story_id=' + encodeURIComponent(story_id) + '&Tag_position=' + i;
    xhr.open('GET', '/delete_story_tag/?'+params, true);
    xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
    xhr.send();
}

function getId() {
    var xhr = new XMLHttpRequest();
    
         xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            getStoryTags();
        }
    }
    params = 'Story_id=' + encodeURIComponent(story_id) + '&Tag_position=' + i;
    xhr.open('GET', '/delete_story_tag/?'+params, true);
    xhr.setRequestHeader('X_REQUESTED_WITH', 'XMLHttpRequest');
    xhr.send();
}

