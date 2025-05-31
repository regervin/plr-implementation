import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter-card">
      <h2>Counter Component</h2>
      <p>Count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(count - 1)}>Decrease</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>Increase</button>
      </div>
    </div>
  )
}

export default Counter
