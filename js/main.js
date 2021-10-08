var lines = [];
var prefix = "portfolio@", suffix = ":-$";
var cmdLineNumber = 1;
var jsonPointer = ["edward"];
var command_list = ["cd", "ls", "exit", "open","help"];
var path = "edward";
var lineID = "cmd-input-"+cmdLineNumber;
var toggles=0;
var colors = [["nPurple","#bc13fe"],["nYellow","#ccff02"],["nOrange","#ff9933"],["nBlue","#04d9ff"]];
var openable = ["Challenger...","Robotics"], openableF=["challenger"], links = [];


//@put in seperate Files
function openWin(content, link){
    if(link==null){
        var filePath = "";

        var oPew = window.open("", "_blank", "toolbar=no,scrollbars=no,menubar = no; resizable=yes,location=no;top=500,left=500,width=400,height=400");
        oPew.document.write(content);

    }else{
        //console.log("Inside linker"); //@debug
        var oPew = window.open(link, "MsgWindow", "width=200,height=100");
        //console.log(link);
    }

}

function openChallenger(){
    var content = "<p> Please don't bully me for this. The tuition wasn't super duper expensive</p> <p>We aren't try-hards, Don't worry ;)</p>";
    openWin(content,null);
}

function openHelp(){
    var content = "<p>Available commands</p><p>open -> open [filename]</p><p>ls, list directory</p><p>cd (get in)-> cd [directory]; \"cd ..\" to get out of current dir</p> <p>exit -> exit</p>"
    openWin(content,null);
}

//@END


function toggle(s){
    //console.log("toggeled");
    if(s==0){ //@dumb too
        if(toggles == 1){
            toggles = 0;
        }else{
            toggles=1;
        }
    }

    if(toggles==1){
        
        for(var i=0; i<colors.length;i++){
            var cur = document.getElementsByClassName(colors[i][0]);

            for(var j=0; j<cur.length; j++){
                cur[j].style.color = "black";
                cur[j].style.backgroundColor = colors[i][1];
                cur[j].style.textDecoration = 'none';
            }
        }
        toggles=0;
    }else{
        for(var i=0; i<colors.length;i++){

            var cur = document.getElementsByClassName(colors[i][0]);

            for(var j=0; j<cur.length; j++){

                cur[j].style.textDecoration.color = colors[i][1];
                cur[j].style.color = colors[i][1];

                cur[j].style.backgroundColor = 'transparent';
                cur[j].style.textDecoration = 'underline';
                
        
            }
        }
            toggles=1;
    }
}

const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};


function sendCMD(event) {

  var key = event.which || event.keyCode;
  
  if(key == 13){
	let cmd = document.querySelector('#'+"cmd-input-"+cmdLineNumber).value;
	document.getElementById("cmd-input-"+cmdLineNumber).disabled = true; //disable orgin
    
    //console.log(cmd); //debug
    CMDParse(cmd);

	newLine(); 
  }
}

