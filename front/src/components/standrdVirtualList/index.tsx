import { VirtualList } from "./virtualList";

const data = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function Demo() {
  return (
    <VirtualList
      data={data}
      height={400}
      itemHeight={40}
      renderItem={(item, idx) => (
        <div
          key={idx}
          style={{
            height: 40,
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          {item}
        </div>
      )}
    />
  );
}