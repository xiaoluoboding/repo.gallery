const UnoCSS = ({ className }: { className?: string }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 256 256"
        className={className}
      >
        <g fill="#333">
          <path
            fillOpacity=".6"
            d="M137.176 195.927c0-32.812 26.6-59.412 59.412-59.412S256 163.115 256 195.927s-26.6 59.412-59.412 59.412s-59.412-26.6-59.412-59.412"
          />
          <path
            fillOpacity=".3"
            d="M137.176 59.412C137.176 26.6 163.776 0 196.588 0S256 26.6 256 59.412v53.471a5.941 5.941 0 0 1-5.941 5.941H143.117a5.941 5.941 0 0 1-5.941-5.94z"
          />
          <path d="M118.824 195.927c0 32.812-26.6 59.412-59.412 59.412S0 228.74 0 195.927v-53.471a5.94 5.94 0 0 1 5.941-5.941h106.942c3.28 0 5.941 2.66 5.941 5.941z" />
        </g>
      </svg>
    </>
  )
}

export default UnoCSS