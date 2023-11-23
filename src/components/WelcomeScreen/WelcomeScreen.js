import "./WelcomeScreen.css";

const WelcomeScreen = (props) => {
    return (
        <div className="welcome-screen">
            <h1>Hi there!</h1>
            <p>This is an app for listening to the best music of flowers - hits of 60-70s</p>
            <h2>Let's get started?</h2>
            <button onClick={props.handleLogin}>Login with Spotify</button>
        </div>
    )
}

export default WelcomeScreen;