function CMDParse(cmd){
    var pcmd = cmd.split(" ");
    var cindex = command_list.indexOf(pcmd[0]);
    
    for(var i=0; i<pcmd.length; i++){
        if((pcmd[i] == "")||(pcmd[i]==" ")){
            pcmd.splice(i, 1);
        }
    }

    //console.log(pcmd);
    
    if(!(cindex==-1)){
    
        if(command_list[cindex] == "exit"){
            window.close('','_parent','');
        }

        var curDir = paths;
        for(var i=0; i<jsonPointer.length; i++){
            curDir = curDir[jsonPointer[i]];
        }
        


        //ls command, later maybe switch to function....
        if(command_list[cindex] == "ls"){
            if(pcmd.length>1){
                warning("warning S2","UND","Soo tired, either i'm still upgrading or u did smthing wrong");
                return;
            }


            if(curDir[0] == undefined){
                var Lcontent = Object.keys(curDir).join("/ ");
                Lcontent+="/";
                //console.log(Lcontent);
                Lcontent = Lcontent.split(" "); //Just Dumb, what else can i do? @dumb
                //console.log(Lcontent);
                

                var scolors = [];
                //console.log(pos); @debug
                for(var i=0; i<Lcontent.length;i++){
                    //OBPY FDOL var colors = [["cPurple","#bc13fe"],["cYellow","#ccff02"],["cOrange","#ff9933"],["cBlue","#04d9ff"]];
                    scolors.push(colors[3][0]);
                }

                //console.log(Lcontent);
                put_ColorCoded(Lcontent, scolors);
                return;

            }

            var Lcontent =[], scolors = [];

            for(var i=0; i<curDir.length; i++){
                Lcontent.push(curDir[i]);

                if(links.indexOf(curDir[i])!=-1){
                    scolors.push(colors[1][0]);
                }else if(openable.indexOf(curDir[i])!=-1){
                    scolors.push(colors[0][0]);
                }else{
                    scolors.push(colors[2][0]);
                }

            }
            //console.log(scolors); //@wat
            //console.log(Lcontent);
            put_ColorCoded(Lcontent, scolors);
            //gen colors codes;
            

            //console.log("fin");

        }

        //CD command move to function later

        if(command_list[cindex] == "cd"){
            if(pcmd.length>2){
                warning("warning S2", "UND", "Something went wrong...");
                return;
            }
            if(pcmd[1][0] == "/"){
                warning("warning S2", "UND", "Sry haven't implemented this yet. my b");
                return;
            }
            var pos = Object.keys(curDir);
            pos.push("..");
            var valid = pos.indexOf(pcmd[1]);

            if(!(valid==-1)){

                if(pcmd[1] == ".."){
                    if(jsonPointer.length==1){
                        warning("warning S1","AD", "Access Denie? Don't wry there was nothing there either way" );
                        return;
                    }
                    //console.log("/"+jsonPointer[jsonPointer.length-1]);

                    path = path.replace("/"+jsonPointer.pop(),"");

                    //console.log("PATH="+path);
                    //console.log(jsonPointer);
                    return;
                }else{
                    //console.log(valid);
                    path+="/"+pcmd[1];
                    jsonPointer.push(pcmd[1]);
                    return;
                }                    

            }else{
                warning("warning S1","UND","Error, File or Directory not found");
            }

            //console.log("fin cd");
        }

        //Open
        if(command_list[cindex] == "open"){
            if((pcmd.length > 2)){
                warning("warning S1","someidhere","Cannot open right now :( ");
                return;
            }
            if((pcmd.length==1)){
                warning("warning S1","someidhere","Cannot open nothing...");
                return;
            }

            //console.log("CUR="+openable[openable.indexOf(pcmd[1])-1]);
            
            switch (openable[openable.indexOf(pcmd[1])])
            {
            case "Challenger...":
                openChallenger();
                return;
            case "Robotics":
                openWin(null,"https://homesteadrobotics.com");
                return;
            default:
                warning("warning S1","CO","File either unopenable of typed uncorrectly");
                return;
            }
        }

        if(command_list[cindex] == "help"){
            openHelp();
        }

    }else{
        //console.log("cmd error");
        warning("warning S1","dunno wat id...","\'"+pcmd[0]+"\'is not recognized as an internal or external command, sry");
    }
    


}

function put_ColorCoded(dirs, colors){
    let con = document.createElement('p');
    var inside = "";
    //console.log(dirs);

    con.setAttribute("class", "Tput");
    for(var i=0;i<dirs.length; i++){
        //console.log(dirs[i]); // @tf is going on?
        inside+='<span class=\"'+colors[i]+'\">'+dirs[i]+'</span> ';
    }

    //console.log(con);
    con.innerHTML = inside;
    document.getElementById(lineID+"-div").appendChild(con);
    toggle(0);

}

function put(LClass, text){
    let line = document.createElement("p");
    line.innerHTML = text;
    line.setAttribute("class", LClass);

    document.getElementById(lineID+"-div").appendChild(line);
}

function warning(curclass, curid, text){
    let noTP = document.createElement("p");
    noTP.innerHTML = text;
    noTP.id = curid;
    noTP.setAttribute("class", curclass);

    document.getElementById(lineID+"-div").appendChild(noTP);
}

function newLine(){
	cmdLineNumber++;
	lineID = "cmd-input-"+cmdLineNumber;
	
	let lineDiv = document.createElement('div');
	lineDiv.id = lineID+"-div";
	
	var content = prefix+path+suffix;
	var label = '<label for=\"'+lineID+'\">'+content+'</label>';
	var input = '<input type="text" size = 50; id ='+ lineID+' onkeypress="sendCMD(event)" class="cmd-input"></input>';
	
	lineDiv.innerHTML = label+" "+input;
	
	document.getElementById("terminal-content").appendChild(lineDiv);
    document.getElementById(lineID).focus();
}

var paths = {
	"edward":{
		about:{
            whoami:["Just a bored teenager who needs a life and sm sleep."]
        },

        life:{
            schools:["Cherry Chase", "Challenger...", "Homestead High School"],
            honors:["2x Presidential Volunteer Award", "USACO Silver", "Top 10 CMU PicoCTF"],
            extra_curriculars: ["Robotics", "Programming Club", "SUNN Swimming Team<4y>", "Volunteering", "FS WaterPolo"]
        },

		experience: {
            programming_langs:["java", "c++", "c", "python", "javascript", "Web Dev langs"],
            frameworks_and_libraries:["flask", "django", "openCV", "pytorch", "numpy", "ReactJs/Angular", "threejs"],
            fav_tools:["VS Code","Blender", "Arch Linux",  "Eclipse", "Git", "Terminal"],
            technical_skills:["soldering", "wireing/crimping", "build circuits","gas welding"]
        },

        me : {
            hobbies:["Watch Anime?", "Programming", "Mess around with electronics", "Video games", "SLEEP"],
            likes:["simplicity", "non-java-like langauges", "Joy"]
        },

		contacts:["edwardlu.042@gmail.com", "Slez#8071 ? Discord"]
    }
}
