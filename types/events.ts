import { Selection, BaseType, select } from "d3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enableSVGEvents(svg: Selection<BaseType, unknown, HTMLElement, any>, mindX: number, mindY: number) {
  const maxScale = 1.2
  const minScale = 0.4
  const viewBox = svg.attr("viewBox").split(" ").map((value) => +value)
  let scale = 1, x = viewBox[0], y = viewBox[1], width = viewBox[2], height = viewBox[3], dragging = false, prevX = x, prevY = y

  function setViewBox() {
    svg.attr("viewBox", `${x} ${y} ${width} ${height}`)
  }

  function point(event: MouseEvent) {
    const clientPoint = new DOMPointReadOnly(event.clientX, event.clientY)
    return clientPoint.matrixTransform((svg.node() as SVGSVGElement).getScreenCTM()!.inverse())
  }

  svg.on("wheel", function (event: WheelEvent) {
    event.preventDefault();
    const p = point(event);
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
    if (scale * zoomFactor <= maxScale && scale * zoomFactor >= minScale) {
      scale *= zoomFactor;
      width = viewBox[2] * scale;
      height = viewBox[3] * scale;

      x += (p.x - x) * (1 - zoomFactor);
      y += (p.y - y) * (1 - zoomFactor);

      setViewBox();
    }
  });


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

    x = Math.max(mindX - width, Math.min(x, mindX));
    y = Math.max(mindY - height, Math.min(y, mindY));

    debug.selectAll("span").remove()
    debug.append("span")
      .text(`${x.toFixed(1)} ${y.toFixed(1)}`)

    setViewBox()
    prevX = point(event).x
    prevY = point(event).y
  })
}

