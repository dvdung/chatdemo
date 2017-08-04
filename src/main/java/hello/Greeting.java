package hello;

public class Greeting {

    private String content;
    private  byte[][] bs;
    
    public Greeting() {
    }

    public Greeting(String content) {
        this.content = content;
    }
    public Greeting(byte[][]bs){
    	this.bs=bs;
    }
    
    
    
    public byte[][] getImage(){
    	return bs;
    }

    public String getContent() {
        return content;
    }

}
