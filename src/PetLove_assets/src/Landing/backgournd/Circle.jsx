import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Circle extends React.Component {
  constructor(props) {
    super(props);

    this.colors = [
      "#74b9ff",
      "#e84393",
      "#6c5ce7",
      "#00b894",
      "#fdcb6e",
      "#006266",
      "#1B1464"
    ];

    this.renderProton = this.renderProton.bind(this);
  }

  componentWillUnmount() {
    try {
      RAFManager.remove(this.renderProton);
      this.proton.destroy();
    } catch (e) { }
  }

  onCanvasInited(canvas, width, height) {
    this.createProton(canvas, width, height);
    RAFManager.add(this.renderProton);
  }

  onResize(width, height) {
    this.crossZoneBehaviour.zone.width = width;
    this.crossZoneBehaviour.zone.height = height;
    this.proton.renderers[0].resize(width, height);
  }

  createProton(canvas, width, height) {
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(this.props.num || 20);
    emitter.damping = 0.008;

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(30, 60));
    emitter.addInitialize(
      new Proton.Velocity(
        new Proton.Span(0.5),
        new Proton.Span(0, 360),
        "polar"
      )
    );
    emitter.addInitialize(
      new Proton.Position(
        new Proton.RectZone(0, 0, canvas.width, canvas.height)
      )
    );

    const crossZoneBehaviour = new Proton.CrossZone(
      new Proton.RectZone(0, 0, canvas.width, canvas.height),
      "cross"
    );
    emitter.addBehaviour(crossZoneBehaviour);
    emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.35, 0.55)));
    emitter.addBehaviour(new Proton.Color(this.getColor()));
    emitter.addBehaviour(new Proton.RandomDrift(50, 50, 0.5));

    emitter.emit("once");
    this.proton.addEmitter(emitter);

    const renderer = new Proton.CanvasRenderer(canvas);
    this.proton.addRenderer(renderer);

    this.crossZoneBehaviour = crossZoneBehaviour;
  }

  getColor() {
    let c = this.colors;
    if (this.props.color) {
      if(Array.isArray(this.props.color)){
        c = this.props.color;
      }else{
        c = [this.props.color];
      }
    }

    return c;
  }

  renderProton() {
    this.proton && this.proton.update();
  }

  render() {
    return (
      <Canvas bg={this.props.bg}
        globalCompositeOperation="darken"
        onCanvasInited={this.onCanvasInited.bind(this)}
        onResize={this.onResize.bind(this)}
      />
    );
  }
}