/*
实现目标：
- 实现一个同时支持受控和非受控模式的 Select 组件。

核心思路：
- 如果外部传了 `value`，走受控模式。
- 否则使用内部 `innerValue`，走非受控模式。
- 所有选择变化统一通过 `onChange` 向外通知。
*/

import { useMemo, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function SelectControlledUncontrolled({
  options,
  value,
  defaultValue = '',
  onChange,
}: SelectProps) {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : innerValue;

  const currentLabel = useMemo(() => {
    return options.find((item) => item.value === currentValue)?.label ?? 'Please Select';
  }, [options, currentValue]);

  function handleSelect(nextValue: string) {
    if (!isControlled) {
      setInnerValue(nextValue);
    }
    onChange?.(nextValue);
  }

  return (
    <div>
      <p>Current: {currentLabel}</p>
      {options.map((option) => (
        <button key={option.value} onClick={() => handleSelect(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
