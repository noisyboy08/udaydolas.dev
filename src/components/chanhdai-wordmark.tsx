export function ChanhDaiWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 80"
      fill="currentColor"
      {...props}
    >
      {/* U */}
      <rect x="108" y="0" width="15" height="60" />
      <rect x="153" y="0" width="15" height="60" />
      <rect x="108" y="45" width="60" height="15" />
      {/* D */}
      <rect x="188" y="0" width="15" height="60" />
      <rect x="203" y="0" width="30" height="15" />
      <rect x="233" y="15" width="15" height="30" />
      <rect x="203" y="45" width="30" height="15" />
      {/* A */}
      <rect x="268" y="0" width="15" height="60" />
      <rect x="313" y="0" width="15" height="60" />
      <rect x="283" y="0" width="30" height="15" />
      <rect x="283" y="30" width="30" height="15" />
      {/* Y */}
      <rect x="348" y="0" width="15" height="30" />
      <rect x="393" y="0" width="15" height="30" />
      <rect x="370" y="30" width="15" height="30" />
      {/* SPACE */}
      {/* D */}
      <rect x="438" y="0" width="15" height="60" />
      <rect x="453" y="0" width="30" height="15" />
      <rect x="483" y="15" width="15" height="30" />
      <rect x="453" y="45" width="30" height="15" />
      {/* O */}
      <rect x="518" y="0" width="15" height="60" />
      <rect x="533" y="0" width="30" height="15" />
      <rect x="563" y="0" width="15" height="60" />
      <rect x="533" y="45" width="30" height="15" />
      {/* L */}
      <rect x="598" y="0" width="15" height="60" />
      <rect x="598" y="45" width="45" height="15" />
      {/* A */}
      <rect x="658" y="0" width="15" height="60" />
      <rect x="703" y="0" width="15" height="60" />
      <rect x="673" y="0" width="30" height="15" />
      <rect x="673" y="30" width="30" height="15" />
      {/* S */}
      <rect x="748" y="0" width="45" height="15" />
      <rect x="748" y="15" width="15" height="15" />
      <rect x="748" y="30" width="45" height="15" />
      <rect x="778" y="45" width="15" height="15" />
      <rect x="748" y="45" width="45" height="15" />
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 80" fill="${color}">
  <rect x="108" y="0" width="15" height="60"/>
  <rect x="153" y="0" width="15" height="60"/>
  <rect x="108" y="45" width="60" height="15"/>
  <rect x="188" y="0" width="15" height="60"/>
  <rect x="203" y="0" width="30" height="15"/>
  <rect x="233" y="15" width="15" height="30"/>
  <rect x="203" y="45" width="30" height="15"/>
  <rect x="268" y="0" width="15" height="60"/>
  <rect x="313" y="0" width="15" height="60"/>
  <rect x="283" y="0" width="30" height="15"/>
  <rect x="283" y="30" width="30" height="15"/>
  <rect x="348" y="0" width="15" height="30"/>
  <rect x="393" y="0" width="15" height="30"/>
  <rect x="370" y="30" width="15" height="30"/>
  <rect x="438" y="0" width="15" height="60"/>
  <rect x="453" y="0" width="30" height="15"/>
  <rect x="483" y="15" width="15" height="30"/>
  <rect x="453" y="45" width="30" height="15"/>
  <rect x="518" y="0" width="15" height="60"/>
  <rect x="533" y="0" width="30" height="15"/>
  <rect x="563" y="0" width="15" height="60"/>
  <rect x="533" y="45" width="30" height="15"/>
  <rect x="598" y="0" width="15" height="60"/>
  <rect x="598" y="45" width="45" height="15"/>
  <rect x="658" y="0" width="15" height="60"/>
  <rect x="703" y="0" width="15" height="60"/>
  <rect x="673" y="0" width="30" height="15"/>
  <rect x="673" y="30" width="30" height="15"/>
  <rect x="748" y="0" width="45" height="15"/>
  <rect x="748" y="15" width="15" height="15"/>
  <rect x="748" y="30" width="45" height="15"/>
  <rect x="778" y="45" width="15" height="15"/>
  <rect x="748" y="45" width="45" height="15"/>
</svg>`;
}
