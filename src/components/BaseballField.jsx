const fieldGeometry = {
  homePlate: { x: 350, y: 520 },
  firstBase: { x: 486, y: 384 },
  secondBase: { x: 350, y: 248 },
  thirdBase: { x: 214, y: 384 },
  mound: { x: 350, y: 384, r: 38 },
  foulLineExtension: 200,
  outfieldArcRadiusScale: 0.8,
  title: { x: 350, y: 20, subtitleOffsetY: 30 },
}

function extendPastBase(fromPoint, throughPoint, extension) {
  const dx = throughPoint.x - fromPoint.x
  const dy = throughPoint.y - fromPoint.y
  const length = Math.hypot(dx, dy)

  return {
    x: throughPoint.x + (dx / length) * extension,
    y: throughPoint.y + (dy / length) * extension,
  }
}

const leftFieldLineEnd = extendPastBase(
  fieldGeometry.homePlate,
  fieldGeometry.thirdBase,
  fieldGeometry.foulLineExtension,
)

const rightFieldLineEnd = extendPastBase(
  fieldGeometry.homePlate,
  fieldGeometry.firstBase,
  fieldGeometry.foulLineExtension,
)

const outfieldArcBaseRadius = Math.hypot(
  leftFieldLineEnd.x - fieldGeometry.homePlate.x,
  leftFieldLineEnd.y - fieldGeometry.homePlate.y,
)

const outfieldChordLength = Math.hypot(
  rightFieldLineEnd.x - leftFieldLineEnd.x,
  rightFieldLineEnd.y - leftFieldLineEnd.y,
)

const minimumOutfieldArcRadius = outfieldChordLength / 2 + 1

const outfieldArcRadius = Math.max(
  minimumOutfieldArcRadius,
  outfieldArcBaseRadius * fieldGeometry.outfieldArcRadiusScale,
)

const fieldOutlinePath = [
  `M ${fieldGeometry.homePlate.x} ${fieldGeometry.homePlate.y}`,
  `L ${leftFieldLineEnd.x} ${leftFieldLineEnd.y}`,
  `M ${leftFieldLineEnd.x} ${leftFieldLineEnd.y}`,
  `A ${outfieldArcRadius} ${outfieldArcRadius} 0 0 1 ${rightFieldLineEnd.x} ${rightFieldLineEnd.y}`,
  `M ${rightFieldLineEnd.x} ${rightFieldLineEnd.y}`,
  `L ${fieldGeometry.homePlate.x} ${fieldGeometry.homePlate.y}`,
].join(' ')

const baseLinks = [
  {
    id: 'about',
    label: 'About',
    x: fieldGeometry.firstBase.x,
    y: fieldGeometry.firstBase.y,
    floatDelay: '0s',
    labelOffsetX: 10,
    labelOffsetY: 50,
    textAnchor: 'start',
  },
  {
    id: 'projects',
    label: 'Projects',
    x: fieldGeometry.secondBase.x,
    y: fieldGeometry.secondBase.y,
    floatDelay: '0.55s',
    labelOffsetX: 0,
    labelOffsetY: -46,
    textAnchor: 'middle',
  },
  {
    id: 'education',
    label: 'Education',
    x: fieldGeometry.thirdBase.x,
    y: fieldGeometry.thirdBase.y,
    floatDelay: '1.1s',
    labelOffsetX: 10,
    labelOffsetY: 55,
    textAnchor: 'end',
  },
  {
    id: 'contact',
    label: 'Contact',
    x: fieldGeometry.homePlate.x,
    y: fieldGeometry.homePlate.y + 10,
    floatDelay: '1.65s',
    labelOffsetX: 0,
    labelOffsetY: 54,
    textAnchor: 'middle',
    homePlate: true,
  },
]

function getHomePlatePoints(x, y) {
  return `${x - 18},${y - 22} ${x + 18},${y - 22} ${x + 18},${y + 2} ${x},${y + 18} ${x - 18},${y + 2}`
}

export function BaseballField() {
  return (
    <svg
      className="baseball-field"
      viewBox="0 0 700 700"
      role="img"
      aria-labelledby="field-title field-description"
    >
      <title id="field-title">Baseball field portfolio navigation</title>
      <desc id="field-description">
        A centered baseball field where each base links to a portfolio section.
      </desc>

      <defs>
        <filter id="field-glow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="2.2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="field-arc"
        d={fieldOutlinePath}
        pathLength="130"
        filter="url(#field-glow)"
      />

      <path
        className="field-diamond"
        d={`M ${fieldGeometry.homePlate.x} ${fieldGeometry.homePlate.y} L ${fieldGeometry.firstBase.x} ${fieldGeometry.firstBase.y} L ${fieldGeometry.secondBase.x} ${fieldGeometry.secondBase.y} L ${fieldGeometry.thirdBase.x} ${fieldGeometry.thirdBase.y} Z`}
        pathLength="100"
        filter="url(#field-glow)"
      />

      <circle
        className="mound-circle"
        cx={fieldGeometry.mound.x}
        cy={fieldGeometry.mound.y}
        r={fieldGeometry.mound.r}
      />

      <rect
        className="mound-rectangle"
        x={fieldGeometry.mound.x - 14}
        y={fieldGeometry.mound.y - 8}
        width="28"
        height="15"
        rx="2"
        ry="2"
      />

      <text
        className="mound-label"
        x={fieldGeometry.title.x}
        y={fieldGeometry.title.y}
        textAnchor="middle"
      >
        <tspan x={fieldGeometry.title.x} dy="0">
          Martin Gomez
        </tspan>
        <tspan
          className="mound-subtitle"
          x={fieldGeometry.title.x}
          dy={fieldGeometry.title.subtitleOffsetY}
        >
          Software Engineer
        </tspan>
      </text>

      {baseLinks.map((base) => (
        <a
          key={base.id}
          href={`#${base.id}`}
          className="base-link"
          aria-label={`Scroll to ${base.label}`}
        >
          <g className="base-group" style={{ '--float-delay': base.floatDelay }}>
            <g className="base-visual">
              <circle className="base-hit-area" cx={base.x} cy={base.y} r="40" />
              <circle className="base-hover-ring" cx={base.x} cy={base.y} r="30" />
              {base.homePlate ? (
                <>
                  <polygon
                    className="base-underlay"
                    points={getHomePlatePoints(base.x, base.y)}
                  />
                  <polygon 
                    className="base-shape home-plate-shape" 
                    x={base.x}
                    y={base.y}  
                    points={getHomePlatePoints(base.x, base.y)} 
                    rx="2"
                    ry="2"
                  />
                </>
              ) : (
                <>
                  <rect
                    className="base-underlay"
                    x={base.x - 15}
                    y={base.y - 15}
                    width="30"
                    height="30"
                    rx="2"
                    ry="2"
                    transform={`rotate(45 ${base.x} ${base.y})`}
                  />
                  <rect
                    className="base-shape base-square-shape"
                    x={base.x - 15}
                    y={base.y - 15}
                    width="30"
                    height="30"
                    rx="2"
                    ry="2"
                  />
                </>
              )}
            </g>
            <text
              className="base-label"
              x={base.x + base.labelOffsetX}
              y={base.y + base.labelOffsetY}
              textAnchor={base.textAnchor}
            >
              {base.label}
            </text>
          </g>
        </a>
      ))}
    </svg>
  )
}
