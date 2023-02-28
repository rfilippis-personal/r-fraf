import React from "react";
import Container from "rsuite/Container";
import Message from "rsuite/Message";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Message showIcon type="error" header="Something went wrong">
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary style={{ color: "#B94339", cursor: "pointer" }}>
              <b>Details</b>
            </summary>
            <Container style={{ margin: "20px 0", color: "#B94339" }}>
              {this.state.error && this.state.error.toString()}
            </Container>
            <hr />
            <Container>{this.state.errorInfo.componentStack}</Container>
          </details>
        </Message>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
