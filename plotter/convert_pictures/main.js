$('document').ready(function(){
    $("#btn").click(function(){
        var file = $('#srcs')[0].files[0];   
        let image1 = new Image();
        image1.src = file.name;
        DrawImg(image1);
    });
    function DrawImg(img){
        var width = +$("#width").val();
        var height = +$("#height").val();
        
        let canvas = $("#myCanvas").get(0);
        let context = canvas.getContext("2d");
        //настройка ширины и высоты канваса 
        canvas.width = width;
        canvas.height = height;
        
        //отрисовка изображения 
        $(img).on("load", function(){
            context.drawImage(img,0,0);
            $("body").append("<div id='divs'></div>");
            $("#divs").css("width",width)
            $("#divs").css("height",height)
            
            for(var y=0;y<height;y++){
                for(var x = 0;x<width;x++){
                    var pixelData = context.getImageData(x,y,1.0,1.0);
                    var data = pixelData.data;
                    if(data[0]==255 && data[1]==255 && data[2]==255)
                                        {
                                            Images("0");
                                        }
                                    else if (data[0]==0 && data[1]==0 && data[2]==0)
                                             {
                                                Images("1");
                                             }
                                    else{
                                            Images("0");
                                        }
                };
                if(y!=height-1)
                    Images('/\n');
            };
        });  
    };
    var txt;
    var Images = function(newTxt){
        txt = $("#divs").text();
        txt = txt + newTxt;
        $("#divs").text(txt);
    };
     /*сами значения 
      data[0] - red;
      data[1] - green;
      data[2] - blue ;
        255;255;255-white;
         0;0;0; - black;
     */
});