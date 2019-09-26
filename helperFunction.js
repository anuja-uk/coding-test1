var heplerController= ( function(){

    var data = [{
        state: 'processing'
    },{
        state: 'success'
    },{
        state: 'error',
        errorCode: ['NO_STOCK','INCORRECT_DETAILS','null','undefined']
    }];

    var selectedState,errorCode;

    function getProcessingPage(data){	

        // data.length = 1 means processing state is not checked
        if(data.length == 1){
            // check which state is selected and call respective function 
            if(data[0].state == 'success'){
                success();
            } else if(data[0].state == 'error'){		
                error(data[0]);
            }
        } else {
            processing(data);
        }	
    };

    function processing(data){
        console.log("processing... Please wait for 2 seconds! ");
        // function delay of 2 seconds, then execute nect state
        setTimeout(() =>{
            data.forEach((element,index) => {
                // check which state is selected with processing and call respective function 
                if(element.state == "success"){
                    success();
                } else if(element.state == "error"){
                    
                    error(data[index]);
                }
            });}, 2000);
    }

    function success(){

        var successObj = {
            title: 'Order complete', 
            message: null
        };
        console.log(successObj);
    }
    
    function error(data){
    
        var errorMessage;
        data.errorCode.forEach((element,index) => {				
                    if(element == errorCode){
                        errorMessage = checkErrorCode(data.errorCode[index])
                    } else if(!errorCode){
                        errorMessage = checkErrorCode();
                    }
            });		
            console.log(errorMessage);	
    
    }

    function checkErrorCode(code){
        var no_Stock_Obj,incorrect_Details_obj,default_Obj;
        no_Stock_Obj = { title: 'Error page', message: 'No stock has been found' };
        incorrect_Details_obj = { title: 'Error page', message: 'Incorrect details have been entered' };
        default_Obj = { title: 'Error page', message: null };
    
        switch(code){
            case 'NO_STOCK':
                    return no_Stock_Obj;
                break;
            case 'INCORRECT_DETAILS':
                    return incorrect_Details_obj ;
                break;
            case 'null':
                    return default_Obj;
                break;
            case 'undefined':
                    return default_Obj;
                break;
            default:
                    return default_Obj;
        }
    
    };     

    return {
        init: function(){
           
            var selectedData = [],isProcessing;
            
            //is processing state selected
            isProcessing =  document.getElementById('processing').checked;
            
            //Check state is selected or not
            if(selectedState){
                //create new array with selected states 
                data.forEach((element,index) => {
                    if(isProcessing && element.state == "processing"){
                        selectedData.push(data[index]);
                    } else if(element.state == selectedState){
                        selectedData.push(data[index]);
                    }
                });	
                // call function for output
                getProcessingPage(selectedData);
            } else 
                console.log("Please select other state along with processing state!");
        },

         stateSelection: function(){
            state = document.getElementsByName('successOrerror');
            // get seleced state 
            for(i = 0; i < state.length; i++) { 
                if(state[i].checked) {			
                    selectedState = state[i].value;			
                } 
            } 
            // check whether selected state is error
             selectedState == "error" ? showErrorCode.style.display = "block" : showErrorCode.style.display = "none"; 
        },

         errorCodeSelection: function(){
            errorCodes= document.getElementsByName("errorCode");
            // get seleced state 
            for(i = 0; i < errorCodes.length; i++) { 
                if(errorCodes[i].checked) {			
                    errorCode = errorCodes[i].value;			
                } 
            } 
            
        }
    }
})();

