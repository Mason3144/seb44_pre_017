package synergy_overflow.auth.utils;

public enum TokenType {
    AUTHORIZATION("Authorization"),
    REFRESH("Refresh"),
    BEARER("Bearer ");

    private final String type;

    private TokenType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
