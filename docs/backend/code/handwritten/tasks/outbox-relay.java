import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 面试讲解点：
 * 1. Outbox relay 的核心是把本地事务里的事件稳定搬运到下游
 * 2. 简化版用内存列表模拟 outbox 表，生产版通常会有状态字段、重试次数和批量拉取
 * 3. 追问点：幂等投递、批量处理、失败重试、并发抢占、死信队列
 */
final class OutboxRelay {
    private final List<OutboxEvent> outbox = new ArrayList<>();

    synchronized void appendEvent(String eventId, String payload) {
        if (eventId == null || eventId.isBlank() || payload == null) {
            throw new IllegalArgumentException("eventId and payload must be valid");
        }
        outbox.add(new OutboxEvent(eventId, payload));
    }

    synchronized void flush(EventPublisher publisher) {
        Iterator<OutboxEvent> iterator = outbox.iterator();
        while (iterator.hasNext()) {
            OutboxEvent event = iterator.next();
            try {
                publisher.publish(event.eventId, event.payload);
                iterator.remove();
            } catch (RuntimeException ignored) {
                // 简化版：生产版要记录失败次数、下次重试时间和告警信息。
            }
        }
    }

    interface EventPublisher {
        void publish(String eventId, String payload);
    }

    private static final class OutboxEvent {
        private final String eventId;
        private final String payload;

        private OutboxEvent(String eventId, String payload) {
            this.eventId = eventId;
            this.payload = payload;
        }
    }
}
