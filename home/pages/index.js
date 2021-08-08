import React from "react";

//custom Hook
function usePrevious(data) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}

function Home() {
  const [count, setCount] = React.useState(0);

  const _increaseCount = () => {
    setCount(count + 1);
  };

  const prevCount = usePrevious(count);

  return (
    <div>
      <div>Previous Count Value: {prevCount}</div>
      <div>Current Count Value: {count}</div>
      <button onClick={_increaseCount}>Increase Count</button>
    </div>
  );
}

export default Home;
