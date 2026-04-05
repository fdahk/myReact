import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 面试讲解点：
 * 1. 回调签名的核心是可重复构造原文 + 使用共享密钥摘要
 * 2. 简化版只演示签名校验，不处理时间窗口、防重放和密钥轮换
 * 3. 追问点：HMAC、nonce 去重、timestamp 窗口、secret rotation
 */
final class WebhookSignatureVerifier {
    private final String secret;

    WebhookSignatureVerifier(String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("secret must not be blank");
        }
        this.secret = secret;
    }

    boolean verify(String timestamp, String body, String providedSignature) {
        if (timestamp == null || body == null || providedSignature == null) {
            throw new IllegalArgumentException("timestamp, body and providedSignature must not be null");
        }
        String raw = timestamp + "\n" + body + "\n" + secret;
        String expected = sha256(raw);
        return constantTimeEquals(expected, providedSignature);
    }

    private String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder builder = new StringBuilder(bytes.length * 2);
            for (byte b : bytes) {
                builder.append(String.format("%02x", b));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    private boolean constantTimeEquals(String left, String right) {
        if (left.length() != right.length()) {
            return false;
        }
        int diff = 0;
        for (int i = 0; i < left.length(); i++) {
            diff |= left.charAt(i) ^ right.charAt(i);
        }
        return diff == 0;
    }
}
