import { LOGO_PATH, LOGO_VIEWBOX } from './logoPath'

// The martini + coffee mark. Fills with currentColor so it follows the theme;
// size it with a height class and the width falls out of the viewBox.
export default function Logo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  )
}
