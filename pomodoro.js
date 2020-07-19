const timer = (string_input,mode) => {
    if(mode == 0){
        var lastChar = string_input[string_input.length - 1];
        var firstChar = string_input.substring(0,string_input.length - 1);
        var seconds_input = parseInt(firstChar);
        let display_seconds = 0;
        let elapsed_seconds = 0;
        let overall_display_seconds = 0;
        let total_seconds = 0;
        let seconds = 0;
        let minutes = Math.floor(seconds_input/60);
        let whole_minutes = seconds_input/60;
        let decimal = whole_minutes - minutes;

        if(lastChar == 's'){
            display_seconds = Math.ceil(decimal * 60);
            elapsed_minutes = Math.floor(seconds_input/60);
            overall_display_seconds = Math.ceil(decimal * 60);
            elapsed_seconds = 0;
            total_seconds = seconds_input;
        }
        else if(lastChar == 'm'){
            display_seconds = 0;
            elapsed_minutes = seconds_input;
            elapsed_seconds = 0;
        }
        let isStopped = false;
        let isRunning = false;

        if(lastChar == 's'){
            function start(){
            if(isRunning)  return;
                    isRunning = true;
                    counter = setInterval(() => {
                        if(display_seconds == 0){
                            seconds = 60;
                        }
                        if(display_seconds == 0){
                            display_seconds = 60;
                        }
                        elapsed_seconds++;
                        display_seconds--;
                        seconds--;

                        if(seconds > 0){ 
                            if(display_seconds <= overall_display_seconds){
                                elapsed_minutes = Math.ceil(minutes - (elapsed_seconds/60));
                            }
                            else{
                                elapsed_minutes = Math.floor(minutes - (elapsed_seconds/60));
                            }
                        }
                        else{
                            elapsed_minutes = Math.ceil(minutes - (elapsed_seconds/60));
                        }
                        if(elapsed_seconds === total_seconds){
                            reset();
                        }
                        if(display_seconds < 10){
                            display_seconds = "0"+display_seconds;
                        }     
                }, 1000);
            }

            function stop(){
                clearInterval(counter);
                isRunning = false;
            }

            function reset(){
                clearInterval(counter);
                isRunning = false;
                isStopped = true;
                elapsed_seconds = 0;
                elapsed_minutes = Math.floor(seconds_input/60);
                seconds = 0;  
                minutes = Math.floor(seconds_input/60);
                whole_minutes = seconds_input/60;
                decimal = whole_minutes - minutes;
                display_seconds = Math.ceil(decimal * 60);
            }


            return{
                start:start,
                stop:stop,
                reset:reset,
                peek :() => `${elapsed_minutes}:${display_seconds}`,
            }
        
        }

        else if(lastChar == 'm'){
            function start(){
                if(isRunning)  return;
                        isRunning = true;
                        counter = setInterval(() => {
                            elapsed_seconds++;
                            elapsed_minutes = seconds_input - Math.ceil(elapsed_seconds/60);
                            
                            if(display_seconds == 0){
                                display_seconds = 60;
                            }
                            display_seconds--;
                            if((elapsed_minutes == 0) && (display_seconds == 0)){
                                reset();
                            }
                            
                            if(display_seconds < 10){
                                display_seconds = "0"+display_seconds;
                            }

                    }, 1000);
                }
        
                function stop(){
                    clearInterval(counter);
                    isRunning = false;
                }
        
                function reset(){
                    clearInterval(counter);
                    isRunning = false;
                    isStopped = true;
                    elapsed_minutes = seconds_input;
                    elapsed_seconds = 0;
                    display_seconds = 0;   
                    if(display_seconds < 10){
                        display_seconds = "0"+display_seconds;
                    } 
                }
        
        
                return{
                    start:start,
                    stop:stop,
                    reset:reset,
                    peek :() => `${elapsed_minutes}:${display_seconds}`,
                };
        }
    }
    else if(mode == 1){
            let minutes = 0;
            let seconds = 0;
            let total_seconds = 0;
            let stop_after = 0;
            let isStopped = false;
            let isRunning = false;
            var lastChar = string_input[string_input.length - 1];
            var firstChar = string_input.substring(0,string_input.length - 1);
            var seconds_input = parseInt(firstChar);

            if(lastChar == 's'){
                stop_after = seconds_input * 1000;
            }
            else if (lastChar == 'm'){
                stop_after = seconds_input * 60 * 1000;
            }
            if(seconds < 10){
                seconds = "0"+seconds;
            } 
            

            function start(){  
                if(isRunning)  return;
                isRunning = true;

                counter = setInterval(() => {
                    seconds++;
                    total_seconds++;
                    minutes = Math.floor(total_seconds / 60);
                    if(seconds == 60){
                        seconds = 0;
                    }

                    if(total_seconds * 1000 == stop_after){
                        reset();
                    } 
                    if(seconds < 10){
                        seconds = "0"+seconds;
                    } 
                }, 1000);
                
            }

            function stop(){
                clearInterval(counter);
                isStopped = true;
                isRunning = false;
            }

            function reset(){
                stop();
                seconds = 0;
                minutes = 0;
                total_seconds = 0;
                isRunning = false;
                
            }

            return{
                start: start, 
                stop:stop,   
                reset:reset, 
                peek : () => `${minutes}:${seconds}`,
            };   
        }
};

window.onload = () =>{
    document.getElementById("main_timer").innerHTML = sample.peek();
}
const sample = timer("10s",1);
function startTimer(){
    sample.start();
    const stopwatch = setInterval(() => {
        document.getElementById("main_timer").innerHTML = sample.peek();
    }, 1000);
   
}

function stopFunc(){
    sample.stop();
}

function resetFunc(){
    sample.reset();
}


