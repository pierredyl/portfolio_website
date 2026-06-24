import { useEffect, useRef } from 'react'

export default function ParticleImage({ src, size = 320, className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const dpr = window.devicePixelRatio || 1

    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    let particles = []
    let animationId

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      const off = document.createElement('canvas')
      off.width = size
      off.height = size
      const offCtx = off.getContext('2d', { willReadFrequently: true })
      const imageScale = 1.5

      const scale = Math.max(size / img.width, size / img.height) * imageScale
      const w = img.width * scale
      const h = img.height * scale
      const dx = (size - w) / 2
      const dy = (size - h) / 2

      offCtx.save()
      offCtx.beginPath()
      offCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      offCtx.clip()
      offCtx.drawImage(img, dx, dy, w, h)
      offCtx.restore()

      const imageData = offCtx.getImageData(0, 0, size, size).data

      const gap = 9
      particles = []

      const accent = { r: 245, g: 240, b: 225 }

      // Drawing each pixel
      for (let y = 0; y < size; y += gap) {
        for (let x = 0; x < size; x += gap) {
          const i = (y * size + x) * 4
          const alpha = imageData[i + 3]

          if (alpha > 20) {
            const r = imageData[i]
            const g = imageData[i + 1]
            const b = imageData[i + 2]

            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            const t = lum / 255

            // 16-step quantized shading band (controlled density)
            const levels = 16
            const q = Math.floor(t * levels) / levels

            const brightness = 0.35 + q * 0.5 * 3

            particles.push({
              baseX: x,
              baseY: y,
              x,
              y,
              vx: 0,
              vy: 0,
              color: `rgb(
                ${Math.round(accent.r * brightness)},
                ${Math.round(accent.g * brightness)},
                ${Math.round(accent.b * brightness)}
              )`,
            })
          }
        }
      }

      requestAnimationFrame(draw)
    }

    function draw() {
      ctx.clearRect(0, 0, size, size)

      const mouse = mouseRef.current
      const radius = 20
      const force = 10

    ctx.fillStyle = '#f5f0e1'

    // Move particles around mouse cursor
      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius) {
          const angle = Math.atan2(dy, dx)
          const push = (radius - dist) / radius

          p.vx += Math.cos(angle) * push * force
          p.vy += Math.sin(angle) * push * force
        }

        p.vx += (p.baseX - p.x) * 0.06
        p.vy += (p.baseY - p.y) * 0.06

        p.vx *= 0.82
        p.vy *= 0.82

        p.x += p.vx
        p.y += p.vy
        
        // Object drawn these are the triangles
        const angle = Math.atan2(p.vy, p.vx)

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(angle)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.moveTo(0, -2)
        ctx.lineTo(2, 2)
        ctx.lineTo(-2, 2)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('mouseleave', handleLeave)
    }
  }, [src, size])

  return (
    <canvas
      ref={canvasRef}
      className={`flex-shrink-0 ${className}`}
    />
  )
}