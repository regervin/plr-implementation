function Welcome({ name }) {
  return (
    <div className="welcome">
      <h2>Welcome{name ? ', ' + name : ''}!</h2>
      <p>This is a simple React application.</p>
    </div>
  )
}

export default Welcome
