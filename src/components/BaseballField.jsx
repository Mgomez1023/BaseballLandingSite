const fieldGeometry = {
  homePlate: { x: 350, y: 520 },
  firstBase: { x: 486, y: 384 },
  secondBase: { x: 350, y: 248 },
  thirdBase: { x: 214, y: 384 },
  mound: { x: 350, y: 384, r: 44 },
  monogramSize: 58,
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
    id: 'experience',
    label: 'Experience',
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
        {/*
          Recolors the monogram PNG into the two navy tokens, like cap embroidery:
          the M (low green channel) becomes --navy, the G (high green) becomes --muted.
        */}
        <filter id="monogram-tint" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 4 0 0 -2"
            result="g-raw"
          />
          <feComposite in="g-raw" in2="SourceAlpha" operator="in" result="g-mask" />
          <feFlood className="monogram-tint-navy" result="navy" />
          <feComposite in="navy" in2="SourceAlpha" operator="in" result="whole" />
          <feFlood className="monogram-tint-soft" result="soft" />
          <feComposite in="soft" in2="g-mask" operator="in" result="g-letter" />
          <feMerge>
            <feMergeNode in="whole" />
            <feMergeNode in="g-letter" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="field-arc"
        d={fieldOutlinePath}
        pathLength="130"
      />

      <path
        className="field-diamond"
        d={`M ${fieldGeometry.homePlate.x} ${fieldGeometry.homePlate.y} L ${fieldGeometry.firstBase.x} ${fieldGeometry.firstBase.y} L ${fieldGeometry.secondBase.x} ${fieldGeometry.secondBase.y} L ${fieldGeometry.thirdBase.x} ${fieldGeometry.thirdBase.y} Z`}
        pathLength="100"
      />

      <circle
        className="mound-circle"
        cx={fieldGeometry.mound.x}
        cy={fieldGeometry.mound.y}
        r={fieldGeometry.mound.r}
      />

      <image
        className="mound-monogram"
        href="/LogoTransparent.png"
        x={fieldGeometry.mound.x - fieldGeometry.monogramSize / 2}
        y={fieldGeometry.mound.y - fieldGeometry.monogramSize / 2}
        width={fieldGeometry.monogramSize}
        height={fieldGeometry.monogramSize}
        filter="url(#monogram-tint)"
        aria-hidden="true"
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
          Computer Science
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
            <g className={`base-visual${base.homePlate ? ' base-visual-static' : ''}`}>
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
                    points={getHomePlatePoints(base.x, base.y)}
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
