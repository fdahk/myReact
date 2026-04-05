import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

/**
 * 面试讲解点：
 * 1. 事件总线的核心是发布订阅解耦，而不是消息可靠投递
 * 2. 简化版先解决本地进程内事件分发，不处理持久化和重试
 * 3. 追问点：异步派发、顺序性、异常隔离、死信、跨进程扩展
 */
final class SimpleEventBus {
    private final Map<Class<?>, List<Consumer<?>>> subscribers = new HashMap<>();

    synchronized <T> void subscribe(Class<T> eventType, Consumer<T> handler) {
        if (eventType == null || handler == null) {
            throw new IllegalArgumentException("eventType and handler must not be null");
        }
        subscribers.computeIfAbsent(eventType, ignored -> new ArrayList<>()).add(handler);
    }

    synchronized <T> void publish(T event) {
        if (event == null) {
            throw new IllegalArgumentException("event must not be null");
        }
        List<Consumer<?>> handlers = subscribers.get(event.getClass());
        if (handlers == null) {
            return;
        }

        List<Consumer<?>> snapshot = new ArrayList<>(handlers);
        for (Consumer<?> rawHandler : snapshot) {
            @SuppressWarnings("unchecked")
            Consumer<T> handler = (Consumer<T>) rawHandler;
            handler.accept(event);
        }
    }
}
