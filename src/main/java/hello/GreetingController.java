package hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(ChatMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting(message.getName()+" say: " + message.getMessage() + " !" );
    }
    
    @MessageMapping("/img")
    @SendTo("/topic/greetingsImg" )
    public Greeting greetingImg(ChatImg img) throws Exception {
    	Thread.sleep(1000); // simulated delay
    	
        return new Greeting(img.getData());
    }
    
}
