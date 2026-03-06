import { useState } from 'react'

interface SimpleImageLightboxProps {
  src: string
  alt: string
  className?: string
}

export default function SimpleImageLightbox({ src, alt, className = '' }: SimpleImageLightboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in hover:opacity-90 transition-opacity ${className}`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} />
        </div>
      )}
    </>
  )
}
