package hello;

public class ChatMessage {

    private String name;
    private String message;
    
    public ChatMessage() {
    }

    public ChatMessage(String name,String message) {
        this.name = name;
        this.message=message;
    }

   

	public String getName() {
        return name;
    }

    public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setName(String name) {
        this.name = name;
    }
}
