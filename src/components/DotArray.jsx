// Draws a simple rows x cols grid of dots so a kid can literally count
// groups instead of just being told the answer.
export default function DotArray({ rows, cols }) {
  const cappedRows = Math.min(rows, 12)
  const cappedCols = Math.min(cols, 12)
  return (
    <div className="flex flex-col items-center gap-1 my-2">
      {Array.from({ length: cappedRows }).map((_, r) => (
        <div key={r} className="flex gap-1">
          {Array.from({ length: cappedCols }).map((_, c) => (
            <span
              key={c}
              className="w-3.5 h-3.5 rounded-full bg-leaf-500 inline-block"
              aria-hidden="true"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
