import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/**
 * 面试讲解点：
 * 1. 审批流本质上先是状态机，再是节点和参与人问题
 * 2. 简化版只演示状态流转校验，不处理会签和转交
 * 3. 追问点：会签/或签、撤回窗口、节点回退、流程版本
 */
final class ApprovalStateMachine {
    enum State {
        DRAFT,
        SUBMITTED,
        APPROVING,
        APPROVED,
        REJECTED,
        CANCELLED
    }

    private static final Map<State, Set<State>> ALLOWED_TRANSITIONS = new EnumMap<>(State.class);

    static {
        ALLOWED_TRANSITIONS.put(State.DRAFT, EnumSet.of(State.SUBMITTED, State.CANCELLED));
        ALLOWED_TRANSITIONS.put(State.SUBMITTED, EnumSet.of(State.APPROVING, State.CANCELLED));
        ALLOWED_TRANSITIONS.put(State.APPROVING, EnumSet.of(State.APPROVED, State.REJECTED, State.CANCELLED));
        ALLOWED_TRANSITIONS.put(State.APPROVED, EnumSet.noneOf(State.class));
        ALLOWED_TRANSITIONS.put(State.REJECTED, EnumSet.noneOf(State.class));
        ALLOWED_TRANSITIONS.put(State.CANCELLED, EnumSet.noneOf(State.class));
    }

    private State currentState = State.DRAFT;

    State currentState() {
        return currentState;
    }

    void transitTo(State nextState) {
        if (nextState == null) {
            throw new IllegalArgumentException("nextState must not be null");
        }
        Set<State> allowed = ALLOWED_TRANSITIONS.get(currentState);
        if (!allowed.contains(nextState)) {
            throw new IllegalStateException("illegal transition: " + currentState + " -> " + nextState);
        }
        currentState = nextState;
    }
}
