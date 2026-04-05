final class SnowflakeIdGenerator {
    private static final long EPOCH_MILLIS = 1704067200000L; // 2024-01-01 00:00:00 UTC
    private static final long WORKER_ID_BITS = 10L;
    private static final long SEQUENCE_BITS = 12L;
    private static final long MAX_WORKER_ID = ~(-1L << WORKER_ID_BITS);
    private static final long SEQUENCE_MASK = ~(-1L << SEQUENCE_BITS);
    private static final long WORKER_ID_SHIFT = SEQUENCE_BITS;
    private static final long TIMESTAMP_SHIFT = WORKER_ID_BITS + SEQUENCE_BITS;

    private final long workerId;
    private long lastTimestamp = -1L;
    private long sequence = 0L;

    SnowflakeIdGenerator(long workerId) {
        if (workerId < 0 || workerId > MAX_WORKER_ID) {
            throw new IllegalArgumentException("workerId out of range");
        }
        this.workerId = workerId;
    }

    synchronized long nextId() {
        long currentTimestamp = currentTimeMillis();
        if (currentTimestamp < lastTimestamp) {
            throw new IllegalStateException("clock moved backwards");
        }

        if (currentTimestamp == lastTimestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            if (sequence == 0) {
                currentTimestamp = waitUntilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = currentTimestamp;
        return ((currentTimestamp - EPOCH_MILLIS) << TIMESTAMP_SHIFT)
                | (workerId << WORKER_ID_SHIFT)
                | sequence;
    }

    private long waitUntilNextMillis(long timestamp) {
        long currentTimestamp = currentTimeMillis();
        while (currentTimestamp <= timestamp) {
            currentTimestamp = currentTimeMillis();
        }
        return currentTimestamp;
    }

    long currentTimeMillis() {
        return System.currentTimeMillis();
    }
}
