import { Selection, BaseType, select } from "d3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enableSVGEvents(svg: Selection<BaseType, unknown, HTMLElement, any>) {
  const maxScale = 1.4
  const minScale = 0.8
  const viewBox = svg.attr("viewBox").split(" ").map((value) => +value)
  let scale = 1, x = 0, y = 0, width = viewBox[2], height = viewBox[3], dragging = false, prevX = 0, prevY = 0

  function setViewBox() {
    svg.attr("viewBox", `${x} ${y} ${width} ${height}`)
  }

  function point(event: MouseEvent) {
    const clientPoint = new DOMPointReadOnly(event.clientX, event.clientY)
    return clientPoint.matrixTransform((svg.node() as SVGSVGElement).getScreenCTM()!.inverse())
  }

  svg.on("wheel", function (event: WheelEvent) {
    event.preventDefault()

    if (event.deltaY > 0) {
      scale = Math.min(scale + 0.1, maxScale);
    } else {
      scale = Math.max(scale - 0.1, minScale);
    }
    width = viewBox[2] * scale
    height = viewBox[3] * scale
    setViewBox()
  })

  svg.on("mousedown", function (event: MouseEvent) {
    dragging = true
    prevX = point(event).x
    prevY = point(event).y
  })

  select("html").on("mouseup", function () {
    dragging = false
  })

  const debug = select("#debug")
  select("html").on("mousemove", function (event: MouseEvent) {
    event.preventDefault()
    if (!dragging) return

    const deltaX = point(event).x - prevX
    const deltaY = point(event).y - prevY

    x -= deltaX;
    y -= deltaY;

    x = Math.max(-viewBox[2] / 2, Math.min(x, viewBox[2] / 2));
    y = Math.max(-viewBox[3] / 2, Math.min(y, viewBox[3] / 2));

    debug.selectAll("span").remove()
    debug.append("span")
      .text(`${x.toFixed(1)} ${y.toFixed(1)}`)

    setViewBox()
    prevX = point(event).x
    prevY = point(event).y
  })
}

