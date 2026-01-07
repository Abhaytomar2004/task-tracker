import { useEffect, useRef } from "react"

const COLORS = {
  pending: "#9CA3AF",
  in_progress: "#60A5FA",
  completed: "#22C55E",
  blocked: "#EF4444",
}

export default function GraphCanvas({ tasks }) {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
    canvas.width = 900
    canvas.height = 400
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!tasks || !tasks.length) return

    const pos = {}
    const gap = canvas.width / (tasks.length + 1)

    tasks.forEach((t, i) => {
      pos[t.id] = { x: gap * (i + 1), y: 200 }
    })

    // nodes
    tasks.forEach(t => {
      const p = pos[t.id]
      ctx.beginPath()
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = COLORS[t.status]
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.stroke()
      ctx.fillStyle = "#000"
      ctx.fillText(t.id, p.x - 4, p.y + 4)
    })
  }, [tasks])

  return <canvas ref={ref} className="border mt-6 bg-black" />
}
