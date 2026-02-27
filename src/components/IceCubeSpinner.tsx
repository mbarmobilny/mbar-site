export function IceCubeSpinner() {
  return (
    <div className="ice-cube-spinner" role="status" aria-label="Loading">
      <div className="ice-cube-spinner__cube">
        <div className="ice-cube-spinner__face ice-cube-spinner__face--front" />
        <div className="ice-cube-spinner__face ice-cube-spinner__face--back" />
        <div className="ice-cube-spinner__face ice-cube-spinner__face--right" />
        <div className="ice-cube-spinner__face ice-cube-spinner__face--left" />
        <div className="ice-cube-spinner__face ice-cube-spinner__face--top" />
        <div className="ice-cube-spinner__face ice-cube-spinner__face--bottom" />
      </div>
    </div>
  );
}
